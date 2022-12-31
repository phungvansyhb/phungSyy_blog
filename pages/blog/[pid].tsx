import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getDetailDoc, getListDocs } from "services/fireBase.service";
import { KeyDb, Post } from "models/blog";
import { BackIcon, CommentIcon, LatestIcon, LoadingIcon } from "assets/icons";
import { NextPageWithLayout } from "pages/_app";
import Layout from "components/Layout";
import Head from "next/head";
import { BlogItem } from "components/BlogItem";
import dynamic from "next/dynamic"
// import Giscus from "@giscus/react";
import Link from "next/link";
import { useLocalStorage } from "hooks/useLocalStorage";
import { parseSlug } from "utils/toSlug";

const Giscus = dynamic(import("@giscus/react"),{ssr:false})
type Props = {};

const BlogDetail: NextPageWithLayout = ({}: Props) => {
    const router = useRouter();
    const { pid } = router.query;
    const [theme , setTheme] = useLocalStorage(KeyDb.APPTHEME,'')
    const { data, isFetching } = useQuery(
        ["getDetailPost", pid],
        () => getDetailDoc(KeyDb.POST, [ pid as string]) as Promise<Post | undefined>,
        { enabled: !!pid }
    );
    const { data: relatedPost, isFetching: isFetchingRelated } = useQuery(
        ["getRelatedPost", pid],
        async () => {
            const sameCatePost = getListDocs({
                key: KeyDb.POST,
                count: 4,
                whereClause: ["category", "==", data!.category],
            }) as Promise<Post[]>;
            return (await sameCatePost).filter((item) => item.id !== pid);
        },

        { enabled: !!data?.category }
    );

    function renderRelatedPost() {
        if (isFetchingRelated)
            return (
                <div className="w-full h-main-content dark:bgc-dark flex justify-center items-center">
                    <LoadingIcon className="w-6 h-6" />
                </div>
            );
        if (Array.isArray(relatedPost) && relatedPost.length > 0)
            return (
                <>
                    <h2 className="text-sub-header text-primary flex gap-4 items-center">
                        Related post <LatestIcon className="w-6 h-6" />
                    </h2>
                    <div className="px-8 pt-6">
                        {relatedPost.map((related, index) => (
                            <BlogItem key={index} {...related} type="related" />
                        ))}
                    </div>
                </>
            );
        else return <></>;
    }

    if (isFetching)
        return (
            <div className="w-full h-main-content dark:bgc-dark flex justify-center items-center">
                <LoadingIcon className="w-6 h-6" />
            </div>
        );
    if (typeof data !== "undefined")
        return (
            <>
                <Head>
                    <title>{data.title}</title>
                    <meta name="description" content={data.content.slice(0, 60)} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/medal.svg" />
                </Head>
                <div className="px-6 py-12 h-main-content dark:bgc-dark">
                    <Link href={'/'}>
                        <BackIcon className="w-8 h-8" />
                    </Link>
                    <div className="px-[100px]">
                        <h1 className="text-header text-4xl text-center dark:text-white">
                            {data.title}
                        </h1>
                        <article
                            dangerouslySetInnerHTML={{ __html: data.content }}
                            className="my-12 dark:text-white"
                        ></article>
                    </div>
                    <div className="comment">
                        <h2 className="text-sub-header text-primary flex gap-4 items-center">
                            Comment <CommentIcon className="w-6 h-6" />
                        </h2>
                        <Giscus
                                id="comments"
                                repo="phungvansyhb/phungSyy_blog"
                                repoId="R_kgDOIqx0yg"
                                category="Announcements"
                                categoryId="DIC_kwDOIqx0ys4CTVoh"
                                mapping="pathname"
                                term="Welcome to @giscus/react component!"
                                reactionsEnabled="1"
                                emitMetadata="0"
                                inputPosition="top"
                                theme={theme.toLowerCase()}
                                lang="vi"
                                loading="lazy"
                            />
                    </div>
                    <div className="related">{renderRelatedPost()}</div>
                </div>
            </>
        );
    return <></>;
};

// export async function getStaticProps(context) {
//     const post = await getDetailDoc(KeyDb.POST,context.params.id)
//     return {
//       props: {}, // will be passed to the page component as props
//     }
//   }

BlogDetail.getLayout = function (page: React.ReactElement) {
    return <Layout>{page}</Layout>;
};
export default BlogDetail;

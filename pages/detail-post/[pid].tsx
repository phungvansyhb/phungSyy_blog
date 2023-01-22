import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getDetailDoc, getListDocs } from 'services/fireBase.service';
import { KeyDb, Post, PostDetail, ReturnPost } from 'models/blog';
import { BackIcon, BookIcon, CommentIcon, LatestIcon, LoadingIcon } from 'assets/icons';
import { NextPageWithLayout } from 'pages/_app';
import Layout from 'components/Layout';
import Head from 'next/head';
import { BlogItem } from 'components/BlogItem';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCookie } from 'hooks/useCookies';
import { GetStaticPaths, GetStaticProps } from 'next';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringIfy from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import parameterize from 'parameterize';
import { Root } from 'rehype-parse/lib';
import { AnimatePresence, motion } from 'framer-motion';
const Giscus = dynamic(import('@giscus/react'), { ssr: false });
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';

function parseHTML(pageContent: string) {
    let TOC: { id: string; title: string }[] | [] = [];
    const content = unified()
        .use(rehypeParse, { fragment: true })
        .use(() => {
            return (tree: Root) => {
                visit(tree, 'element', (node) => {
                    if (node.tagName === 'h2') {
                        if (node.properties && node.children.length === 1) {
                            let id = '';
                            try {
                                id = parameterize((node.children[0] as any).value);
                            } catch (e) {
                                id = '';
                            }
                            node.properties.id = id;
                            TOC = [...TOC, { id, title: (node.children[0] as any).value }];
                            node.children.unshift({
                                type: 'element',
                                tagName: 'a',
                                properties: {
                                    href: `#${id}`,
                                    class: 'anchor',
                                    'aria-hidden': 'true',
                                },
                                children: [],
                            });
                        }
                    }
                });
            };
        })
        .use(rehypeStringIfy)
        .processSync(pageContent)
        .toString();
    return { toc: TOC, content };
}

const BlogDetail: NextPageWithLayout = ({ data }: { data: PostDetail }) => {
    const router = useRouter();
    const { pid } = router.query;
    const [theme, _setTheme] = useCookie(KeyDb.APPTHEME, '');
    const { content, toc } = useMemo(() => parseHTML(data.content), [data.content]);
    const titleRef = useRef<HTMLDivElement>(null);
    const [showOutline, setShowOutline] = useState(false);
    const [stepEnable, setEnableStep] = useState(false);
    const [initStep] = useState(0);
    const [countIntro, setCountIntro] = useState(0);
    const [steps] = useState([
        {
            element: '.outlineBtn',
            intro: 'Click để xem mục lục',
        },
    ]);

    const { data: relatedPost, isFetching: isFetchingRelated } = useQuery(
        ['getRelatedPost', pid],
        async () => {
            const sameCatePost = getListDocs({
                key: KeyDb.POST,
                count: 4,
                whereClause: [['category', '==', data!.category]],
            }) as Promise<ReturnPost[]>;
            return (await sameCatePost).filter((item) => item.id !== pid);
        },

        { enabled: !!data?.category }
    );
    useEffect(() => {
        if (titleRef.current) {
            const observer = new IntersectionObserver(
                ([e]) => {
                    e.target.classList.toggle('title-pinned', e.intersectionRatio < 1);
                },
                { threshold: [1] }
            );
            observer.observe(titleRef.current);
        }
    }, []);
    useEffect(() => {
        function removeOutLine() {
            if (countIntro === 0 && titleRef.current?.classList.contains('title-pinned')) {
                setEnableStep(true);
            }
            if (!titleRef.current?.classList.contains('title-pinned')) {
                setShowOutline(false);
                setEnableStep(false);
            }
        }
        window.addEventListener('scroll', removeOutLine);
        return () => window.removeEventListener('scroll', removeOutLine);
    }, [titleRef.current?.classList]);

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
    if (typeof data !== 'undefined')
        return (
            <>
                <Head>
                    <title>{data.title}</title>
                    <meta name="description" content={data.description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="icon" href="/medal.svg" />
                </Head>
                <div className="px-6 mobile:px-4 py-12 mobile:py-8 h-main-content dark:bgc-dark">
                    {/* <div className="h-40 fixed top-0">{data.title}</div> */}
                    <Link href={'/'} className="inline-block backbutton">
                        <BackIcon className="w-8 h-8" />
                    </Link>
                    <AnimatePresence>
                        {showOutline && (
                            <motion.aside
                                initial={{ x: '100%' }}
                                transition={{ duration: 0.5, type: 'spring' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                key="outline"
                                className="fixed right-0 top-[100px] mobile:top-[70px] bg-white dark:bgc-dark rounded-lg 
                                shadow px-4 py-8 min-w-[350px] w-1/3 overflow-hidden border z-[200] 
                                max-h-[calc(100vh_-_100px)] mobile:max-h-[calc(100vh_-_70px)] overflow-y-auto leading-8"
                            >
                                <ol className="flex flex-col gap-4">
                                    {toc.map((item, index) => (
                                        <li key={index} className="truncate font-bold ">
                                            <a
                                                href={`#${item.id}`}
                                                className="truncate text-black dark:text-white mobile:text-xs"
                                            >
                                                {index + 1}/ {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </motion.aside>
                        )}
                    </AnimatePresence>

                    <div className="px-[100px] tablet:px-[50px] mobile:px-0 py-8 post-content dark:text-white">
                        <h1
                            className="text-header text-4xl mobile:text-2xl text-center dark:text-white capitalize first-letter:text-5xl first-letter:italic  mobile:first-letter:text-4xl first-letter:font-serif mb-8 mobile:mb-6 sticky -top-[1px] z-10 bg-white flex gap-4 justify-center dark:bgc-dark mobile:px-5"
                            ref={titleRef}
                        >
                            {data.title}
                            <button onClick={() => setShowOutline(!showOutline)}>
                                <BookIcon className="w-8 h-8 hidden outlineBtn" />
                            </button>
                        </h1>
                        <Steps
                            enabled={stepEnable && countIntro === 0}
                            steps={steps}
                            initialStep={initStep}
                            options={{
                                overlayOpacity: 0.7,
                                doneLabel: 'Đã hiểu',
                                hidePrev: true,
                                tooltipClass: 'sticky',
                                showBullets: false,
                            }}
                            onExit={() => {
                                setEnableStep(false);
                            }}
                            onComplete={() => {
                                setEnableStep(false);
                                setCountIntro(1);
                                window.scrollTo(0, 0);
                            }}
                        />
                        <div className="quill editor-visualize flex justify-center mobile:px-2">
                            <div className="ql-container ql-snow ql-disabled ">
                                <article
                                    dangerouslySetInnerHTML={{ __html: content }}
                                    className="dark:text-white  ql-editor leading-8"
                                ></article>
                            </div>
                        </div>
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
                    <div className="related mt-10">{renderRelatedPost()}</div>
                </div>
            </>
        );
    return <></>;
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};
export const getStaticProps: GetStaticProps = async (context) => {
    const pid = context.params!.pid;
    const content = await (getDetailDoc(KeyDb.POSTDETAIL, [pid as string]) as Promise<
        { content: string } | undefined
    >);
    const metaData = await (getDetailDoc(KeyDb.POST, [pid as string]) as Promise<Post | undefined>);
    if (typeof metaData !== 'undefined') {
        const { updateAt, ...rest } = metaData;
        return { props: { data: { ...content, ...rest } } };
    }
    return { props: { data: { ...content } } };
};

BlogDetail.getLayout = function (page: React.ReactElement) {
    return <Layout removeStickyHeader>{page}</Layout>;
};
export default BlogDetail;

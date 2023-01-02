import { LatestIcon } from "assets/icons";
import Slide from "components/Slide";
import ViewAllPost from "components/ViewAllPost";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";

// const PageContext = createContext()

const Page: NextPageWithLayout = () => {
    return (
        <main className="
        py-12 tablet:py-8 mobile:py-6
        page-container
        bg-gray-50 dark:bgc-dark min-h-screen">
            <section>
                <h2 className="flex text-sub-header gap-2 text-primary dark:text-white mb-6">
                    Latest <LatestIcon className="w-6 h-6" />
                </h2>
                <Slide />
            </section>
            <div className="mt-24 tablet:mt-16 mobile:mt-12"></div>
            <ViewAllPost />
        </main>
    );
};
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: "PhungSyy blog", description: "Tôi viết những gì tôi thích" }}>
            {page}
        </Layout>
    );
};
export default Page;

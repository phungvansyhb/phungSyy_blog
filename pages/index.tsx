import { LatestIcon } from "assets/icons";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";
import Slide from "components/Slide";

const Page: NextPageWithLayout = () => {
    return (<main className="py-12 px-[120px] bgc-primary dark:bgc-dark min-h-screen">
        <section>
            <h2 className="flex text-sub-header gap-2 text-primary dark:text-white"> Latest <LatestIcon className="w-6 h-6"/></h2>
            <Slide/>
        </section>
    </main>);
};
Page.getLayout = function (page: React.ReactElement) {
    return <Layout metaObject={{title : 'PhungSyy blog' , description : "Tôi viết những gì tôi thích"}}>{page}</Layout>;
};
export default Page;

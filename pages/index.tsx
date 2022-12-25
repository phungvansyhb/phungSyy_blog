import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
    return <p> Here is home page</p>;
};
Page.getLayout = function (page: React.ReactElement) {
    return <Layout metaObject={{title : 'PhungSyy blog' , description : "Tôi viết những gì tôi thích"}}>{page}</Layout>;
};
export default Page;

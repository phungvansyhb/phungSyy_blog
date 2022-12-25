import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
    return <p> Here is about page</p>;
};
Page.getLayout = function (page: React.ReactElement) {
    return <Layout metaObject={{title : 'About me' , description : "Tôi kể về tôi"}}>{page}</Layout>;
};
export default Page;

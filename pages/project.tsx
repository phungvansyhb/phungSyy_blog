import Layout from "../components/Layout";
import { NextPageWithLayout } from "./_app";

const Page: NextPageWithLayout = () => {
    return <p className="h-main-content"> Here is project page</p>;
};
Page.getLayout = function (page: React.ReactElement) {
    return <Layout metaObject={{title:'My project' , description :"Các dự án mà Sỹ đã làm"}}>{page}</Layout>;
};
export default Page;

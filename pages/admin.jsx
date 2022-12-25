import React from "react";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";
import { createDoc } from "../services/fireBase.service";

const Page = () => {
    const [content , setContent] = React.useState("")
    const Editor = React.useMemo(()=>dynamic(() => import("../components/Editor"), {
        ssr: false,
    }),[]);
    function handleSave() {
        // console.log(content);
        createDoc("test", { title: "post1", content: content });
    }

    return (
        <section className="p-6 rounded-md overflow-hidden">
            <Editor defaultValue={""}  onChange={(value)=>setContent(value)}/>
            <div className="flex justify-center mt-6">
                <button className="btn btn-primary" onClick={handleSave}>
                    Save
                </button>
            </div>
        </section>
    );
};
Page.getLayout = function (page) {
    return (
        <Layout metaObject={{ title: "Admin editor", description: "Trang viết bài" }}>
            {page}
        </Layout>
    );
};
export default Page;

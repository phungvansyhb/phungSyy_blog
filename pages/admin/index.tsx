import React from "react";
import Layout from "../../components/Layout";
import Table from "../../components/Table";
import { AddIcon, DeleteIcon, EditIcon } from "../../assets/icons";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getListDocs } from "services/fireBase.service";
import { ArchonButton } from "components";
// import type Post from 'models/blog'

const Page = () => {
    const router = useRouter();
    const { data, isLoading } = useQuery("getAllPost", () => getListDocs("posts"), {
        initialData: [],
    });
    
    return (
        <div>
            {data && (
                <Table
                    loading={isLoading}
                    columns={[
                        {
                            index: "stt",
                            title: "#",
                            // align: "center",
                            render: (index, record) => <td className="text-center" key={`stt-${index}`}>{index + 1}</td>,
                        },
                        { index: "title", title: "Tên bài viết", align: "center" },
                        { index: "category", title: "Chủ đề", align: "center" },
                        {
                            index: "action",
                            title: "Thao tác",
                            render: (index, record) => (
                                <td className="flex gap-4 justify-center mt-2" key={`action-${index}`}>
                                    <button
                                        onClick={() => {
                                            router.push(`/admin/edit/${record.id}`);
                                        }}
                                    >
                                        <EditIcon className="w-6 h-6" />
                                    </button>
                                    <button className="">
                                        <DeleteIcon className="w-6 h-6" />
                                    </button>
                                </td>
                            ),
                        },
                    ]}
                    data={data}
                ></Table>
            )}
            <ArchonButton icon={<AddIcon className="w-6 h-6 font-bold text-white"/>} position={{bottom : 20 , right : 20}} width={55} height={55} action={()=>router.push('/admin/create-post')} tooltip="Create new post"/>
        </div>
    );
};
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: "Admin editor", description: "Trang viết bài" }}>
            {page}
        </Layout>
    );
};
export default Page;

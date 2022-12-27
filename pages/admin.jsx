import dynamic from "next/dynamic";
import React from "react";
import { toast } from "react-hot-toast";
import Layout from "../components/Layout";
import CreatableSelect from "react-select/creatable";
import { createDoc, getListDocs, getDetailDoc } from "../services/fireBase.service";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Page = () => {
    const [content, setContent] = React.useState("halo");
    const titleRef = React.useRef(null);
    const selectRef = React.useRef(null);
    const queryClient = useQueryClient();
    const Editor = React.useMemo(
        () =>
            dynamic(() => import("../components/Editor"), {
                ssr: false,
            }),
        []
    );
    const { data, isLoading, refetch } = useQuery("getListCate", () => getListDocs("categories"), [
        { placeholderData: [] },
    ]);
    const createCategory = useMutation(
        "createMutation",
        (cateName) => createDoc("categories", { name: cateName }),
        {
            onSuccess: (_idCreated, variable) => {
                queryClient.setQueryData("getListCate", [...data, { name: variable }]);
                console.log(data, variable);
            },
        }
    );
    const createPost = useMutation(
        "createPost",
        (post, category) => createDoc(`posts`, post, category),
        {
            onSuccess: () => {
                toast.success("Tạo bài viết thành công");
            },
        }
    );
    // const listCategory = getListDocs("post").then(res=>console.log(res))
    function handleSave(e) {
        e.preventDefault();
        const title = titleRef.current.value;
        const category = selectRef.current.getValue();
        console.log(category[0]);
        if (!title) {
            toast.error("title required !");
            titleRef.current.focus();
            return;
        }
        if (category.length === 0) {
            toast.error("category required !");
            selectRef.current.focus();
            return;
        }
        if (!content) {
            toast.error("content required !");
            return;
        }
        createPost.mutate(
            {
                title: titleRef.current.value,
                category: category[0].value,
                content: content,
            },
            category[0].value
        );
    }
    function handleCreateCate(inputValue) {
        createCategory.mutate(inputValue);
    }

    return (
        <section className="p-6 rounded-md overflow-hidden">
            <form className="flex flex-col gap-4" onSubmit={handleSave}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Tiêu đề bài viết :</label>
                    <input
                        id="title"
                        name="title"
                        required
                        type="text"
                        className="input"
                        ref={titleRef}
                        defaultValue=""
                    />
                </div>
                <div>
                    <label htmlFor="title">Thể loại bài viết :</label>
                    {!isLoading ? (
                        <CreatableSelect
                            ref={selectRef}
                            isClearable
                            options={data.map((el) => ({ value: el.name, label: el.name }))}
                            onCreateOption={(inputValue) => handleCreateCate(inputValue)}
                            defaultValue=""
                        />
                    ) : (
                        "loading"
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Nội dung bài viết :</label>
                    <Editor defaultValue={content} onChange={(value) => setContent(value)} />
                </div>

                <div className="flex justify-center mt-6">
                    <button className="btn btn-primary" type="submit" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </form>
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

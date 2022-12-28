import dynamic from "next/dynamic";
import React, { FormEvent, Ref } from "react";
import toast from "react-hot-toast";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { GroupBase } from "react-select";
import CreatableSelect from "react-select/creatable";
import Select from "react-select/dist/declarations/src/Select";
import { getListDocs, createDoc, updateDocument } from "../services/fireBase.service";
import { Post, KeyDb } from "models/blog";
import Editor from "components/Editor";
import { useEffect } from "react";
import { useRouter } from "next/router";

type Props = { isEdit: boolean; initPost?: Post };

export const PageEditor = ({ isEdit, initPost }: Props) => {
    const [content, setContent] = React.useState(initPost?.content);
    const [defaultSelected, setDefaultSelected] = React.useState({ value: "", label: "" });
    const titleRef = React.useRef<HTMLInputElement>(null);
    const selectRef = React.useRef<Ref<Select<string, false, GroupBase<string>>> | undefined>(null);
    const queryClient = useQueryClient();
    const router = useRouter();

    const { data, isLoading } = useQuery("getListCate", () => getListDocs("categories"), {
        placeholderData: [],
    });
    const createCategory = useMutation(
        "createMutation",
        (cateName: string) => createDoc(KeyDb.CATEGORY, { name: cateName }),
        {
            onSuccess: (_idCreated, variable) => {
                if (Array.isArray(data)) {
                    queryClient.setQueryData("getListCate", [...data, { name: variable }]);
                }
                console.log(data, variable);
            },
        }
    );
    const createPost = useMutation(
        "createPost",
        ({ post }: { post: Post }) => {
            if (isEdit) {
                return updateDocument(KeyDb.POST, post);
            } else {
                return createDoc(KeyDb.POST, post);
            }
        },
        {
            onSuccess: () => {
                toast.success("Tạo bài viết thành công");
            },
        }
    );
    function handleSave(e: FormEvent) {
        e.preventDefault();
        const title = titleRef.current!.value;
        const category = (selectRef.current as any).getValue();
        const postObj = isEdit ? { ...initPost } : {};
        if (!title) {
            toast.error("title required !");
            titleRef.current!.focus();
            return;
        }
        if (category.length === 0) {
            toast.error("category required !");
            (selectRef.current as any).focus();
            return;
        }
        if (!content) {
            toast.error("content required !");
            return;
        }
        createPost.mutate({
            post: {
                ...postObj,
                title: titleRef.current!.value,
                category: category[0].value,
                content: content,
                updateAt: new Date().toLocaleString(),
            },
        });
    }
    function handleCreateCate(inputValue: string) {
        createCategory.mutate(inputValue);
    }
    useEffect(() => {
        if (initPost) {
            setContent(initPost.content);
            setDefaultSelected({ value: initPost.category, label: initPost.category });
        }
    }, [initPost]);
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
                        defaultValue={initPost?.title}
                    />
                </div>
                <div>
                    <label htmlFor="title">Thể loại bài viết :</label>
                    {!isLoading ? (
                        <CreatableSelect
                            ref={selectRef as any}
                            isClearable
                            value={defaultSelected}
                            options={(data as any).map((el: any) => ({
                                value: el.name,
                                label: el.name,
                            }))}
                            onChange={(newValue: any) => setDefaultSelected(newValue)}
                            onCreateOption={(inputValue) => handleCreateCate(inputValue)}
                            // inputValue = {defaultValue?.category}
                        />
                    ) : (
                        "loading"
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Nội dung bài viết :</label>
                    <Editor
                        defaultValue={content}
                        onChange={(value: string) => setContent(value)}
                    />
                </div>

                <div className="flex justify-center mt-6 gap-6">
                    <button className="btn btn-primary" type="submit">
                        Save
                    </button>
                    <button
                        className="btn btn-secondary"
                        type="submit"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

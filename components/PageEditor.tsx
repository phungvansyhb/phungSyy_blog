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
import { LoadingIcon } from "assets/icons";
import { toSlug } from "utils/toSlug";

type Props = { isEdit: boolean; initPost?: Post };

export const PageEditor = ({ isEdit, initPost }: Props) => {
    const [content, setContent] = React.useState(initPost?.content);
    const [defaultSelected, setDefaultSelected] = React.useState({ value: "", label: "" });
    const titleRef = React.useRef<HTMLInputElement>(null);
    const publicRef = React.useRef<HTMLInputElement>(null);
    const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
    const selectRef = React.useRef<Ref<Select<string, false, GroupBase<string>>> | undefined>(null);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { pid } = router.query;
    const { data, isLoading } = useQuery(
        "getListCate",
        () => getListDocs({ key: KeyDb.CATEGORY }),
        {
            placeholderData: [],
        }
    );
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
        ({ post }: { post: Post }) => {
            return createDoc(KeyDb.POST, post , toSlug(post.title));
        },
        {
            onSuccess: () => {
                toast.success("Tạo bài viết thành công");
            },
            onError: () => {
                toast.error("Tạo bài viết thất bại");
            },
        }
    );
    const updatePost = useMutation(
        ({ post }: { post: Post }) => {
            return updateDocument(KeyDb.POST, post, [pid as string]);
        },
        {
            onSuccess: () => {
                toast.success("Update bài viết thành công");
            },
            onError: () => {
                toast.error("Update bài viết thất bại");
            },
        }
    );
    function handleSave(e: FormEvent) {
        e.preventDefault();
        const title = titleRef.current ? titleRef.current.value : initPost?.title;
        const isPublic = publicRef.current ? publicRef.current.checked : (initPost?.isPublic||false)
        const description = descriptionRef.current
            ? descriptionRef.current.value
            : initPost?.description;
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
        if (!description) {
            toast.error("description required !");
            descriptionRef.current!.focus();
            return;
        }
        if (!content) {
            toast.error("content required !");
            return;
        }
        const finalObj = {
            ...postObj,
            title: title,
            isPublic : isPublic,
            category: category[0].value,
            description: description,
            content: content,
            updateAt: new Date().toLocaleString(),
        };
        isEdit
            ? updatePost.mutate({ post: finalObj })
            : createPost.mutate({
                  post: finalObj,
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
        <section className="p-6 rounded-md h-main-content">
            <form className="flex flex-col gap-4" onSubmit={handleSave}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Tiêu đề bài viết :</label>
                    <input
                        placeholder="Bài viết của bạn tên là ?"
                        id="title"
                        name="title"
                        required
                        type="text"
                        className="input"
                        ref={titleRef}
                        defaultValue={initPost?.title}
                    />
                </div>
                <div className="flex gap-4">
                    <span>Public bài viết:</span>
                    <input type="checkbox" ref={publicRef} defaultChecked={initPost?.isPublic}></input>
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
                            className="z-100"
                            onChange={(newValue: any) => setDefaultSelected(newValue)}
                            onCreateOption={(inputValue) => handleCreateCate(inputValue)}
                            // inputValue = {defaultValue?.category}
                        />
                    ) : (
                        "loading"
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="description">Mô tả bài viết :</label>
                    <textarea
                        placeholder="Mô tả ngắn gọn cho bài viết"
                        id="description"
                        name="description"
                        required
                        maxLength={100}
                        className="input"
                        ref={descriptionRef}
                        defaultValue={initPost?.description}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Nội dung bài viết :</label>
                    <Editor
                        defaultValue={content}
                        onChange={(value: string) => setContent(value)}
                    />
                </div>

                <div className="flex justify-center mt-6 gap-6">
                    <button className="btn btn-primary flex items-center gap-4" type="submit">
                        {createPost.isLoading ||
                            (updatePost.isLoading && <LoadingIcon className="w-6 h-6" />)}{" "}
                        Save
                    </button>
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
};

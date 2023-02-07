import { KeyDb, Post } from 'models/blog';
import React, { FormEvent, Ref } from 'react';
import {
    WriteBatchParam,
    createDoc,
    getListDocs,
    updateDocument,
    uploadImageAndReturnUrl,
    writeBatchDoc,
} from '../services/fireBase.service';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import CreatableSelect from 'react-select/creatable';
import Editor from 'components/Editor';
import { GroupBase } from 'react-select';
import { ImageType } from 'react-images-uploading';
import { LoadingIcon } from 'assets/icons';
import Select from 'react-select/dist/declarations/src/Select';
import Upload from './Upload';
import { toSlug } from 'utils/toSlug';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

type Props = { isEdit: boolean; initPost?: Post & { content: string } };

const ImageAvatarUrl =
    'https://www.trio.dev/hubfs/Imported_Blog_Media/263a75529a1752b75d64f9f21fd07c92-3-2.jpg';
export const PageEditor = ({ isEdit, initPost }: Props) => {
    const [content, setContent] = React.useState(initPost?.content);
    const [defaultSelected, setDefaultSelected] = React.useState({ value: '', label: '' });
    const titleRef = React.useRef<HTMLInputElement>(null);
    const publicRef = React.useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = React.useState<ImageType[] | []>([]);
    const descriptionRef = React.useRef<HTMLTextAreaElement>(null);
    const selectRef = React.useRef<Ref<Select<string, false, GroupBase<string>>> | undefined>(null);
    const queryClient = useQueryClient();
    const router = useRouter();
    const { pid } = router.query;
    const { data, isLoading } = useQuery(
        'getListCate',
        () => getListDocs({ key: KeyDb.CATEGORY }),
        {
            placeholderData: [],
        }
    );
    const createCategory = useMutation(
        'createMutation',
        (cateName: string) => createDoc(KeyDb.CATEGORY, { name: cateName , isDeleted:false }),
        {
            onSuccess: (_idCreated, variable) => {
                if (Array.isArray(data)) {
                    queryClient.setQueryData('getListCate', [...data, { name: variable }]);
                }
                console.log(data, variable);
            },
        }
    );
    const createPost = useMutation(
        ({ post }: { post: Post & { content: string } }) => {
            const { content, ...rest } = post;
            const paramObj: WriteBatchParam[] = [
                {
                    type: 'set',
                    data: { content },
                    key: KeyDb.POSTDETAIL,
                    customId: toSlug(post.title),
                },
                { type: 'set', data: rest, key: KeyDb.POST, customId: toSlug(post.title) },
            ];
            return writeBatchDoc(paramObj);
            // return createDoc(KeyDb.POST, post, toSlug(post.title));
        },
        {
            onSuccess: () => {
                toast.success('Tạo bài viết thành công');
                router.push('/admin');
            },
            onError: () => {
                toast.error('Tạo bài viết thất bại');
            },
        }
    );
    const updatePost = useMutation(
        ({ post }: { post: Partial<Post> & { content: string } }) => {
            const { content, ...rest } = post;
            const paramObj: WriteBatchParam[] = [
                {
                    type: 'update',
                    data: { content },
                    key: KeyDb.POSTDETAIL,
                    customId: pid as string,
                },
                { type: 'update', data: rest, key: KeyDb.POST, customId: pid as string },
            ];
            return writeBatchDoc(paramObj);
            // return updateDocument(KeyDb.POST, post, [pid as string]);
        },
        {
            onSuccess: () => {
                toast.success('Update bài viết thành công');
                router.push('/admin');
            },
            onError: () => {
                toast.error('Update bài viết thất bại');
            },
        }
    );
    async function handleSave(e: FormEvent) {
        e.preventDefault();
        const title = titleRef.current ? titleRef.current.value : initPost?.title;
        const isPublic = publicRef.current
            ? publicRef.current.checked
            : initPost?.isPublic || false;
        const description = descriptionRef.current
            ? descriptionRef.current.value
            : initPost?.description;
        const category = (selectRef.current as any).getValue();
        const postObj = isEdit ? { ...initPost } : {};
        if (!title) {
            toast.error('title required !');
            titleRef.current!.focus();
            return;
        }
        if (category.length === 0) {
            toast.error('category required !');
            (selectRef.current as any).focus();
            return;
        }
        if (!description) {
            toast.error('description required !');
            descriptionRef.current!.focus();
            return;
        }
        if (!content) {
            toast.error('content required !');
            return;
        }
        let urlAvatar = initPost ? initPost.avatar : ImageAvatarUrl;
        if (avatar.length !== 0) {
            urlAvatar = await uploadImageAndReturnUrl(avatar[0].file!);
        }
        const finalObj = {
            ...postObj,
            avatar: urlAvatar,
            title: title,
            isPublic: isPublic,
            category: category[0].value,
            description: description,
            content: content,
            path: KeyDb.POSTDETAIL +"/"+ toSlug(title),
            updateAt: new Date(),
        };
        isEdit
            ? updatePost.mutate({ post: finalObj })
            : createPost.mutate({
                  post: { ...finalObj, isDeleted: false, createAt: new Date() },
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
                    <span>Ảnh đại diện bài viết: </span>
                    <Upload
                        getImageCallback={setAvatar}
                        defaultImage={initPost ? initPost.avatar : undefined}
                    />
                    {/* <input
                        type="file"
                        accept="image/*"
                        ref={avatarRef}
                    ></input> */}
                </div>
                <div className="flex gap-4">
                    <span>Public bài viết:</span>
                    <input
                        type="checkbox"
                        ref={publicRef}
                        defaultChecked={initPost?.isPublic}
                    ></input>
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
                        'loading'
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
                            (updatePost.isLoading && <LoadingIcon className="w-6 h-6" />)}{' '}
                        Save
                    </button>
                    <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={() => router.back()}
                    >
                        Home
                    </button>
                </div>
            </form>
        </section>
    );
};

import { KeyDb } from 'models/blog';
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
import { ToolModel } from 'models/tool.model';

type Props = { isEdit: boolean; initTool?: ToolModel };

const ImageAvatarUrl =
    'https://www.trio.dev/hubfs/Imported_Blog_Media/263a75529a1752b75d64f9f21fd07c92-3-2.jpg';
export const CreateTool = ({ isEdit, initTool }: Props) => {
    const [description, setDescription] = React.useState(initTool?.description);
    const titleRef = React.useRef<HTMLInputElement>(null);
    const urlRef = React.useRef<HTMLInputElement>(null);
    const publicRef = React.useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = React.useState<ImageType[] | []>([]);
    const router = useRouter();
    const { pid } = router.query;

    const createTool = useMutation(
        ({ tool }: { tool: ToolModel }) => {
            return createDoc(KeyDb.TOOL, tool);
        },
        {
            onSuccess: () => {
                toast.success('Tạo công cụ thành công');
                router.push('/admin/tool');
            },
            onError: () => {
                toast.error('Tạo công cụ thất bại');
            },
        }
    );
    const updateTool = useMutation(
        ({ tool }: { tool: Partial<ToolModel> }) => {

            return updateDocument(KeyDb.TOOL, tool, [pid as string]);
        },
        {
            onSuccess: () => {
                toast.success('Update tool thành công');
                router.push('/admin/tool');
            },
            onError: () => {
                toast.error('Update tool thất bại');
            },
        }
    );
    async function handleSave(e: FormEvent) {
        e.preventDefault();
        const title = titleRef.current ? titleRef.current.value : initTool?.title;
        const url = urlRef.current ? urlRef.current.value : initTool?.title;
        const isPublic = publicRef.current
            ? publicRef.current.checked
            : initTool?.isPublic || false;
        const toolObj = isEdit ? { ...initTool } : {};
        if (!title) {
            toast.error('title required !');
            titleRef.current!.focus();
            return;
        }
        if (!url) {
            toast.error('url required !');
            urlRef.current!.focus();
            return;
        }
        if (!description) {
            toast.error('description required !');
            return;
        }

        let urlAvatar = initTool ? initTool.avatar : ImageAvatarUrl;
        if (avatar.length !== 0) {
            urlAvatar = await uploadImageAndReturnUrl(avatar[0].file!);
        }
        const finalObj: any = {
            ...toolObj,
            avatar: urlAvatar,
            title: title,
            url: url,
            isPublic: isPublic,
            description: description,
            updateAt: new Date(),
            isDeleted: false,
            createAt: new Date()
        };
        isEdit
            ? updateTool.mutate({ tool: finalObj })
            : createTool.mutate({
                tool: finalObj,
            });
    }

    useEffect(() => {
        if (initTool) {
            setDescription(initTool.description);
        }
    }, [initTool]);
    return (
        <section className="p-6 rounded-md h-main-content">
            <form className="flex flex-col gap-4" onSubmit={handleSave}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Tên công cụ:</label>
                    <input
                        placeholder="Công cụ của bạn tên là ?"
                        id="title"
                        name="title"
                        required
                        type="text"
                        className="input"
                        ref={titleRef}
                        defaultValue={initTool?.title}
                    />
                </div>
                <div className="flex gap-4">
                    <span>Ảnh đại diện công cụ: </span>
                    <Upload
                        getImageCallback={setAvatar}
                        defaultImage={initTool ? initTool.avatar : undefined}
                    />
                    {/* <input
                        type="file"
                        accept="image/*"
                        ref={avatarRef}
                    ></input> */}
                </div>
                <div className="flex gap-4">
                    <span>Public công cụ:</span>
                    <input
                        type="checkbox"
                        ref={publicRef}
                        defaultChecked={initTool?.isPublic}
                    ></input>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Đường dẫn cho công cụ:</label>
                    <input
                        placeholder="Đường dẫn ?"
                        id="url"
                        name="url"
                        required
                        type="text"
                        className="input"
                        ref={urlRef}
                        defaultValue={initTool?.url}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="title">Mô tả công cụ :</label>
                    <Editor
                        defaultValue={description}
                        onChange={(value: string) => setDescription(value)}
                    />
                </div>

                <div className="flex justify-center mt-6 gap-6">
                    <button className="btn btn-primary flex items-center gap-4" type="submit">
                        {createTool.isLoading ||
                            (updateTool.isLoading && <LoadingIcon className="w-6 h-6" />)}{' '}
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

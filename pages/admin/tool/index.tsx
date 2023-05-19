import { DocumentData } from 'firebase/firestore';
import { KeyDb } from 'models/blog';
import { ToolModel } from 'models/tool.model';
import { useRouter } from 'next/router';
import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    WriteBatchParam,
    deleteDocument,
    getListDocs,
    writeBatchDoc
} from 'services/fireBase.service';
import { DeleteIcon, EditIcon } from '../../../assets/icons';
import Layout from '../../../components/Layout';
import Table from '../../../components/Table';
// import type Post from 'models/blog'

const Page = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(
        'getAllTool',
        () => getListDocs({ key: KeyDb.TOOL, orderKey: 'updateAt', orderDirection: 'desc' }),
        {
            initialData: [],
            select: (data) => {
                const finalData: DocumentData[] = [];
                data.forEach((item) => {
                    const temp = { ...item };
                    temp.updateAt = new Date(
                        item.updateAt.seconds * 1000 + item.updateAt.nanoseconds / 1000000
                    ).toLocaleString();
                    finalData.push(temp);
                });
                return finalData;
            },
        }
    );
    const deletePost = useMutation(
        ({ key }: { key: string }) => {
            // const paramsObj: WriteBatchParam[] = [
            //     { type: 'delete', key: KeyDb.TOOL, customId: key },
            // ];
            // return writeBatchDoc(paramsObj);
            return deleteDocument(KeyDb.TOOL, [key]);
        },
        {
            onSuccess: (_data, { key }) => {
                const data = queryClient.getQueryData<ToolModel[]>('getAllTool');
                queryClient.setQueryData('getAllTool', () =>
                    data?.filter((item) => item.id !== key)
                );
                toast.success('Xóa tool thành công');
            },
            onError: () => {
                toast.error('Xóa tool thất bại');
            },
        }
    );
    return (
        <div className="h-main-content">
            <div className='text-right p-4'>
                <button className='p-4 rounded-lg bg-blue-600 text-white font-bold ' onClick={() => router.push('/admin/tool/create-tool')} >Create</button>
            </div>
            {Array.isArray(data) && (
                <Table
                    loading={isLoading}
                    columns={[
                        {
                            index: 'stt',
                            title: '#',
                            render: (index, record) => (
                                <td className="text-center" key={`stt-${index}`}>
                                    {index + 1}
                                </td>
                            ),
                        },
                        { index: 'title', title: 'Tên công cụ', align: 'center' },
                        {
                            index: 'avatar', title: 'Ảnh mô tả', align: 'center', render: (_index, record) => (
                                <td className='flex justify-center'>
                                    <div className='w-10 h-10 '>
                                        <img src={record.avatar} className='object-fill' alt='avatar-tool' ></img>
                                    </div>
                                </td>

                            ),
                        },
                        {
                            index: 'isPublic',
                            title: 'Công khai',
                            render: (_index, record) => (
                                <td>

                                    <div className="text-center">{record.isPublic ? '👌' : '🚫'}</div>
                                </td>
                            ),
                        },
                        { index: 'description', title: 'Mô tả', align: 'center', render: (_index, record) => <td dangerouslySetInnerHTML={{ __html: record.description }}></td> },
                        { index: 'updateAt', title: 'Chỉnh sửa gần nhất', align: 'center' },
                        {
                            index: 'action',
                            title: 'Thao tác',
                            render: (index, record) => (
                                <td
                                    className="flex gap-4 justify-center mt-2"
                                    key={`action-${index}`}
                                >
                                    <button
                                        onClick={() => {
                                            router.push(`/admin/tool/edit/${record.id}`);
                                        }}
                                    >
                                        <EditIcon className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={() => {
                                            const check = window.confirm('Bạn chắc chắn muốn xóa');
                                            if (check) {
                                                deletePost.mutate({ key: record.id });
                                            }
                                        }}
                                    >
                                        <DeleteIcon className="w-6 h-6" />
                                    </button>
                                </td>
                            ),
                        },
                    ]}
                    data={data}
                ></Table>
            )}

        </div>
    );
};
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: 'Admin editor', description: 'Trang công cụ' }}>
            {page}
        </Layout>
    );
};
export default Page;

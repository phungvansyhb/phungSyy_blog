import React from 'react';
import Layout from '../../../components/Layout';
import Table from '../../../components/Table';
import { AddIcon, DeleteIcon, EditIcon } from '../../../assets/icons';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    getListDocs,
    deleteDocument,
    writeBatchDoc,
    WriteBatchParam,
} from 'services/fireBase.service';
import { ArchonButton } from 'components';
import { KeyDb, Post } from 'models/blog';
import toast from 'react-hot-toast';
import { DocumentData } from 'firebase/firestore';
import dayjs from 'dayjs';
// import type Post from 'models/blog'

const Page = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery(
        'getAllPost',
        () => getListDocs({ key: KeyDb.POST, orderKey: 'updateAt', orderDirection: 'desc' }),
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
            const paramsObj: WriteBatchParam[] = [
                { type: 'delete', key: KeyDb.POST, customId: key },
                { type: 'delete', key: KeyDb.POSTDETAIL, customId: key },
            ];
            return writeBatchDoc(paramsObj);
            // return deleteDocument(KeyDb.POST, [key]);
        },
        {
            onSuccess: (_data, { key }) => {
                const data = queryClient.getQueryData<Post[]>('getAllPost');
                queryClient.setQueryData('getAllPost', () =>
                    data?.filter((item) => item.id !== key)
                );
                toast.success('Xóa bài viết thành công');
            },
            onError: () => {
                toast.error('Xóa bài viết thất bại');
            },
        }
    );
    return (
        <div className="h-main-content">
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
                        { index: 'title', title: 'Tên bài viết', align: 'center' },
                        {
                            index: 'isPublic',
                            title: 'Công khai',
                            render: (_index, record) => (
                                <div className="text-center">{record.isPublic ? '👌' : '🚫'}</div>
                            ),
                        },
                        { index: 'category', title: 'Chủ đề', align: 'center' },
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
                                            router.push(`/admin/blog/edit/${record.id}`);
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
            <ArchonButton
                icon={<AddIcon className="w-6 h-6 font-bold text-white" />}
                position={{ bottom: 20, right: 20 }}
                width={55}
                height={55}
                action={() => router.push('/admin/blog/create-post')}
                tooltip="Create new post"
            />
        </div>
    );
};
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: 'Admin editor', description: 'Trang viết bài' }}>
            {page}
        </Layout>
    );
};
export default Page;

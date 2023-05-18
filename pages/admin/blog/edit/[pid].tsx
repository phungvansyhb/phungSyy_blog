import { PageEditor } from 'components/PageEditor';
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getDetailDoc } from 'services/fireBase.service';
import { Post, KeyDb } from 'models/blog';
import Layout from 'components/Layout';

type Props = {};

function Page({}: Props) {
    const router = useRouter();
    const { pid } = router.query;
    const { data, isFetching } = useQuery(
        ['getDetailPost', pid],
        async () => {
            const metaData = await getDetailDoc(KeyDb.POST, [pid as string]);
            const content = await getDetailDoc(KeyDb.POSTDETAIL, [pid as string]);
            return { ...metaData, ...content };
        },
        { enabled: !!pid }
    );
    return <PageEditor isEdit initPost={data as (Post & { content: string }) | undefined} />;
}
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: 'Admin-EditPost', description: 'Admin chỉnh sửa bài viết' }}>
            {page}
        </Layout>
    );
};
export default Page;

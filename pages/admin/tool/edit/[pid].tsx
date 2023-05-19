import { PageEditor } from 'components/PageEditor';
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getDetailDoc } from 'services/fireBase.service';
import { Post, KeyDb } from 'models/blog';
import Layout from 'components/Layout';
import { CreateTool } from 'components/CreateTool';
import { ToolModel } from 'models/tool.model';

type Props = {};

function Page({ }: Props) {
    const router = useRouter();
    const { pid } = router.query;
    const { data, isFetching } = useQuery(
        ['getDetailTool', pid],
        async () => {
            return getDetailDoc(KeyDb.TOOL, [pid as string]);
        },
        { enabled: !!pid }
    );
    return <CreateTool isEdit initTool={data as ToolModel | undefined} />
}
Page.getLayout = function (page: React.ReactElement) {
    return (
        <Layout metaObject={{ title: 'Admin-EditTool', description: 'Admin chỉnh sửa công cụ' }}>
            {page}
        </Layout>
    );
};
export default Page;

import Layout from 'components/Layout';
import { PageEditor } from 'components/PageEditor';
import React from 'react';

type Props = {}

function Page({}: Props) {
  return <PageEditor isEdit={false} />;
}
Page.getLayout = function (page: React.ReactElement) {
return <Layout metaObject={{title : 'Admin-CreatePost' , description : "Admin tạo mới bài viết"}}>{page}</Layout>;
};
export default Page
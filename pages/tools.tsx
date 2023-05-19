import { LoadingIcon } from 'assets/icons'
import DevToolItem from 'components/DevToolItem'
import Layout from 'components/Layout'
import { KeyDb } from 'models/blog'
import { ToolModel } from 'models/tool.model'
import { ReactNode } from 'react'
import { useQuery } from 'react-query'
import { getListDocs } from 'services/fireBase.service'
const data = [
    {
        id: 'asd123',
        title: 'React devtool',
        url: "https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi",
        avatar: "https://visadep.vn/wp-content/uploads/2020/07/6-39-300x300.jpg",
        description: "Nisi labore dolor aute mollit excepteur. Do in pariatur proident qui sint veniam do irure tempor magna. Excepteur velit ipsum officia voluptate commodo occaecat sunt minim. Aliquip aliqua veniam do nulla. Incididunt sit dolor Lorem dolore ea aliqua anim ad dolor commodo in. Ex ea et duis officia ad exercitation ex adipisicing est occaecat.",
        createAt: new Date(),
        updateAt: new Date(),
        isDeleted: false,
        isPublic: true
    },
    {
        id: 'asd444',
        title: 'React redux',
        url: "https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi",
        avatar: "https://visadep.vn/wp-content/uploads/2020/07/6-39-300x300.jpg",
        description: "Nisi labore dolor aute mollit excepteur. Do in pariatur proident qui sint veniam do irure tempor magna. Excepteur velit ipsum officia voluptate commodo occaecat sunt minim. Aliquip aliqua veniam do nulla. Incididunt sit dolor Lorem dolore ea aliqua anim ad dolor commodo in. Ex ea et duis officia ad exercitation ex adipisicing est occaecat.",
        createAt: new Date(),
        updateAt: new Date(),
        isDeleted: false,
        isPublic: true
    }]
const Tool = () => {
    const { data, isLoading } = useQuery({
        queryKey: ['getListTool'],
        queryFn: () => getListDocs({
            key: KeyDb.TOOL,
            orderKey: 'updateAt',
            orderDirection: 'desc',
            whereClause: [['isPublic', '==', true]],
        })
    })
    const RenderTool = () => {
        if (isLoading)
            return (
                <div className="w-full flex justify-center">
                    <LoadingIcon className="w-6 h-6 animate-spin" />
                </div>
            );
        if (Array.isArray(data)) {
            return (data as ToolModel[]).map((item, index) => (
                <DevToolItem {...item} key={item.id} index={index} />
            ))
        }
        return <></>;
    }
    return <section className="px-6 mobile:px-4 py-12 mobile:py-8 h-main-content dark:bgc-dark ">
        <div className='flex flex-col gap-4'>
            {RenderTool()}
        </div>
    </section>
}
Tool.getLayout = (page: React.ReactElement) =>
    <Layout metaObject={{ title: "Usefull DevTool", description: "Các tool hữu ích cho anh em dev" }}>
        {page}
    </Layout>

export default Tool
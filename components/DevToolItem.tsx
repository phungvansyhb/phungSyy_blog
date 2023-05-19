import { ToolModel } from 'models/tool.model'
import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion";
import { ReadMoreIcon } from 'assets/icons';

type Props = ToolModel

const initData: ToolModel =
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
}


export default function DevToolItem(props: Props & { index: number }) {
    return (

        <div className='flex mobile:flex-col dark:shadow-2xl
        bg-white dark:bgc-deep-dark w-full
          rounded-lg py-3 px-6 gap-3 dark:border-slate-800 border '>
            <div className='h-full w-1/3 mobile:w-full'>
                <img src={props.avatar} alt='tool-avatar' className='object-cover rounded-lg'></img>
            </div>
            <div className='flex flex-col justify-between py-4'>
                <div className='font-bold text-3xl dark:text-white mb-4'>{props.title}</div>
                <div className='font-bold  dark:text-white flex-grow' dangerouslySetInnerHTML={{ __html: props.description }}></div>
                <Link href={props.url} className='dark:text-white underline-offset-4 underline'>
                    <div className='flex gap-2'>    View Detail <ReadMoreIcon className={'w-6 h-6'} /></div> </Link>
            </div>
        </div>
    )
}
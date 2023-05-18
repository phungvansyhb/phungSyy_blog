import { ToolModel } from 'models/tool.model'
import Link from 'next/link'
import React from 'react'
import { motion } from "framer-motion";

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
        <motion.div
            className={`flex tablet:flex-col mobile:flex-col items-center justify-center 
        ${props.index % 2 === 1 && "flex-row-reverse"} 
        gap-12 tablet:gap-4 mobile:gap-2 
       `}
            initial={{ opacity: 0, x: props.index % 2 === 0 ? "70%" : "-70%" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", duration: 1 }}
        >
            <div className='flex dark:shadow-2xl
        bg-white dark:bgc-deep-dark 
          rounded-lg py-3 px-6 gap-3 dark:border-slate-800 border '>
                <div className='h-full w-1/3'>
                    <img src={props.avatar} alt='tool-avatar' className='object-cover rounded-lg'></img>
                </div>
                <div className='flex flex-col justify-between py-4'>
                    <div className='font-bold text-2xl dark:text-white mb-4'>{props.title}</div>
                    <div className='font-bold  dark:text-white flex-grow'>{props.description}</div>
                    <Link href={props.url} className='dark:text-white underline-offset-4 underline'>View Detail</Link>
                </div>
            </div>
        </motion.div>
    )
}
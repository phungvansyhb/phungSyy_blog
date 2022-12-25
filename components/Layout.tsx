import Head from "next/head";
import React from "react";
import {
    AboutIconHeader,
    BlogIconHeader,
    DarkThemeIcon,
    LighThemeIcon,
    ProjectIconHeader,
} from "../assets/icons";
import Switch from "./Switch";
import Link from 'next/link'
import useScreenDetect from "../hooks/useScreenDetect";

type MetaScreenSeo ={
    title : string ,
    description :string 
}

type Props = { children: React.ReactElement , metaObject :MetaScreenSeo  };

export default function Layout({ children , metaObject }: Props) {
    const screen = useScreenDetect()
    
    function handleChangeTheme(checked: boolean) {
        if (checked) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }
    return (
        <>
            <Head>
                <title>{metaObject.title}</title>
                <meta name="description" content={metaObject.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/medal.svg" />
            </Head>
            <main>
                <header className="flex justify-between px-[72px] py-8 bg-white dark:bgc-dark shadow-md dark:shadow-2xl sticky top-0">
                    <section className="flex gap-8">
                        <Link href='/' className="flex gap-2 items-center text-header dark:text-white">
                            <BlogIconHeader className="w-6 h-6" /> Blog
                        </Link>
                        <Link href='/project' className="flex gap-2 items-center text-header dark:text-white">
                            <ProjectIconHeader className="w-6 h-6" /> Project
                        </Link>
                        <Link href='/about' className="flex gap-2 items-center text-header dark:text-white">
                            <AboutIconHeader className="w-6 h-6" /> Me
                        </Link>
                    </section>
                    <Switch
                        defaultChecked={true}
                        onChecked={handleChangeTheme}
                        checkedLabel={<LighThemeIcon className="w-8 h-8" />}
                        unCheckedLabel={<DarkThemeIcon className="w-8 h-8" />}
                    />
                </header>
                <main>
                    {children}
                </main>
            </main>
        </>
    );
}

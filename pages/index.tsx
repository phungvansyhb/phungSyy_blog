import Head from "next/head";
import {
    BlogIconHeader,
    ProjectIconHeader,
    AboutIconHeader,
    LighThemeIcon,
    DarkThemeIcon,
} from "../assets/icons/index";
import { Switch } from "../components/index";
import { useState } from "react";
export default function Home() {
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
                <title>PhungSyy Blog</title>
                <meta name="description" content="Tôi viết về bất kỳ điều gì tôi thích" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/medal.svg" />
            </Head>
            <main>
                <header className="flex justify-between px-[72px] py-8 bg-white dark:bgc-dark shadow-md dark:shadow-2xl sticky top-0">
                    <section className="flex gap-8">
                        <h2 className="flex gap-2 items-center text-header dark:text-white">
                            <BlogIconHeader className="w-6 h-6" /> Blog
                        </h2>
                        <h2 className="flex gap-2 items-center text-header dark:text-white">
                            <ProjectIconHeader className="w-6 h-6" /> Project
                        </h2>
                        <h2 className="flex gap-2 items-center text-header dark:text-white">
                            <AboutIconHeader className="w-6 h-6" /> Me
                        </h2>
                    </section>
                    <Switch
                        defaultChecked={true}
                        onChecked={handleChangeTheme}
                        checkedLabel={<LighThemeIcon className="w-8 h-8" />}
                        unCheckedLabel={<DarkThemeIcon className="w-8 h-8" />}
                    />
                </header>
                <div className="font-bold text-4xl text-green-600 dark:text-red-600 px-[72px] bgc-primary dark:bgc-dark h-screen">
                    Hello here is home page
                </div>
            </main>
        </>
    );
}

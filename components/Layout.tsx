import { useCookie } from "hooks/useCookies";
import { KeyDb } from "models/blog";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
    AboutIconHeader,
    BlogIconHeader,
    DarkThemeIcon,
    EmailIcon,
    FaceBookIcon,
    GithubIcon,
    HeartIcon,
    LighThemeIcon,
    ProjectIconHeader,
    SkypeIcon
} from "../assets/icons";
import ToolHeader from "assets/icons/ToolHeader";
``;
const Switch = dynamic(import("./Switch"), { ssr: false });
// import useScreenDetect from "../hooks/useScreenDetect";

type MetaScreenSeo = {
    title: string;
    description: string;
};

type Props = {
    children: React.ReactElement;
    metaObject?: MetaScreenSeo;
    removeStickyHeader?: boolean;
};


export default function Layout({ children, metaObject, removeStickyHeader }: Props) {
    const [themeBlog, setTheme] = useCookie(KeyDb.APPTHEME, KeyDb.DARKTHEME);
    const router = useRouter();
    const { pathname } = router;
    useEffect(() => {
        if (themeBlog === KeyDb.LIGHTHEME) {
            document.documentElement.classList.remove("dark");
        } else {
            document.documentElement.classList.add("dark");
        }
    }, [themeBlog]);
    return (
        <>
            {typeof metaObject === "object" && (
                <Head>
                    <title>{metaObject.title}</title>
                    <meta name="description" content={metaObject.description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="author" content="Sỹ PV" />
                    <meta name="language" content="VI" />
                    <meta name="reply-to" content="phungvansyhb@gmail.com" />
                    <link rel="icon" href="/medal.svg" />
                </Head>
            )}
            <main>
                <header
                    className={`flex justify-between 
                        px-[72px] tablet:px-[36px] mobile:px-[12px]
                        py-4 
                         bg-white dark:bgc-dark 
                        header-shadow dark:shadow-2xl 
                        ${removeStickyHeader ? "" : "sticky"} top-0 z-[1090]`}
                >
                    <Toaster position="top-center" />
                    <section className="flex gap-8 tablet:gap-6 mobile:gap-4 mobile:justify-around mobile:w-full">
                        <div className={`${pathname === "/" && "active-menu"}`}>
                            <Link
                                href="/"
                                className={`flex gap-2 items-center text-header dark:text-white text-primary`}
                            >
                                <BlogIconHeader className="w-6 h-6" /> Blog
                            </Link>
                        </div>
                        <div className={`${pathname === "/project" && "active-menu"}`}>
                            <Link
                                href="/project"
                                className={`flex gap-2 items-center text-header dark:text-white text-primary`}
                            >
                                <ProjectIconHeader className="w-6 h-6" /> Project
                            </Link>
                        </div>
                        <div className={`${pathname === "/about" && "active-menu"}`}>
                            <Link
                                href="/about"
                                className={`flex gap-2 items-center text-header dark:text-white text-primary `}
                            >
                                <AboutIconHeader className="w-6 h-6" /> Me
                            </Link>
                        </div>
                        <div className={`${pathname === "/tools" && "active-menu"}`}>
                            <Link
                                href="/tools"
                                className={`flex gap-2 items-center text-header dark:text-white text-primary `}
                            >
                                <ToolHeader className="w-6 h-6" /> Tools
                            </Link>
                        </div>
                    </section>
                    <div className="mobile:hidden">
                        <Switch
                            defaultChecked={themeBlog === KeyDb.LIGHTHEME ? true : false}
                            // defaultChecked={ false}
                            onChecked={(checked: boolean) =>
                                setTheme(checked ? KeyDb.LIGHTHEME : KeyDb.DARKTHEME)
                            }
                            checkedLabel={<LighThemeIcon className="w-8 h-8" />}
                            unCheckedLabel={<DarkThemeIcon className="w-8 h-8" />}
                        />
                    </div>
                    {
                        !pathname.includes("/admin") && <button data-tally-open="wkbgqe" data-tally-emoji-text="👋" data-tally-emoji-animation="wave" className="fixed bottom-20 right-8 text-4xl mobile:text-3xl wave z-50">👋</button>
                    }

                </header>
                <main>
                    {children}

                    <div className="-rotate-90 fixed bottom-[100px] -left-4 hidden mobile:block">
                        <Switch
                            defaultChecked={themeBlog === KeyDb.LIGHTHEME ? true : false}
                            // defaultChecked={ false}
                            onChecked={(checked: boolean) =>
                                setTheme(checked ? KeyDb.LIGHTHEME : KeyDb.DARKTHEME)
                            }
                            checkedLabel={<LighThemeIcon className="w-8 h-8" />}
                            unCheckedLabel={<DarkThemeIcon className="w-8 h-8" />}
                        />
                    </div>
                </main>
                <footer
                    className="flex justify-between
                    px-[88px] tablet:px-[40px] mobile:px-6
                    py-7
                  dark:bgc-dark "
                >
                    <div className="flex gap-2 font-bold text-info items-center dark:text-white">
                        @ Made by PhungSyy <HeartIcon className="w-6 h-6" />
                    </div>
                    <div className="flex gap-6 mobile:gap-2">
                        <a
                            href={"https://www.facebook.com/chickenz"}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaceBookIcon className="w-6 h-6"></FaceBookIcon>
                        </a>
                        <a
                            href={"https://join.skype.com/invite/wqaybwu8bppD"}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <SkypeIcon className="w-6 h-6"></SkypeIcon>
                        </a>
                        <a
                            href={"https://github.com/phungvansyhb"}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <GithubIcon className="w-6 h-6"></GithubIcon>
                        </a>
                        <a href={"mailto:phungvansyhb@gmail.com"} target="_blank" rel="noreferrer">
                            <EmailIcon className="w-6 h-6"></EmailIcon>
                        </a>
                        {/* <TwitterIcon className="w-6 h-6"></TwitterIcon> */}
                    </div>
                </footer>
            </main>
        </>
    );
}

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import Script from "next/script";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.scss";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import PageLoading from "components/PageLoading";

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, ...props: any[]) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

NProgress.configure({
    minimum: 0.2,
    easing: "ease",
    speed: 800,
    showSpinner: false,

});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();
    const [isLoading, setLoading] = React.useState(false);
    React.useEffect(() => {
        const handleStart = (url: string) => {
            setLoading(true);
            NProgress.start();
        };
        const handleStop = () => {
            setLoading(false);
            NProgress.done();
        };
        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleStop);
        router.events.on("routeChangeError", handleStop);
        return () => {
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleStop);
            router.events.off("routeChangeError", handleStop);
        };
    }, [router]);
    const getLayout = Component.getLayout ?? ((page) => page);
    return getLayout(
        <QueryClientProvider client={queryClient}>
            <main className="font-sans">
                {/* <script async src="https://tally.so/widgets/embed.js"></script> */}
                <Script src="https://tally.so/widgets/embed.js" />
                {isLoading && <PageLoading />}
                <Component {...pageProps} />
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

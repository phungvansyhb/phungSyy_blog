import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import Script from 'next/script'
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.scss";

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement, ...props: any[]) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const [queryClient] = React.useState(
        () => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } })
    );
    const getLayout = Component.getLayout ?? ((page) => page);
    return getLayout(
        <QueryClientProvider client={queryClient}>
            <main className="font-sans">
                    {/* <script async src="https://tally.so/widgets/embed.js"></script> */}
                    <Script src="https://tally.so/widgets/embed.js" />
                    <Component {...pageProps} />
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

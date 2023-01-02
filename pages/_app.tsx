import { Courier_Prime } from "@next/font/google";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "react-quill/dist/quill.snow.css";
import "../styles/globals.scss";
const courierPrime = Courier_Prime({ weight: "400", subsets: ["latin"] });
// const alegreya_Sans = Alegreya_Sans({ weight: "400", subsets: ["vietnamese"] });
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
            <main className={courierPrime.className}>
                    <Component {...pageProps} />
            </main>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

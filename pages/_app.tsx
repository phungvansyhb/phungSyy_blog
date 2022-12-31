import React from "react";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";
import { Courier_Prime } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const courierPrime = Courier_Prime({ weight: "400", subsets: ["latin"] });
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
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

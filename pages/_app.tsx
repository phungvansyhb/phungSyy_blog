import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Courier_Prime } from "@next/font/google";

const courierPrime = Courier_Prime({ weight: "400", subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main className={courierPrime.className}>
            <Component {...pageProps} />
        </main>
    );
}

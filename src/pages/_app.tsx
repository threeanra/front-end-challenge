import { Providers } from "@/components/layout/Providers";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Navbar />
      <Component {...pageProps} />
    </Providers>
  );
}

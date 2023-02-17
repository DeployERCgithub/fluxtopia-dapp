import type { AppProps } from "next/app";
import {  ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";


// This is the chainId your dApp will work on.


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={"ethereum"}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;

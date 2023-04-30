import { store } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ProviderRedux } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProviderRedux store={store}>
      <Component {...pageProps} />
    </ProviderRedux>
  );
}

import "@/styles/globals.css";
import ConfigProvider from "antd/lib/config-provider";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

const data = {
  borderRadius: 6,
  colorPrimary: "#337a76",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius,
          fontSize: 16,
        },
      }}
    >
      <Component {...pageProps} />

      <Toaster position="top-center" reverseOrder={false} />
    </ConfigProvider>
  );
}

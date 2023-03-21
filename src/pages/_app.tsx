import "@/styles/globals.css";
import ConfigProvider from "antd/lib/config-provider";
import type { AppProps } from "next/app";

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
    </ConfigProvider>
  );
}

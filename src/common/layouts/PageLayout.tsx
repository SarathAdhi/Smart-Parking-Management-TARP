import clsx from "clsx";
import Head from "next/head";
import React from "react";
import Navbar from "../components/Navbar";
import { Component } from "../types/components";

type Props = {
  title: string;
};

export const PageLayout: React.FC<Props & Component> = ({
  title,
  className,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main className="w-full min-h-screen flex flex-col">
        <Navbar />

        <div className={clsx("w-full p-3 md:p-5 flex-1", className)}>
          {children}
        </div>
      </main>
    </>
  );
};

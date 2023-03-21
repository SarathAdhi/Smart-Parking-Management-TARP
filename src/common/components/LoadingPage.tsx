import SpinFC from "antd/lib/spin";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full grid place-content-center">
      <SpinFC size="large" />
    </div>
  );
};

export default LoadingPage;

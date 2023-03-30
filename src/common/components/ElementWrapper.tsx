import React from "react";
import { Component } from "../types/components";

type Props = {
  label: string;
};

export const ElementWrapper: React.FC<Props & Component> = ({
  children,
  label,
}) => {
  return (
    <div className="grid w-full">
      <label className="text-lg font-semibold">{label}</label>

      {children}
    </div>
  );
};

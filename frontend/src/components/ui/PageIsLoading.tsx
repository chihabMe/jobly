import React from "react";
import { MoonLoader } from "react-spinners";

const PageIsLoading = ({ size, color }: { size?: number; color?: string }) => {
  const spinnerSize = size || 5;
  return (
    <div className="w-full  h-full flex items-center justify-center">
      <span className="">
        <MoonLoader size={spinnerSize} color={color || "#2563EB"} />
      </span>
    </div>
  );
};

export default PageIsLoading;

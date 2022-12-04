import React, { ReactNode } from "react";

const Controller = ({
  text,
  htmlFor,
  children,
  error,
}: {
  text: string;
  htmlFor: string;
  children: ReactNode;
  error?: string[];
}) => {
  return (
    <div className="flex flex-col gap-2 w-full    ">
      <label
        className="capitalize font-medium text-base text-title dark:text-title-dark"
        htmlFor={htmlFor}
      >
        {text} :
      </label>
      {children}
      {error?.map((item,index) => {
        return <span key={item+index.toString()} className="text-red-300  text-sm">- {item}</span>;
      })}
    </div>
  );
};

export default Controller;

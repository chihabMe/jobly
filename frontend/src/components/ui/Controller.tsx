import React, { ReactNode } from "react";

const Controller = ({ text, htmlFor,children }: { text: string; htmlFor: string ,children:ReactNode}) => {
  return (
    <div className="flex flex-col gap-2 w-full    ">
      <label className="capitalize font-medium text-base text-title" htmlFor={htmlFor}>{text} :</label>
      {children}
    </div>
  );
};

export default Controller;

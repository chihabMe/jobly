import { Alert, Card } from "@material-tailwind/react";
import React from "react";
import { Popover } from "@headlessui/react";
interface Props {
  children: React.ReactNode;
  className?: string;
}
const Model = ({ children, className }: Props) => {
  return (
    <>
      {/* overlay */}
      <div className="  bg-gray-200 dark:bg-gray-900 opacity-60 fixed top-0 bottom-0 right-0 left-0"></div>
      <Card
        className={`${className} px-8 py-4  shadow fixed flex flex-col gap-2 top-1/3 right-1/2 translate-x-1/2  -translate-y-1/2 w-full max-w-2xl    rounded-md bg-bg dark:bg-bg-dark `}
      >
        {children}
      </Card>
    </>
  );
};

export default Model;

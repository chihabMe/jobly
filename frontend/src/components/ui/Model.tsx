import { Alert, Card } from "@material-tailwind/react";
import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
interface Props {
  children: React.ReactNode;
  className?: string;
  handler: () => void;
  open: boolean;
  header?: string;
}
const Model = ({ children, header, className, handler, open }: Props) => {
  return (
    <Dialog
      open={open}
      handler={handler}
      className="w-full  max-w-sm rounded-md bg-bg dark:bg-bg-dark"
    >
      <DialogBody className="${className}  px-8 py-4    flex flex-col gap-2         ">
        {children}
      </DialogBody>
    </Dialog>
  );
};

export default Model;

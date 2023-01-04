import React, { useEffect, useRef, useState } from "react";
import { Alert as MtAlert } from "@material-tailwind/react";
interface Props {
  body: string;
}
const Alert = ({ body }: Props) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const time = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, []);
  if (!show) return <></>;
  return (
    <MtAlert className=" fixed bg-primary py-2.5   max-w-sm w-full  right-2 bottom-4">
      <p className="text-white p-1 z-50 text-sm md:text-base  font-medium">
        {body}
      </p>
    </MtAlert>
  );
};

export default Alert;

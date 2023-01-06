import React, { useEffect, useState } from "react";
import UseFetch from "src/hooks/use-fetch";
import { useJobApplyMutation } from "src/store/features/jobApi";
import Button from "../ui/Button";
import PageIsLoading from "../ui/PageIsLoading";
interface Props {
  applied: boolean;
  slug: string;
}
const JobDetailApplyButton = ({ slug, applied }: Props) => {
  const [jobApply, { isError, isLoading }] = useJobApplyMutation();
  const handlerClick = () => {
    try {
      jobApply(slug).unwrap();
    } catch {}
  };
  return (
    <Button
      onClick={handlerClick}
      className={` rounded-md flex justify-center items-center !bg-primary !text-sm  !font-medium py-3 md:py-4 w-32 sm:w-40 md:w-52  text-title-dark ${
        applied && "!opacity-70  !bg-red-300"
      } `}
    >
      {!isLoading && <span>{applied ? "Cancel" : "Apply now"}</span>}
      {isLoading && <PageIsLoading color="white" size={12} />}
    </Button>
  );
};

export default JobDetailApplyButton;

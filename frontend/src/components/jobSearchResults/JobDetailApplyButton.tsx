import React, { useEffect, useState } from "react";
import UseFetch from "src/hooks/use-fetch";
import { useJobApplyMutation } from "src/store/features/jobApi";
import Button from "../ui/Button";
interface Props  {
    applied :boolean ,
    slug:string,
}
const JobDetailApplyButton = ({slug,applied}:Props) => {
    const [jobApply,{isError,isLoading}] = useJobApplyMutation()
    const handlerClick = ()=>{
      try{
        jobApply(slug).unwrap()
      }catch{

      }
    }
  return (
    <Button
    onClick={handlerClick}
      className={` rounded-md !bg-primary !text-sm  !font-medium   px-14 text-title-dark ${
        applied && "!opacity-70 " 
      } `}
    >
      {applied ? "Cancel" : "Apply now"}
    </Button>
  );
};

export default JobDetailApplyButton;

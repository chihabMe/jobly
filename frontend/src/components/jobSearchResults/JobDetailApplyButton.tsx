import React, { useEffect, useState } from "react";
import UseFetch from "src/hooks/use-fetch";
import Button from "../ui/Button";
interface Props  {
    applied :boolean ,
    slug:string,
    updateApplied:(value:boolean)=>void,
}
const JobDetailApplyButton = ({slug,applied,updateApplied}:Props) => {
    const {request,status,isLoading,data}= UseFetch()
    const handlerClick = ()=>{
        request("POST",`/api/jobs/${slug}/apply/`)
    }
    useEffect(()=>{
        if(!isLoading && status==200) updateApplied(false)
        else if( !isLoading && status==201) updateApplied(true)
    },[status])
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

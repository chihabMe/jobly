import React, { useEffect, useState } from "react";
import UseFetch from "src/hooks/use-fetch";
import Button from "../ui/Button";
interface Props  {
    applied :boolean ,
    slug:string
}
const JobDetailApplyButton = ({slug,applied}:Props) => {
    const {request,status,isLoading,data}= UseFetch()
    const [active,setActive] =  useState(applied)
    const handlerClick = ()=>{
        request("POST",`api/jobs/${slug}/apply/`)
    }
    useEffect(()=>{
        if(!isLoading && status==200)setActive(false)
        else if( !isLoading && status==201)setActive(true)
    },[status])
  return (
    <Button
    onClick={handlerClick}
      className={` rounded-md !bg-primary !text-sm  !font-medium   px-14 text-title-dark ${
        active && "!opacity-70 " 
      } `}
    >
      {active ? "Cancel" : "Apply now"}
    </Button>
  );
};

export default JobDetailApplyButton;

import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react'
import UseFetch from 'src/hooks/use-fetch';
interface props {
    bookMarked:boolean;
    slug:string;
}
const JobBookMark = ({slug,bookMarked}:props) => {
    const {request,status,isLoading,data}= UseFetch()
    const [active,setActive] =  useState(bookMarked)
    const handlerClick = ()=>{
        request("POST",`api/jobs/${slug}/book-mark`)
    }
    useEffect(()=>{
        if(!isLoading && status==200)setActive(false)
        else if( !isLoading && status==201)setActive(true)
    },[status])
  return (
        <div onClick={handlerClick} className="  text-title       dark:text-yellow-300 cursor-pointer">
          {!active && <BookmarkIcon className="w-5 h-5" />}
          {active && <BookmarkSlashIcon className="w-5 h-5 " />}
        </div>
  )
}

export default JobBookMark
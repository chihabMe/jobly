import React, { FormEvent, Fragment, useState } from 'react';
import Button from 'src/components/ui/Button';
import SelectMenu from 'src/components/ui/SelectMenu';
import {MagnifyingGlassIcon,MapPinIcon,BriefcaseIcon} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { searchActions } from 'src/store/slices/searchSlice';
import Field from 'src/models/Field';

const industries = [
  {name:"software engineer",id:1},
  {name:"web developer",id:2},
  {name:"graphic designer",id:3},
  {name:"videos editor",id:4},
  {name:"web security tester",id:5},
]
const locations = [
  {name:"algiers",id:1},
  {name:"oran",id:2},
  {name:"constantine",id:3},
  {name:"biskra",id:4},
  {name:"batna",id:5},
    
]
const getIndex = (array:Field[],value:string )=>{
  array.forEach(item=>{
    if(item.name==value)return item.id;
  })
  return 0 
}
const JobSearch = ({industry,location,query}:{industry?:string,location?:string,query?:string}) => {

  const router = useRouter();
  const [form,setForm] = useState({
    industry: industry ? {name:industry,id:getIndex(industries,industry)}:{name:"chose",id:0},
    location: location ? {name:location,id:getIndex(locations,location)}:{name:"chose",id:0},
    query:query||"",
  })
  console.log("0000000000000")
  console.log(form)
  console.log("0000000000000")
  //const searchValues = useSelector(state=>state.search);
  const submitHandler = (e:FormEvent)=>{
    e.preventDefault();
    const query = {
        location:form.location.name,
        industry:form.industry.name,
        query:form.query,
      }

    router.push("/search",{
      query,
    })
  }
  const [editing,setEditing]=useState(false)
  const changeIndustry = (value:Field)=>{
    setForm(prev=>({...prev,industry:value}))
  }
  const changeLocation = (value:Field)=>{
    setForm(prev=>({...prev,location:value}))
  }
  const onChangeQuery = (e:any)=>{
    setForm(prev=>({...prev,query:e.target.value}))
  }
  
  return (
    <form onSubmit={submitHandler} className={`w-full max-w-3xl mx-auto     outline-1 ${editing && 'outline-2'}  outline outline-primary  bg-bg flex flex-col  px-4 py-3  md:flex-row gap-2 md:gap-0 justify-between items-center  rounded-lg`}>
        {/* industries */}
        <SelectMenu value={form.industry} changeValue={changeIndustry} fields={industries}  Icon={BriefcaseIcon} />
        <SelectMenu value={form.location} changeValue={changeLocation} fields={locations} Icon={MapPinIcon}  />
        <div className='my-2  w-full md:w-auto'>
        <input value={form.query} onChange={onChangeQuery} onFocus={()=>{setEditing(true)}} onBlur={()=>{setEditing(false)}} type="text" className='w-full md:w-48  py-4 bg-transparent outline-none rounded-md p-2 text-title' placeholder='search'/>
        </div>
        <Button text='search' className='rounded-lg font-medium  hover:opacity-75 transition-all duration-150  bg-primary px-4  justify-center md:px-7 capitalize py-3 md:py-4 w-full md:w-auto'>
            <MagnifyingGlassIcon className='w-4 h-4 mt-1   '/>
        </Button>

    </form>
  )
}

export default JobSearch
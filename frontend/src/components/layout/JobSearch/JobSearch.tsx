import React, { Fragment, useState } from 'react';
import Button from 'src/components/ui/Button';
import SelectMenu from 'src/components/ui/SelectMenu';
import {MagnifyingGlassIcon,MapPinIcon,BriefcaseIcon} from '@heroicons/react/24/outline';

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

const JobSearch = () => {
  return (
    <form className='w-full  bg-bg flex flex-col  px-4 py-3  md:flex-row gap-2 md:gap-0 justify-between items-center  rounded-lg'>
        {/* industries */}
        <SelectMenu fields={industries}  Icon={BriefcaseIcon} />
        <SelectMenu fields={locations} Icon={MapPinIcon}  />
        <div className='my-2  w-full md:w-auto'>
        <input type="text" className='w-full md:w-48  py-4 bg-transparent outline-none rounded-md p-2' placeholder='search'/>
        </div>
        <Button text='search' className='rounded-lg font-medium  hover:opacity-75 transition-all duration-150  bg-primary px-4  justify-center md:px-7 capitalize py-3 md:py-4 w-full md:w-auto'>
            <MagnifyingGlassIcon className='w-4 h-4 mt-1   '/>
        </Button>

    </form>
  )
}

export default JobSearch
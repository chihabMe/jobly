import React from 'react'
import User from 'src/models/User'
import ProfileTitle from './ProfileTitle';
import {BriefcaseIcon,FaceFrownIcon} from '@heroicons/react/24/solid'

const JobSeeking = ({user}:{user:User}) => {
  return (
    <>
      <ProfileTitle>job seeking </ProfileTitle>

      <div className="flex p-4 rounded-md flex-col  bg-bg dark:bg-bg-dark  ">
        <ul className=" grid md:grid-cols-2 gap-4 text-sm text-title dark:text-title-dark">

          <li className="flex gap-2 items-center">
            <span  className='flex  items-center gap-1'>
                    <BriefcaseIcon className='w-4 h-4 text-primary'/>
                 applied jobs
            </span>
            <span>{user?.appliedCount||0}</span>
          </li>

          <li className="flex gap-2 items-center">
            <span   className='flex gap-2 items-center'>
                    <FaceFrownIcon className='w-4 h-4  text-red-500 '/>
                rejected jobs
            </span>
            <span className=''>{user?.rejectedCount||0}</span>
          </li>

        </ul>
      </div>
    </>
  );

}

export default JobSeeking
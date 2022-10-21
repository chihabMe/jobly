import React from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import ProfileUserInfos from './ProfileUserInfos'
import Button from 'src/components/ui/Button'
import ProfileTitle from './ProfileTitle'
import ProfileResume from './ProfileResume'
import ProfileImage from './ProfileImage'
import JobSeeking from './JobSeeking'

const Profile = () => {
    const {user,isLoading} = useSelector(state=>state.auth)
    if(isLoading)return 'loading'
  return (
    <div className='w-full  py-10'>
        <div className='max-w-xl  mx-auto flex flex-col gap-4  px-2'>
            <ProfileImage user={user} />
            <ProfileUserInfos user={user}/>
            <ProfileResume user={user} />
            <JobSeeking user={user}/>


        </div>

    </div>
  )
}

export default Profile
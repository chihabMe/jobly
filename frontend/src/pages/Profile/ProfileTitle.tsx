import React, { ReactNode } from 'react'

const ProfileTitle = ({children}:{children:ReactNode}) => {
  return (
  <h1 className='text-xl text-gray-800 capitalize font-bold'>{children}</h1>
  )
}

export default ProfileTitle
import { Menu } from '@headlessui/react'
import React from 'react'
import Button from 'src/components/ui/Button'
import NavLink from 'src/components/ui/NavLink'
import {ChevronDownIcon,ChevronUpDownIcon} from '@heroicons/react/24/outline'
import NavMenu from 'src/components/ui/NavMenu'
import NavMenuItem from 'src/components/ui/NavMenuItem'
import linkObject from 'src/models/linkObject'

const categoriesLinks:linkObject[] = [
  {name:"software engineer",path:"jobs/category?=software_engineer"},
  {name:"web developer",path:"jobs/category?=web_developer"},
  {name:"graphic designer",path:"jobs/category?=graphic_designer"},
]

const Header = () => {
  return (
    <div className='py-4 text-white  flex  justify-between items-center  w-full'>
      {/* logo */}
      <div className='text-white text-4xl font-bold capitalize cursor-pointer'>job<span className='text-blue-400'>ly</span></div>
      {/* nav menu */}
      <div className='flex flex-grow gap-4 items-center justify-center md:mr-5  '>
        <NavMenu text='job type' linksObjects={categoriesLinks} />
        <NavMenu text='employers' linksObjects={categoriesLinks} />
        <NavMenu text='categories' linksObjects={categoriesLinks} />
        <NavLink href='/blogs' text='blogs' className=' font-medium capitalize cursor-pointer hover:text-blue-300      '  />
      </div>
      <div className='flex gap-4 items-center'>
        <Button text='sign up' className='capitalize  hover:border-blue-500 border-transparent border  px-3'  />
        <Button text='login' className='capitalize bg-blue-500 px-3 '  />
      </div>
    </div>
  )
}

export default Header
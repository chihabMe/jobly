import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import NavLink from "src/components/ui/NavLink";
import useAppDispatch from "src/hooks/useAppDispatch"; 
import useAppSelector from "src/hooks/useAppSelector";

import { XMarkIcon,Bars3Icon ,MoonIcon,SunIcon} from "@heroicons/react/24/solid";
import NavMenu from "src/components/ui/NavMenu";
import linkObject from "src/models/linkObject";
import Link from "next/link";
import { authActions } from "src/store/slices/authSlice";
import Image from "next/image";
import HeaderAuthDisplay from "./HeaderAuthDisplay";
import { useTheme } from "next-themes";


const categoriesLinks: linkObject[] = [
  { name: "software engineer", path: "jobs/category?=software_engineer" },
  { name: "web developer", path: "jobs/category?=web_developer" },
  { name: "graphic designer", path: "jobs/category?=graphic_designer" },
];
const links = [
  <NavMenu key={1} text="job type" linksObjects={categoriesLinks} />,
  <NavMenu key={2} text="employers" linksObjects={categoriesLinks} />,
  <NavMenu key={3} text="categories" linksObjects={categoriesLinks} />,
  <NavLink
    key={4}
    href="/blogs"
    text="blogs"
    className=" text-title font-medium capitalize cursor-pointer hover:text-primary      "
  />,
];
const Header = () => {

    const [isMounted , setIsMounted]=useState(false)
    const {theme,setTheme}= useTheme()

    useEffect(()=>{
        setIsMounted(true)
    },[])
    const themeToggler = ()=>{
        if(isMounted)
            setTheme(theme==="light"?"dark":"light")
    }
  const dispatch = useAppDispatch();
  const { isLogged, isLoading, user } = useAppSelector((state) => state.auth);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    if (window != undefined && window != null) {
      window.addEventListener("resize", () => {
        setShowMobileMenu(false);
      });
    }
  }, []);
  useEffect(() => {
    // dispatch(authActions.verify());
    // dispatch(authActions.loadUser());
  }, []);
  return (
    <>
      <div className="py-4 bg-bg dark:bg-bg-dark z-20 text-title dark:text-title-dark   sticky top-0 px-2   flex  justify-between items-center  w-full">
        {/* logo */}
        <div className=" text-4xl    font-bold capitalize cursor-pointer">
          <Link href="/">
            <span>
              job<span className="text-primary">ly</span>{" "}
            </span>
          </Link>
        </div>
        {/* nav menu hidden for the mobile */}
        <div className=" hidden sm:flex  flex-grow gap-4 items-center justify-center sm:mr-5  ">
          {links}
        </div>
        {/* */}
        <div className="flex   min-w-[100px] gap-4 items-center">
          {/* user menu  /login */}
          <Button onClick={themeToggler} className={`!p-2 !bg-bg dark:!bg-bg-dark ${theme=='light' ?'!text-title' :'!text-yellow-700'}`}>
            {theme=='light' &&  <MoonIcon className='w-5 h-5'/>}
            {theme!='light'  && <SunIcon className='w-5 h-5'/> }
          </Button>
          <HeaderAuthDisplay/>
          {/* menu toggler */}
          <Button
            className=" !p-0 !bg-transparent sm:hidden"
            onClick={() => {
              setShowMobileMenu((prev) => !prev);
            }}
          >
            <>
            {!showMobileMenu &&
            <Bars3Icon className="w-10 cursor-pointer h-10 text-title dark:text-title-dark " />
            }
            {showMobileMenu &&
            <XMarkIcon className="w-10 cursor-pointer h-10 text-title dark:text-title-dark " />
              }
            </>
          </Button>
        </div>
      </div>
      <Transition
        as={Fragment}
        show={showMobileMenu}
        enter="transform transition duration-[400ms]"
        enterFrom="opacity-0   "
        enterTo="opacity-100   "
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100   "
        leaveTo="opacity-0  "
      >
        <ul className="flex min-h-screen absolute bg-bg dark:bg-bg-dark  z-50 px-2  w-full pt-4  flex-col gap-4">{links}</ul>
      </Transition>
    </>
  );
};

export default Header;

// <Link href="/signup">
//   <span className="capitalize block cursor-pointer p-2 rounded-md  hover:border-blue-500 border-transparent border  px-3">
//     sign up
//   </span>
// </Link>

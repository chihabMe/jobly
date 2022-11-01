import { Menu, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import NavLink from "src/components/ui/NavLink";
import { useDispatch, useSelector } from "react-redux";

import { Bars3Icon } from "@heroicons/react/24/outline";
import NavMenu from "src/components/ui/NavMenu";
import linkObject from "src/models/linkObject";
import Link from "next/link";
import { AuthContext } from "src/context/AuthContext";
import { authActions } from "src/store/slices/authSlice";
import Image from "next/image";
import HeaderAuthDisplay from "./HeaderAuthDisplay";

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
    className=" text-title font-medium capitalize cursor-pointer hover:text-blue-300      "
  />,
];
const Header = () => {
  const dispatch = useDispatch();
  const { isLogged, isLoading, user } = useSelector((state) => state.auth);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  useEffect(() => {
    if (window != undefined && window != null) {
      window.addEventListener("resize", () => {
        setShowMobileMenu(false);
      });
    }
  }, []);
  useEffect(() => {
    dispatch(authActions.verify());
    dispatch(authActions.loadUser());
  }, []);
  return (
    <>
      <div className="py-4 bg-bg z-10  sticky top-0 px-2 text-white  flex  justify-between items-center  w-full">
        {/* logo */}
        <div className="text-white text-4xl font-bold capitalize cursor-pointer">
          <Link href="/">
            <span>
              job<span className="text-blue-400">ly</span>{" "}
            </span>
          </Link>
        </div>
        {/* nav menu hidden for the mobile */}
        <div className=" hidden sm:flex flex-grow gap-4 items-center justify-center sm:mr-5  ">
          {links}
        </div>
        {/* */}
        <div className="flex  min-w-[100px] gap-4 items-center">
          {!isLogged && !isLoading && (
            <>
              <Link href="/signup">
                <Button
                  text="sign up"
                  className="capitalize  hover:border-blue-500 border-transparent border  px-3"
                />
              </Link>
              <Link href="/login">
                <Button text="login" className="capitalize bg-blue-500 px-3 " />
              </Link>
            </>
          )}
          {/* user menu  /login */}
          <HeaderAuthDisplay/>
          {/* menu toggler */}
          <div
            className="sm:hidden"
            onClick={() => {
              setShowMobileMenu((prev) => !prev);
            }}
          >
            <Bars3Icon className="w-10 cursor-pointer h-10 text-white" />
          </div>
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
        <ul className="flex px-2  w-full pt-4  flex-col gap-4">{links}</ul>
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

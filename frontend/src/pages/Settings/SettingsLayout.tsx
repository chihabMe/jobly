import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { InboxIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
interface Props {
  children: ReactNode;
}
const SettingsLayout = ({ children }: Props) => {
  const current = useRouter().pathname;
  console.log(current == "/settings");
  return (
    <main className="w-full pt-10 max-w-screen-2xl mx-auto container">
      <div className="flex mt-10">
        {/* menu */}
        <ul className="flex flex-col gap-3 w-1/4">
          <li>
            <Link
              className={`
                `}
              href="/settings"
            >
              <div
                className={` ${
                  current == "/settings" && "bg-primary !text-white"
                } px-8 py-5 group  text-title  dark:text-title-dark font-bold cursor-pointer transition-all duration-150 capitalize hover:bg-primary  rounded-md hover:text-white  gap-2 flex items-center`}
              >
                <UserIcon className="w-6 h-6 cursor-pointer " />
                <span>accounts settings</span>
              </div>
            </Link>
          </li>
          <li>
            <Link className={``} href="/settings/email">
              <div
                className={` ${
                  current == "/settings/email" && "bg-primary !text-white"
                } px-8 py-5  text-title  dark:text-title-dark font-bold cursor-pointer transition-all duration-150 capitalize hover:bg-primary  rounded-md hover:text-white  gap-2 flex items-center`}
              >
                <EnvelopeIcon className="w-6 h-6" />
                <span> email settings</span>
              </div>
            </Link>
          </li>
          <li>
            <Link className="" href="/settings/privacy">
              <div
                className={` ${
                  current == "/settings/privacy" && "bg-primary !text-white"
                } px-8 py-5  text-title  dark:text-title-dark font-bold cursor-pointer transition-all duration-150 capitalize hover:bg-primary  rounded-md hover:text-white  gap-2 flex items-center`}
              >
                <UserIcon className="w-6 h-6  " />
                <span>privacy settings </span>
              </div>
            </Link>
          </li>
        </ul>
        <div>{children}</div>
      </div>
    </main>
  );
};

export default SettingsLayout;

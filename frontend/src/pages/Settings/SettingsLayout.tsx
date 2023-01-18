import { InboxIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
interface Props {
  children: ReactNode;
}
const SettingsLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      {/* menu */}
      <ul className="flex flex-col gap-2">
        <li>
          <Link className="" href="/settings">
            <div className="py-2 gap-2 flex items-center">
              <UserIcon className="w-4 h-4 cursor-pointer text-bg-dark dark:text-bg" />
              <span>accounts settings</span>
            </div>
          </Link>
        </li>
        <li>
          <Link className="" href="/settings/email">
            <div className="py-2 gap-2 flex cursor-pointer  items-center">
              <InboxIcon className="w-4 h-4 text-bg-dark dark:text-bg" />
              <span> email settings</span>
            </div>
          </Link>
        </li>
        <li>
          <Link className="" href="/settings/privacy">
            <div className="py-2 gap-2 flex cursor-pointer items-center">
              <UserIcon className="w-4 h-4  text-bg-dark dark:text-bg" />
              <span>privacy settings </span>
            </div>
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </div>
  );
};

export default SettingsLayout;

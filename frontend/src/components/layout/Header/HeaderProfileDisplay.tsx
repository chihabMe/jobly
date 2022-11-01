import Link from "next/link";
import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import User from "src/models/User";
import Image from "next/image";

const HeaderProfileDisplay = ({ user }: { user: User }) => (
  <Link href={"/profile"}>
    <div className="flex flex-col items-center gap-1">
      <div className="w-8 h-8 relative cursor-pointer ">
        <Image className="rounded-lg" src={user?.image} layout="fill" />
      </div>
      <span className="text-sm">{user?.name}</span>
    </div>
  </Link>
);

export default HeaderProfileDisplay;

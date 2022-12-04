import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  DocumentIcon
} from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";
import EmployeeUser from "src/models/EmployeeUser";
import User from "src/models/User";
import ProfileTitle from "../ProfileTitle";

const ProfileUserInfos = ({profile}:{profile:EmployeeUser}) => {

  return (
    <>
      <ProfileTitle>profile</ProfileTitle>

      <div className="flex  py-5 px-4 rounded-md flex-col bg-bg dark:bg-bg-dark   ">
        <ul className=" grid   md:grid-cols-2 text-title dark:text-title-dark  gap-4 text-sm">
          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <UserIcon className="text-primary" />
            </span>
            <span>{profile?.name}</span>
          </li>

          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <EnvelopeIcon className="text-primary" />
            </span>
            <span>{profile?.email || "admin@email.com"}</span>
          </li>

          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <PhoneIcon className="text-primary" />
            </span>
            <span>{profile?.phone || 1231232}</span>
          </li>

          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <MapPinIcon className="text-primary" />
            </span>
            <span>{profile?.location || "algeria"}</span>
          </li>
{profile?.cv &&
          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <DocumentIcon className="text-primary" />
            </span>
            <span className="hover:text-primary"> <a href={`${profile?.cv}`} className=' text-bold uppercase underline '>cv</a></span>
          </li>
}
        </ul>
      </div>
    </>
  );
};

export default ProfileUserInfos;

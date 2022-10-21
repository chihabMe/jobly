import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { useSelector } from "react-redux";
import User from "src/models/User";
import ProfileTitle from "./ProfileTitle";

const ProfileUserInfos = ({user}:{user:User}) => {

  return (
    <>
      <ProfileTitle>profile</ProfileTitle>

      <div className="flex p-4 rounded-md flex-col  bg-gray-200 ">
        <ul className=" grid md:grid-cols-2 gap-4 text-sm">
          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <UserIcon />
            </span>
            <span>{user?.name}</span>
          </li>

          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <EnvelopeIcon />
            </span>
            <span>{user?.email || "admin@email.com"}</span>
          </li>

          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <PhoneIcon />
            </span>
            <span>{user?.phone || 1231232}</span>
          </li>

          <li className="flex gap-2 items-center">
            <span className="w-4 h-4">
              <MapPinIcon />
            </span>
            <span>{user?.location || "algeria"}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProfileUserInfos;

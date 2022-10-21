import React from "react";
import User from "src/models/User";
import Image from "next/image";

const ProfileImage = ({user}:{user:User}) => {
  return (
    <div className=" mx-auto w-20 h-20 md:w-32 md:h-32 rounded-full relative">
      <Image className="rounded-md" src={user?.image} layout="fill" />
    </div>
  );
};

export default ProfileImage;

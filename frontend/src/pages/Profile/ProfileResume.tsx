import React from "react";
import Button from "src/components/ui/Button";
import User from "src/models/User";
import ProfileTitle from "./ProfileTitle";

const ProfileResume = ({ user }: { user: User }) => {
  return (
    <>
      <ProfileTitle>resume</ProfileTitle>
      <Button
        className=" w-full border   border-white capitalize py-4 md:py-5  justify-center font-bold text-primary hover:bg-gray-100 transition-all duration-200 hover:border-primary"
        text={user?.cv ? "update your resume" : "upload your cv"}
      />
    </>
  );
};

export default ProfileResume;

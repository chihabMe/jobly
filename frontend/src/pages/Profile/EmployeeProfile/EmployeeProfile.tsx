import React from "react";
import Image from "next/image";
import ProfileUserInfos from "./ProfileUserInfos";
import Button from "src/components/ui/Button";
import ProfileTitle from "../ProfileTitle";
import ProfileResume from "./ProfileResume";
import ProfileImage from "./ProfileImage";
import JobSeeking from "./JobSeeking";
import PageIsLoading from "src/components/ui/PageIsLoading";
import useAppSelector from "src/hooks/useAppSelector";
import { useGetProfileQuery } from "src/store/features/employeeProfileApi";
import EmployeeUser from "src/models/EmployeeUser";

const EmployeeProfile = ({ profile }: { profile: EmployeeUser }) => {
  // const {user,isLoading} = useAppSelector(state=>state.auth)
  // const {isError,isLoading,data:profile} = useGetProfileQuery()
  // if(isLoading || !profile)return <PageIsLoading/>
  return (
    <div className="w-full px-2  py-10">
      <div className="max-w-xl  mx-auto flex flex-col gap-4  px-2">
        <ProfileImage user={profile} />
        <ProfileUserInfos profile={profile} />
        <ProfileResume profile={profile} />
        <JobSeeking profile={profile} />
      </div>
    </div>
  );
};

export default EmployeeProfile;

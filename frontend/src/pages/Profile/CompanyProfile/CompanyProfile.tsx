import React from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { useGetProfileQuery } from "src/store/features/companyProfileApit";
import ProfileImage from "../EmployeeProfile/ProfileImage";
import CompanyInfos from "./CompanyInfos";
import CompanyProfileActions from "./CompanyProfileActions";
import CompanyTopInfos from "./CompanyTopInfos";

const CompanyProfile = () => {
  const { isLoading, isError, data: profile } = useGetProfileQuery();
  if (isLoading) return <PageIsLoading />;
  if (isError || !profile) return <h1>error</h1>;
  return (
    <div className="w-full px-2   py-10">
      <div className="max-w-3xl  mx-auto flex flex-col gap-4  px-2">
        <CompanyTopInfos profile={profile} />
        <CompanyInfos profile={profile} />
        <CompanyProfileActions />
      </div>
    </div>
  );
};

export default CompanyProfile;

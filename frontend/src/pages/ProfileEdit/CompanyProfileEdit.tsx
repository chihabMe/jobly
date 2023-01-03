import React, { FormEvent, useState } from "react";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";
import PageIsLoading from "src/components/ui/PageIsLoading";
import TextInput from "src/components/ui/TextInput";
import { useGetProfileQuery } from "src/store/features/companyProfileApit";
import CompanyProfileEditInfos from "../Profile/CompanyProfile/CompanyProfileEditInfos";
import CompanyCoverUpdate from "../Profile/CompanyProfile/CompnayCoverUpdate";
import CompanyCover from "../Profile/CompanyProfile/CompnayCoverUpdate";
import ProfileImage from "../Profile/EmployeeProfile/ProfileImage";

const CompanyProfileEdit = () => {
  const { isLoading, isError, data: profile } = useGetProfileQuery();
  if (isLoading) return <PageIsLoading />;
  if (isError || !profile) return <h1>error</h1>;

  return (
    <div className="flex w-full max-w-2xl  mx-auto flex-col gap-4 pt-6">
      <div className="flex  gap-2">
        <ProfileImage user={profile} />
        <CompanyCoverUpdate user={profile} />
      </div>
      <CompanyProfileEditInfos profile={profile} />
    </div>
  );
};

export default CompanyProfileEdit;

import React, { FormEvent, useState } from "react";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";
import PageIsLoading from "src/components/ui/PageIsLoading";
import TextInput from "src/components/ui/TextInput";
import { useGetProfileQuery } from "src/store/features/companyProfileApit";
import CompanyProfileEditInfos from "../Profile/CompanyProfile/CompanyProfileEditInfos";
import ProfileImage from "../Profile/EmployeeProfile/ProfileImage";

const CompanyProfileEdit = () => {
  const { isLoading, isError, data: profile } = useGetProfileQuery();
  if (isLoading) return <PageIsLoading />;
  if (isError || !profile) return <h1>error</h1>;

  return (
    <div className="flex  flex-col gap-4">
      <ProfileImage user={profile} />
      <CompanyProfileEditInfos profile={profile} />
    </div>
  );
};

export default CompanyProfileEdit;

import React from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
import CompanyUser from "src/models/CompanyUser";
import { useGetProfileQuery } from "src/store/features/companyProfileApit";
import ProfileImage from "../EmployeeProfile/ProfileImage";
import CompanyInfos from "./CompanyInfos";
import CompanyProfileActions from "./CompanyProfileActions";
import CompanyTopInfos from "./CompanyTopInfos";
import NestedSections from "./NestedSections";

const CompanyProfile = ({ profile }: { profile?: CompanyUser }) => {
  if (profile) {
    return (
      <div className="w-full px-2    py-10">
        <div className="max-screen-md mx-auto flex flex-col gap-4  px-2">
          <CompanyTopInfos profile={profile} />
          <NestedSections profile={profile} />
        </div>
      </div>
    );
  }
  const { isLoading, isError, data: company } = useGetProfileQuery();
  if (isLoading) return <PageIsLoading />;
  if (isError || !company) return <h1>error</h1>;

  return (
    <div className="w-full px-2    py-10">
      <div className="max-screen-md mx-auto flex flex-col gap-4  px-2">
        <CompanyTopInfos profile={company} />
        <NestedSections profile={company} />
      </div>
    </div>
  );
};

export default CompanyProfile;

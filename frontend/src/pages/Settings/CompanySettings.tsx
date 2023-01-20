import React from "react";
import { useGetProfileQuery } from "src/store/features/companyProfileApit";
import SettingsItemField from "./SettingsItemField";

const CompanySettings = () => {
  const { data: profile } = useGetProfileQuery();
  return (
    <>
      <SettingsItemField
        fieldName="phone number"
        currentValue={profile?.phone ?? "none"}
        buttonText="change phone number"
        href="/settings/change/phone"
      />
      <SettingsItemField
        fieldName="number of employees"
        currentValue={profile?.numberOfEmployees ?? "0"}
        buttonText="change phone number"
        href="/settings/change/number-of-employees"
      />
      <SettingsItemField
        fieldName="location"
        currentValue={profile?.location ?? "none"}
        buttonText="change  location"
        href="/settings/change/location"
      />
      <SettingsItemField
        fieldName="website"
        currentValue={profile?.website ?? "none"}
        buttonText="change  website"
        href="/settings/change/website"
      />
    </>
  );
};

export default CompanySettings;

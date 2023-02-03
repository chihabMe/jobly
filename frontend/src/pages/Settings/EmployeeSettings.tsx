import React from "react";
import { useGetEmployeeProfileQuery } from "src/store/features/employeeProfileApi";
import SettingsItemField from "./SettingsItemField";

const EmployeeSettings = () => {
  const { data: profile, isLoading } = useGetEmployeeProfileQuery();
  console.log(isLoading);
  console.log("profle=>", profile);
  return (
    <>
      <SettingsItemField
        fieldName="phone number"
        currentValue={profile?.phone ?? ""}
        buttonText="change phone number"
        href="/settings/change/phone"
      />
      <SettingsItemField
        fieldName="location"
        currentValue={profile?.location ?? ""}
        buttonText="change  location"
        href="settings/change/location"
      />
    </>
  );
};

export default EmployeeSettings;

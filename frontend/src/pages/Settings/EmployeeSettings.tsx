import React from "react";
import { useGetProfileQuery } from "src/store/features/employeeProfileApi";
import SettingsItemField from "./SettingsItemField";

const EmployeeSettings = () => {
  const { data: profile } = useGetProfileQuery();
  return (
    <>
      <SettingsItemField
        fieldName="phone number"
        currentValue={profile?.phone ?? ""}
        buttonText="change phone number"
        href=""
      />
      <SettingsItemField
        fieldName="location"
        currentValue={profile?.location ?? ""}
        buttonText="change  location"
        href=""
      />
    </>
  );
};

export default EmployeeSettings;

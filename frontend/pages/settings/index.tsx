import { Typography, useSelect } from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";
import Button from "src/components/ui/Button";
import useAppSelector from "src/hooks/useAppSelector";
import CompanySettings from "src/pages/Settings/CompanySettings";
import EmployeeSettings from "src/pages/Settings/EmployeeSettings";
import SettingsItemField from "src/pages/Settings/SettingsItemField";
import SettingsLayout from "src/pages/Settings/SettingsLayout";

const AccountSettings = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <Typography className="text-title dark:text-title-dark font-bold text-2xl py-8 border-b border-gray-300">
        Account settings
      </Typography>
      <SettingsItemField
        fieldName="account type"
        currentValue={user?.type ?? ""}
        buttonText="change account type"
        href=""
      />
      <SettingsItemField
        fieldName="email"
        currentValue={user?.email ?? ""}
        buttonText="change email"
        href=""
      />
      <SettingsItemField
        fieldName="password"
        currentValue={"********"}
        buttonText="change password"
        href=""
      />
      {user && user.type == "COMPANY" && <CompanySettings />}
      {user && user.type == "EMPLOYEE" && <EmployeeSettings />}
    </div>
  );
};

AccountSettings.PageLayout = SettingsLayout;

export default AccountSettings;

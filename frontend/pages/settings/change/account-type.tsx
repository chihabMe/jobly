import { CardBody, CardHeader } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import PageIsLoading from "src/components/ui/PageIsLoading";
import UseFetch from "src/hooks/use-fetch";
import useAppSelector from "src/hooks/useAppSelector";
import AccountTypeChoices from "src/pages/Signup/AccountTypeChoices";
import { Card } from "@material-tailwind/react";
import SettingsChangeTitle from "src/pages/Settings/SettingsChangeTitle";
import SettingsChangeCardWrapper from "src/pages/Settings/SettingsChangeCardWrapper";
import SettingsChangeLayout from "src/pages/Settings/SettingsChangeLayout";

const AccountType = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [accountType, setAccountType] = useState("");
  const { data, status, request, error, isLoading } = UseFetch();
  const router = useRouter();
  const submitProfileTypeChange = () => {
    request(
      "POST",
      "/api/profile/change/type",
      JSON.stringify({ type: accountType })
    );
  };
  useEffect(() => {
    if (user && user.type) setAccountType(user.type.toLowerCase());
  }, []);
  useEffect(() => {
    if (!isLoading && status == 200) router.push("/settings");
  }, [isLoading]);
  return (
    <SettingsChangeCardWrapper>
      <CardHeader>
        <SettingsChangeTitle title="account type" />
      </CardHeader>

      <CardBody>
        <AccountTypeChoices choice={accountType} setChoice={setAccountType} />
        <div className="flex items-center justify-end gap-4 py-2 mt-2  ">
          <Button
            onClick={() => {
              router.push("/settings");
            }}
            className="!bg-red-300 text-white"
          >
            cancel
          </Button>
          <Button
            onClick={submitProfileTypeChange}
            className="w-24 text-center"
          >
            {isLoading ? <PageIsLoading size={10} /> : "change"}
          </Button>
        </div>
        {error && (
          <div className="py-2 text-red-400 font-medium">
            there was an error please try again
          </div>
        )}
      </CardBody>
    </SettingsChangeCardWrapper>
  );
};
AccountType.PageLayout = SettingsChangeLayout;
export default AccountType;

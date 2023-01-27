import { Typography } from "@material-tailwind/react";
import { userTypeChangeEndpoint } from "config/constances";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import PageIsLoading from "src/components/ui/PageIsLoading";
import UseFetch from "src/hooks/use-fetch";
import useAppSelector from "src/hooks/useAppSelector";
import AccountTypeChoices from "src/pages/Signup/AccountTypeChoices";

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
    <div className="flex flex-col pt-10 items-center min-h-screen ">
      <div className="w-full   mt-10  max-w-md bg-white dark:bg-bg-dark p-4 rounded-lg">
        <div className="px-4 flex flex-col gap-6">
          <Typography className="text-xl py-4 border-b border-b-gray-300 font-bold text-title dark:text-title-dark capitalize">
            change your account type
          </Typography>
          <AccountTypeChoices choice={accountType} setChoice={setAccountType} />
          <div className="flex items-center justify-end gap-4 py-2  ">
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
        </div>
      </div>
    </div>
  );
};

export default AccountType;

import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import useAppSelector from "src/hooks/useAppSelector";
import AccountTypeChoices from "src/pages/Signup/AccountTypeChoices";

const accountType = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [accountType, setAccountType] = useState("");
  const router = useRouter();
  useEffect(() => {
    console.log("rerender");
    if (user && user.type) setAccountType(user.type.toLowerCase());
  }, []);
  return (
    <div className="flex flex-col pt-10 items-center min-h-screen ">
      <div className="w-full   mt-10  max-w-md bg-white dark:bg-bg-dark p-4 rounded-lg">
        <div className="px-4 flex flex-col gap-6">
          <Typography className="text-xl py-4 border-b border-b-gray-300 font-bold text-title dark:text-title-dark capitalize">
            change your account type
          </Typography>
          <AccountTypeChoices choice={accountType} setChoice={setAccountType} />
          <div className="flex gap-4 py-2  ">
            <Button>change</Button>
            <Button
              onClick={() => {
                router.push("/settings");
              }}
              className="!bg-red-300 text-white"
            >
              cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default accountType;

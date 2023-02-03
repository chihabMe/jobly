import { CardHeader, CardBody, Button } from "@material-tailwind/react";
import error from "next/error";
import router from "next/router";
import accountType from "pages/settings/change/account-type";
import React, { ReactNode } from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
import AccountTypeChoices from "../Signup/AccountTypeChoices";
import SettingsChangeCardWrapper from "./SettingsChangeCardWrapper";
import SettingsChangeTitle from "./SettingsChangeTitle";

const SettingsChangeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col pt-10 items-center min-h-screen ">
      <section className="w-full   mt-10  max-w-md bg-white dark:bg-bg-dark p-4 rounded-lg">
        {children}
      </section>
    </main>
  );
};

export default SettingsChangeLayout;

import Card from "@material-tailwind/react/components/Card";
import React, { ReactNode } from "react";

const SettingsChangeCardWrapper = ({ children }: { children: ReactNode }) => {
  return <Card className="px-4 flex flex-col gap-6">{children}</Card>;
};

export default SettingsChangeCardWrapper;

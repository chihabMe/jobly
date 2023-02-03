import Typography from "@material-tailwind/react/components/Typography";
import React from "react";

const SettingsChangeTitle = ({ title }: { title: string }) => {
  return (
    <Typography className="text-lg  py-2 border-b border-b-gray-300 font-bold text-title dark:text-title-dark uppercase">
      {title}
    </Typography>
  );
};

export default SettingsChangeTitle;

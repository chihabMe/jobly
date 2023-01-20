import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import Button from "src/components/ui/Button";

interface Props {
  fieldName: string;
  currentValue: string | number;
  buttonText: string;
  href: string;
}
const SettingsItemField = ({
  fieldName,
  buttonText,
  currentValue,
  href,
}: Props) => {
  return (
    <div className="flex py-4 justify-between items-center border-b-gray-300 border-b  ">
      <div>
        <Typography className="text-title dark:text-title font-semibold capitalize text-lg">
          {fieldName}
        </Typography>
        <Typography className="text-text dark:text-text font-medium capitalize ">
          {currentValue}
        </Typography>
      </div>
      <Button>
        <Link href={href}>change</Link>
      </Button>
    </div>
  );
};

export default SettingsItemField;

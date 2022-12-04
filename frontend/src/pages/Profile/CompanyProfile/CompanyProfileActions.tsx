import Link from "next/link";
import React from "react";
import Button from "src/components/ui/Button";

const CompanyProfileActions = () => {
  return (
    <div className="flex  gap-2 w-full">
      <Link  href="/profile/edit">
        <Button className="text-sm w-1/2">edit profile information </Button>
      </Link>
        <Button className="text-sm w-1/2"> posted jobs </Button>
    </div>
  );
};

export default CompanyProfileActions;

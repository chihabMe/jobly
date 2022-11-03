import Link from "next/link";
import React from "react";
import Button from "src/components/ui/Button";

const HeaderNonAuthUserDisplay = () => {
  return (
    <div className="flex  gap-4">
      <Link href="/login">
        <Button className="!bg-bg dark:!bg-bg-dark !text-title  hover:!text-title-dark  dark:!text-title-dark hover:!bg-primary">login</Button>
      </Link>

      <Link href="/signup">
        <Button className="">signup</Button>
      </Link>
    </div>
  );
};

export default HeaderNonAuthUserDisplay;

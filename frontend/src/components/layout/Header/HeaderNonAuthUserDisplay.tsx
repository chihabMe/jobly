import Link from "next/link";
import React from "react";
import Button from "src/components/ui/Button";

const HeaderNonAuthUserDisplay = () => {
  return (
    <div className="flex  gap-4">
      <Link href="/login">
        <Button className="!bg-bg    px-2.5 py-2  md:px-10 md:py-3.5 !!capitalize  dark:!bg-bg-dark !text-title  hover:!text-title-dark  dark:!text-title-dark hover:!bg-primary">
          login
        </Button>
      </Link>

      <Link href="/signup">
        <Button className=" px-2  py-2.5  md:px-10 md:py-3.5 !capitalize  ">
          sign up
        </Button>
      </Link>
    </div>
  );
};

export default HeaderNonAuthUserDisplay;

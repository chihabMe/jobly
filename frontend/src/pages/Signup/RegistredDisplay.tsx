import Link from "next/link";
import React from "react";
import Button from "src/components/ui/Button";

const RegistredDisplay = () => {
  return (
    <div className="w-full h-52 flex flex-col items-center gap-8">
      <h2 className="   text-green-800 font-medium text-center">
        please check your email for the verification email
      </h2>
      <Link href="/login">
        <Button className=" h-12 px-10">go to login</Button>
      </Link>
    </div>
  );
};

export default RegistredDisplay;

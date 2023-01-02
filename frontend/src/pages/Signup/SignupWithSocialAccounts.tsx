import React from "react";
import Image from "next/image";

const SignupWithSocialAccounts = () => {
  return (
    <>
      <div className="flex gap-4 justify-between items-center">
        <ul className=" h-px py-px  bg-gray-800 w-1/3" />
        <h2 className="text-title dark:text-title-dark font-medium">or</h2>
        <ul className=" h-px py-px  bg-gray-800 w-1/3" />
      </div>
      <div className="w-full my-4">
        <ul className="flex justify-around">
          <li className="w-8 h-8 relative    cursor-pointer">
            <Image
              layout="fill"
              src={"/images/icons/google.png"}
              alt="google icons"
            />
          </li>
          <li className="w-8 h-8 relative    cursor-pointer">
            <Image
              layout="fill"
              src={"/images/icons/github.png"}
              alt="github icons"
            />
          </li>
          <li className="w-8 h-8 relative    cursor-pointer">
            <Image
              layout="fill"
              src={"/images/icons/linkedin.png"}
              alt="linkedin icons"
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default SignupWithSocialAccounts;

import React from "react";
import Image from "next/image";
interface Props {
  setChoice: (value: string) => void;
  choice: string;
}
const AccountTypeChoices = ({ setChoice, choice }: Props) => {
  const setEmployeeChoice = () => {
    setChoice("employee");
  };
  const setCompanyChoice = () => {
    setChoice("company");
  };
  return (
    <div className="flex justify-around py-4">
      <div
        onClick={setEmployeeChoice}
        className="flex flex-col cursor-pointer items-center gap-2"
      >
        <div
          className={` transition-all duration-150  ""  ${
            choice == "employee" && "bg-primary"
          } px-4 md:px-8 py-2`}
        >
          <div className="relative w-10 h-10 ">
            <Image src="/images/icons/employee.png" layout="fill" />
          </div>
        </div>
        <span className="text-title dark:text-title-dark capitalize font-medium text-sm  ">
          Employee
        </span>
      </div>
      <div
        onClick={setCompanyChoice}
        className="flex flex-col cursor-pointer  items-center gap-2"
      >
        <div
          className={` transition-all duration-150   "" ${
            choice == "company" && "bg-primary"
          }   px-4 md:px-8 py-2`}
        >
          <div className="relative w-10 h-10 ">
            <Image src="/images/icons/company.png" layout="fill" />
          </div>
        </div>
        <span className="text-title dark:text-title-dark capitalize font-medium text-sm  ">
          company
        </span>
      </div>
    </div>
  );
};

export default AccountTypeChoices;

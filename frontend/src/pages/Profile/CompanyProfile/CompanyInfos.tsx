import React from "react";
import CompanyUser from "src/models/CompanyUser";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const CompanyInfos = ({ profile }: { profile: CompanyUser }) => {
  return (
    <div className="w-full flex flex-col gap-6 py-2 ">
      <div className="py-6 flex flex-col gap-4">
        <h2 className="font-medium text-title dark:text-title-dark text-2xl  capitalize">
          about us{" "}
        </h2>
        <p className="text-title dark:text-title-dark font-medium text-base ">
          {profile.description}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-title dark:text-title-dark text-lg capitalize">
          website
        </h2>
        <h2 className="text-md  text-primary  border-b ">
          <a
            className="flex gap-2  items-center hover:opacity-90"
            href={`${profile.website}`}
          >
            {profile.website || "None"}
            {profile.website && (
              <ArrowTopRightOnSquareIcon className="w-4 font-bold  h-4" />
            )}
          </a>
        </h2>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-title dark:text-title-dark text-lg capitalize">
          {" "}
          phone{" "}
        </h2>
        <h2 className="text-md  ">{profile.phone || "None"}</h2>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-title dark:text-title-dark text-lg capitalize">
          {" "}
          location{" "}
        </h2>
        <h2 className="text-md  ">{profile.location || "None"}</h2>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-title dark:text-title-dark text-lg capitalize">
          {" "}
          number of employees{" "}
        </h2>
        <h2 className="text-md  ">{profile.numberOfEmployees || 0}</h2>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-title dark:text-title-dark text-lg capitalize">
          {" "}
          open jobs{" "}
        </h2>
        <h2 className="text-md  ">{profile.numberOfOpenJobs || 0}</h2>
      </div>
    </div>
  );
};

export default CompanyInfos;

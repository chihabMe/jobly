import React, { useState } from "react";
import CompanyUser from "src/models/CompanyUser";
import CompanyInfos from "./CompanyInfos";
import CompanyJobs from "./CompanyJobs";
import CompanyQanA from "./CompanyQanA";
import CompanyReviews from "./CompanyReviews";
import CompanyWhyUs from "./CompanyWhyUs";

const NestedSections = ({ profile }: { profile: CompanyUser }) => {
  const [currentSection, setCurrentSections] = useState("infos");
  return (
    <div className="flex flex-col gap-4">
      <ul className="grid     grid-cols-5 gap-4 py-4">
        <li
          className={`  text-md font-medium capitalize py-2   ${
            currentSection == "infos"
              ? "text-primary  "
              : "text-title dark:text-title-dark"
          } cursor-pointer  hover:!text-primary   `}

          onClick=
          {() => {
            setCurrentSections("infos");
          }}
        >
          <span className="relative py-4">
            information
            {currentSection == "infos" && (
              <span className=" mt-2  absolute bottom-0 left-0 h-1 w-full bg-primary"></span>
            )}
          </span>
        </li>

        <li
          className={`  text-md font-medium capitalize py-2   ${
            currentSection == "jobs"
              ? "text-primary  "
              : "text-title dark:text-title-dark"
          } cursor-pointer  hover:!text-primary   `}
          onClick={() => {
            setCurrentSections("jobs");
          }}
        >
          <span className="relative py-4">
            jobs
            {currentSection == "jobs" && (
              <span className=" mt-2  absolute bottom-0 left-0 h-1 w-full bg-primary"></span>
            )}
          </span>
        </li>

        <li
          className={`  text-mg font-medium capitalize py-2   ${
            currentSection == "reviews"
              ? "text-primary  "
              : "text-title dark:text-title-dark"
          } cursor-pointer  hover:!text-primary   `}
          onClick={() => {
            setCurrentSections("reviews");
          }}
        >
          <span className="relative py-4">
            reviews
            {currentSection == "reviews" && (
              <span className=" mt-2  absolute bottom-0 left-0 h-1 w-full bg-primary"></span>
            )}
          </span>
        </li>

        <li
          className={`  text-md font-medium capitalize py-2   ${
            currentSection == "reviews"
              ? "text-primary  "
              : "text-title dark:text-title-dark"
          } cursor-pointer  hover:!text-primary   `}
          onClick={() => {
            setCurrentSections("WhyUs");
          }}
        >
          <span className="relative py-4">
            why us
            {currentSection == "WhyUs" && (
              <span className=" mt-2  absolute bottom-0 left-0 h-1 w-full bg-primary"></span>
            )}
          </span>
        </li>

        <li
          className={`  text-md font-medium capitalize py-2   ${
            currentSection == "Q&A"
              ? "text-primary  "
              : "text-title dark:text-title-dark"
          } cursor-pointer  hover:!text-primary   `}
          onClick={() => {
            setCurrentSections("Q&A");
          }}
        >
          <span className="relative py-4">
            Q&A
            {currentSection == "Q&A" && (
              <span className=" mt-2  absolute bottom-0 left-0 h-1 w-full bg-primary"></span>
            )}
          </span>
        </li>

      </ul>
      {currentSection=="infos"&&<CompanyInfos profile={profile} />}
      {currentSection=="jobs"&&<CompanyJobs/>}
      {currentSection=="reviews"&&<CompanyReviews/>}
      {currentSection=="Q&A"&&<CompanyQanA/>}
      {currentSection=="WhyUs"&&<CompanyWhyUs/>}
    </div>
  );
};

export default NestedSections;

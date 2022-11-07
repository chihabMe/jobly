import React from "react";
import Job from "src/models/Job";
import Button from "../ui/Button";
import {
  HeartIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapIcon,
} from "@heroicons/react/24/solid";
import JobDetailApplyButton from "./JobDetailApplyButton";

const JobDetail = ({ job }: { job: Job }) => {
  
  return (
    <div className="w-full   max-h-screen overflow-y-scroll sticky  top-0   rounded-md px-4 py-6 outline-2 hover:outline-primary cursor-pointer outline outline-text">
      {/* top */}
      <div className="flex flex-col bg-bg  sticky  top-0   dark:bg-bg-dark   py-6 gap-4">
        <div className="flex flex-col">
          <h1 className=" text-title dark:text-title-dark font-bold text-2xl capitalize">
            {job.title}
          </h1>
          <h3 className=" text-title dark:text-title-dark font-bold text-base capitalize">
            {job.company}
          </h3>
          <h4 className=" text-title dark:text-title-dark font-bold text-sm capitalize">
            {job.location}
          </h4>
        </div>
        <div className="flex items-center   gap-2">
          <div className="">
            <JobDetailApplyButton applied={job.applied} slug={job.slug}/>
          </div>
          <div>
            <Button
              className={` !bg-bg dark:!bg-bg-dark !text-title dark:!text-title-dark !shadow-none  `}
            >
            </Button>
          </div>
        </div>
      </div>
      {/* center */}
      <div className=" flex     py-10 flex-col gap-4 ">
        <h2 className="text-lg capitalize font-bold text-title dark:text-title-dark">
          introduction
        </h2>
        <p className="text-sm text-text font-medium">{job.introduction}</p>
        <h2 className="text-lg capitalize font-bold text-title dark:text-title-dark">
          description
        </h2>
        <p className="text-sm text-text font-medium ">{job.description}</p>
      </div>
      {/* bottom */}
      <div className="flex flex-wrap gap-2 py-6">
        <div className="text-sm flex items-center    bg-bg-dark rounded-md px-4 py-2 dark:bg-bg  gap-2  font-medium text-title-dark dark:text-title">
          <CurrencyDollarIcon className="w-4 h-4" />
          <span>{job.salary}$/mo</span>
        </div>
        <div className="text-sm flex items-center    bg-bg-dark rounded-md px-4 py-2 dark:bg-bg  gap-2  font-medium text-title-dark dark:text-title">
          <ClockIcon className="w-4 h-4" />
          <span>full time</span>
        </div>
        <div className="text-sm flex items-center    bg-bg-dark rounded-md px-4 py-2 dark:bg-bg  gap-2  font-medium text-title-dark dark:text-title">
          <MapIcon className="w-4 h-4" />
          <span>{job.location}</span>
        </div>

        <div className="text-sm flex items-center    bg-bg-dark rounded-md px-4 py-2 dark:bg-bg  gap-2  font-medium text-title-dark dark:text-title">
          <MapIcon className="w-4 h-4" />
          <span>{job.positions} position</span>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;

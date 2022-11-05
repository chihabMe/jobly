import React from "react";
import Job from "src/models/Job";
import Button from "../ui/Button";
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapIcon,
} from "@heroicons/react/24/solid";

const JobDetail = ({ job }: { job: Job }) => {
  return (
    <div className="w-full max-h-screen overflow-y-scroll sticky  top-0   rounded-md px-4 py-6 outline-1 outline outline-text">
      {/* top */}
      <div className="flex flex-col bg-bg z-20 sticky  top-0   dark:bg-bg-dark   py-6 gap-4">
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
            <Button
              className={` rounded-md !text-base  !font-medium   px-14 text-title-dark ${
                job.applied ? "!bg-red-400" : "!bg-primary"
              } `}
            >
              {job.applied ? "Cancel" : "Apply now"}
            </Button>
          </div>
          <div>
            <Button
              className={` !bg-bg dark:!bg-bg-dark !text-title dark:!text-title-dark !shadow-none  `}
            >
              {!job.bookMarked && <BookmarkIcon className="w-5 h-5" />}
              {job.bookMarked && <BookmarkSlashIcon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
      {/* center */}
      <div className=" flex  max-h-80  overflow-y-scroll py-10 flex-col gap-4 ">
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

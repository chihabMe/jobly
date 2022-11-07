import React from "react";

import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkSlashIcon,
  CurrencyDollarIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import Tag from "src/models/Tag";
import JobBookMark from "./JobBookMark";

const JobSearchResult = ({
  onClickHandler,
  title,
  introduction,
  salary,
  since,
  slug,
  bookMarked,
  location,
  company,
  tags,
  currentJob,
}: {
  onClickHandler:(slug:string)=>void,
  title: string;
  location: string;
  introduction: string;
  salary: number;
  since: string;
  bookMarked: boolean;
  slug: string;
  company: string;
  tags: Tag[];
  currentJob:boolean;
}) => {
  return (
    <div onClick={onClickHandler.bind(null,slug)} className={ ` flex w-full cursor-pointer  bg-bg dark:bg-bg-dark ${currentJob && "outline-primary outline"} hover:outline outline-2  outline-text py-6 px-3 rounded-md flex-col gap-4 `}>
      {/* top */}
      <div className="flex justify-between">
        <div className="flex flex-col  items-left ">
          <h1 className="text-title text-lg font-bold capitalize  dark:text-title-dark ">
            {title}
          </h1>
          <h2 className="   font-medium   dark:text-text-dark  capitalize">
            {company}
          </h2>
          <h3 className="    font-medium   dark:text-text-dark  capitalize">
            {location}
          </h3>
        </div>
          <JobBookMark bookMarked={bookMarked} slug={slug}  />
      </div>
      {/* center */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="flex rounded-md py-1 px-1 font-medium text-title-dark dark:text-title bg-bg-dark dark:bg-bg gap-1 items-center text-sm">
            <CurrencyDollarIcon className="w-5 h-5  cursor-pointer" />
            <span>{salary}$/mo</span>
          </div>
        </div>
        <p className=" px-2 text-sm text-text dark:text-text-dark ">
          {introduction}
        </p>
      </div>
      {/* bottom */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex text-title dark:text-title-dark items-center text-sm gap-2">
            <ClockIcon className="w-5 h-5" />
            <span>{since}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2">
            {tags?.map((item, index) => (
              <span
                key={item.name + index}
                className="bg-primary    text-title-dark text-xs px-1 py-1 rounded-sm cursor-pointer"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchResult;

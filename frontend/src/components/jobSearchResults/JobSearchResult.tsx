import React from "react";

import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import {BookmarkSlashIcon} from "@heroicons/react/24/solid";
import Tag from "src/models/Tag";

const JobSearchResult = ({
  title,
  description,
  slug,
  bookMarked,
  location,
  upVotes,
  downVotes,
  companyName,
  tags,
}: {
  title: string;
  location: string;
  description: string;
  bookMarked:boolean;
  slug: string;
  upVotes: number;
  downVotes: number;
  companyName: string;
  tags: Tag[];
}) => {
  return (
    <div className="flex w-full cursor-pointer  bg-bg dark:bg-bg-dark hover:outline outline-1  outline-primary py-6 px-3 rounded-md flex-col gap-4">
      {/* top */}
      <div className="flex justify-between">
        <div className="flex flex-col  items-left ">
          <h1 className="text-title text-lg font-bold capitalize  dark:text-title-dark "> {title}</h1>
          <h2 className="   font-medium   dark:text-text-dark  capitalize"> {companyName}</h2>
          <h3 className="    font-medium   dark:text-text-dark  capitalize"> {location}</h3>
        </div>
        <div className=" text-yellow-300 cursor-pointer">
            {!bookMarked && <BookmarkIcon className="w-5 h-5" />}
            {bookMarked && <BookmarkSlashIcon className="w-5 h-5 " />}
        </div>
      </div>
      {/* center */}
      <div className="flex flex-col gap-2">
        <p className=" text-sm text-text dark:text-text-dark ">{description}</p>
      </div>
      {/* bottom */}
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          {tags?.map((item, index) => (
            <span
              key={item.name + index}
              className="bg-primary   text-title dark:text-title-dark text-sm px-1 py-0.5 rounded-sm cursor-pointer"
            >
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex gap-2 text-xs items-center">
          <div className="flex gap-1  items-center text-text  ">
            <ChevronUpIcon className="w-4 h-4 hover:text-primary cursor-pointer text-title" />
            <span>{upVotes}</span>
          </div>
          <div className="flex gap-1 items-center text-text">
            <ChevronDownIcon className="w-4 h-4 hover:text-primary cursor-pointer text-title" />
            <span>{downVotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearchResult;

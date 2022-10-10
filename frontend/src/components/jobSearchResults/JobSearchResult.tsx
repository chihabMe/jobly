import React from "react";
import Button from "../ui/Button";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import Tag from "src/models/Tag";

const JobSearchResult = ({
  title,
  description,
  slug,
  upVotes,
  downVotes,
  companyName,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  upVotes: number;
  downVotes: number;
  companyName: string;
  tags: Tag[];
}) => {
  return (
    <div className="flex w-full  bg-bg  py-4 px-2 rounded-md flex-col gap-4">
      {/* top */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img src="" className="w-10 h-10 bg-white rounded-full" alt="" />
          <h1 className="text-title font-medium capitalize"> {companyName}</h1>
        </div>

        <Button
          text-
          text="apply now "
          className="rounded-md bg-primary text-white  "
        />
      </div>
      {/* center */}
      <div className="flex flex-col gap-2">
        <h1 className="  text-title  capitalize font-medium text-lg md:text-2xl ">
          {title}
        </h1>
        <p className=" text-sm text-text">{description}</p>
      </div>
      {/* bottom */}
      <div className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          {tags?.map((item,index) => (
            <span key={item.name+index} className="bg-primary  text-title px-1 py-0.5 rounded-md cursor-pointer">
              {item.name}
            </span>
          ))}
        </div>

        <div className="flex gap-2 text-sm items-center">
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

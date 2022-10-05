import React from "react";
import Button from "../ui/Button";

const JobSearchResult = () => {
  return (
    <div className="flex w-full  bg-bg  py-4 px-2 rounded-md flex-col gap-4">
      {/* top */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <img src="" className="w-10 h-10 bg-white rounded-full" alt="" />
          <h1 className="text-title font-medium capitalize">company name</h1>
        </div>
        <Button text="apply now " className="rounded-md bg-primary text-white  " />
      </div>
      {/* center */}
      <div className='flex flex-col gap-2'>
        <h1 className="  text-title  capitalize font-medium text-lg md:text-2xl ">job title</h1>
        <p className=" text-sm text-text">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo nostrum
          animi quae, dolor nesciunt eius iste. Voluptates tempora pariatur,
          ducimus quam non sunt consectetur nobis, dolorum itaque impedit a
          vero!
        </p>
      </div>
      {/* bottom */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-primary  text-title px-1 py-0.5 rounded-md cursor-pointer">tag1</span>
        <span className="bg-primary  text-title px-1 py-0.5 rounded-md cursor-pointer">tag1</span>
        <span className="bg-primary  text-title px-1 py-0.5 rounded-md cursor-pointer">tag1</span>
        <span className="bg-primary  text-title px-1 py-0.5 rounded-md cursor-pointer">tag1</span>
      </div>
    </div>
  );
};

export default JobSearchResult;

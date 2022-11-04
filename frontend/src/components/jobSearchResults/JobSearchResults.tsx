import React from "react";
import Job from "src/models/Job";
import JobSearchResult from "./JobSearchResult";

const JobSearchResults = ({ results }: { results: Job[] }) => {
  return (
    <section className="">
      <div className="w-full grid gap-2 grid-cols-2    ">
        <div className="w-full flex flex-col gap-2  ">

        {results?.map((item, index) => (
          <JobSearchResult
            key={item.description + item.companyName + item.title + index}
            {...item}
          />
        ))}
        </div>
        <div className="bg-bg dark:bg-bg-dark w-full ">
            <h1 className="text-white">job</h1>

        </div>
      </div>
    </section>
  );
};

export default JobSearchResults;

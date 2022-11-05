import React, { useEffect, useState } from "react";
import UseFetch from "src/hooks/use-fetch";
import Job from "src/models/Job";
import PageIsLoading from "../ui/PageIsLoading";
import JobDetail from "./JobDetail";
import JobSearchResult from "./JobSearchResult";

const JobSearchResults = ({ results }: { results: Job[] }) => {
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const { data, error, isLoading, request, status } = UseFetch();
  const fetchJobDetail = (slug: string) => {
    console.log("run");
    request("GET", `/api/jobs/${slug}/`);
  };
  useEffect(() => {
    setCurrentJob(null)
    if(results.length>1)fetchJobDetail(results[0].slug);
  }, []);
  useEffect(()=>{
  if(results.length==0)setCurrentJob(null)
  },[data])

  useEffect(() => {
    if (data && !isLoading) setCurrentJob(data);
  }, [data]);
  return (
    <section className="bg-bg relative  dark:bg-bg-dark ">
      <div className="w-full grid  gap-2 px-2  grid-cols-1 md:grid-cols-2    ">
        <div className="w-full flex flex-col gap-2  ">
          {results?.map((item, index) => (
            <JobSearchResult
              onClickHandler={fetchJobDetail}
              key={item.introduction + item.company + item.title + index}
              {...item}
            />
          ))}
        </div>
        <div className="bg-bg hidden md:flex dark:bg-bg-dark w-full ">
          {!isLoading && currentJob && <JobDetail job={currentJob} />}
          {isLoading && <PageIsLoading />}
        </div>
      </div>
    </section>
  );
};

export default JobSearchResults;

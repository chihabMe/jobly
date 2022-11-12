import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import UseFetch from "src/hooks/use-fetch";
import Job from "src/models/Job";
import PageIsLoading from "../ui/PageIsLoading";
import JobDetail from "./JobDetail";
import JobSearchResult from "./JobSearchResult";

const JobSearchResults = ({ results }: { results: {next:boolean,count:number,results:Job[]} }) => {
  const router = useRouter()
  const {results:jobs,next}= results
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const { data, error, isLoading, request, status } = UseFetch();
  const fetchJobDetail = (slug: string) => {
    if(window !=null && window != undefined && window  ){
      if(currentJob&&window.innerWidth<=720)router.push(`/jobs/detail/${currentJob?.slug}`)
    }
    if(slug!=currentJob?.slug) request("GET", `/api/jobs/${slug}/detail`);
  };

  useEffect(() => {
    setCurrentJob(null)
    if(jobs.length>0)fetchJobDetail(jobs[0].slug);
  }, [jobs]);
  // useEffect(()=>{
  // if(jobs.length==0)setCurrentJob(null)
  // },[jobs])

  useEffect(() => {
    if (data && !isLoading) setCurrentJob(data);
  }, [data,isLoading]);
  return (
    <section className="bg-bg relative  dark:bg-bg-dark ">
      <div className="w-full grid  gap-2 px-2  grid-cols-1 md:grid-cols-2    ">
        <div className="w-full flex flex-col gap-2  ">
          {jobs?.map((item, index) => (
            <JobSearchResult
              onClickHandler={fetchJobDetail}
              currentJob={item.slug==currentJob?.slug}
              key={item.introduction + item.company +item.slug+ item.title + index}

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

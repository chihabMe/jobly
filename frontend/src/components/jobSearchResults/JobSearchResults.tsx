import { useRouter } from "next/router";
import React, {  useState } from "react";
import UseFetch from "src/hooks/use-fetch";
import Job from "src/models/Job";
import JobDetail from "./JobDetail";
import JobSearchResult from "./JobSearchResult";

const JobSearchResults = ({ results }: { results: {next:boolean,count:number,results:Job[]} }) => {
  const router = useRouter()
  const {results:jobs,next}= results
  const [currentJobSlug, setCurrentJobSlug] = useState<string | null>(null);
  const { data, error, isLoading, request, status } = UseFetch();
  const fetchJobDetail = (slug: string) => {
    if(window !=null && window != undefined && window  ){
      if(currentJobSlug&&window.innerWidth<=720)router.push(`/jobs/detail/${currentJobSlug}`)
    }
    setCurrentJobSlug(slug)
  };

  // useEffect(()=>{
  // if(jobs.length==0)setCurrentJob(null)
  // },[jobs])

  return (
    <section className="bg-bg relative  dark:bg-bg-dark ">
      <div className="w-full grid  gap-2 px-2  grid-cols-1 md:grid-cols-2    ">
        <div className="w-full flex flex-col gap-2  ">
          {jobs?.map((item, index) => (
            <JobSearchResult
              onClickHandler={fetchJobDetail}
              currentJob={false}
              key={item.introduction + item.company +item.slug+ item.title + index}

              {...item}
            />
          ))}
        </div>
        <div className="bg-bg hidden md:flex dark:bg-bg-dark w-full ">
          {!isLoading && currentJobSlug && <JobDetail  slug={currentJobSlug} />}
        </div>
      </div>
    </section>
  );
};

export default JobSearchResults;

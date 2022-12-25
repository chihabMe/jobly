import React from "react";
import JobSearchResults from "src/components/jobSearchResults/JobSearchResults";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { useGetCompanyJobsQuery } from "src/store/features/companyProfileApit";

const CompanyJobs = ({ company }: { company: string }) => {
  const { isLoading, data, isError } = useGetCompanyJobsQuery(company);
  console.log(data)
  if (isLoading) return <div className="min-h-screen w-full "> <PageIsLoading /></div>;
  if (isError|| !data) return <h1>error</h1>;
  return (
      <JobSearchResults results={data}  />
  );
};

export default CompanyJobs;

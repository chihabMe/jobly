import { jobSearchEndpoint } from "config";
import { NextPageContext } from "next";
import React from "react";
import Header from "src/components/layout/Header/Header";
import generateAuthConfig from "src/libs/generateAuthConfig";
import Field from "src/models/Field";
import Job from "src/models/Job";
import Search from "src/pages/Search/Search";
import camelize from "camelize-ts";

const SearchPage = ({
  results,
  location,
  industry,
  query,
}: {
  results: Job[];
  location: Field;
  industry: Field;
  query: string;
}) => {
  return (
    <>
      <Search
        location={location}
        industry={industry}
        query={query}
        results={results}
      />
    </>
  );
};
export const getServerSideProps = async (context: NextPageContext) => {
  const { query, industry, location } = context.query;

  const config = generateAuthConfig(
    "GET",
    context.req.headers.cookie || ""
  );

  const response = await fetch(jobSearchEndpoint, config);
  const results: Job[] = await response.json();
  console.log(results)
  if (response.status != 200) return {notFound:true};

  return {
    props: {
      results: camelize(results),
      industry: industry || null,
      location: location || null,
      query: query || null,
    },
  };
};

export default SearchPage;

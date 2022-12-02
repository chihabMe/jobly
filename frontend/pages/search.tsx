import { jobSearchEndpoint } from "config";
import { NextPageContext } from "next";
import React from "react";
import Header from "src/components/layout/Header/Header";
import generateAuthConfig from "src/libs/generateAuthConfig";
import Field from "src/models/Field";
import Job from "src/models/Job";
import camelize from "camelize-ts";
import Button from "src/components/ui/Button";
import Head from "next/head";
import Search from "src/pages/Search/Search";

const SearchPage = ({
  results,
  location,
  query,
}: {
  results: {count:number,next:boolean,results:Job[]};
  location: string;
  query: string;
}) => (
  <>
    <Head>
      <title> {query} jobs in {location } </title>
    </Head>
    <Search
      location={location}
      query={query}
      results={results} />
  </>
);
export const getServerSideProps = async (context: NextPageContext) => {
  const { query, industry, location } = context.query;

  const config  = generateAuthConfig("GET",context.req?.headers.cookie||"")

  const finalEndpoint = `${jobSearchEndpoint}?location=${location}&query=${query}`
  const response = await fetch(finalEndpoint, config);
  const results: {count:number,next:boolean,results:Job[]} = await response.json();
  console.log(config)
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

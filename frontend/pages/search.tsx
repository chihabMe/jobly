import { NextPageContext } from "next";
import React from "react";
import Header from "src/components/layout/Header/Header";
import Field from "src/models/Field";
import Job from "src/models/Job";
import Search from "src/pages/Search/Search";

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
    <h1 className="text-blue-300 text-2xl">{query}</h1>
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
  console.log(context.query)
  const results: Job[] = [
    {
      companyName: "facebook",
      description: "software enineer job (web developer)",
      downVotes: 3,
      upVotes: 21,
      slug: "facebook-web-developer-job",
      title: "web developer",
      tags: [{ name: "django" }, { name: "python" }],
    },
    {
      companyName: "facebook",
      description: "software enineer job (web developer)",
      downVotes: 3,
      upVotes: 21,
      slug: "facebook-web-developer-job",
      title: "web developer",
      tags: [{ name: "django" }, { name: "python" }],
    },
    {
      companyName: "facebook",
      description: "software enineer job (web developer)",
      downVotes: 3,
      upVotes: 21,
      slug: "facebook-web-developer-job",
      title: "web developer",
      tags: [{ name: "django" }, { name: "python" }],
    },
    {
      companyName: "facebook",
      description: "software enineer job (web developer)",
      downVotes: 3,
      upVotes: 21,
      slug: "facebook-web-developer-job",
      title: "web developer",
      tags: [{ name: "django" }, { name: "python" }],
    },
  ];
  return {
    props: {
      results:results.filter(item=>item.description.includes(query)),
      industry:industry||null,
      location:location||null,
      query:query||null,

    },
  };
};

export default SearchPage;

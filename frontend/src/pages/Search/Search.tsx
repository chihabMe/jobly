import React from "react";
import JobSearchResults from "src/components/jobSearchResults/JobSearchResults";
import JobSearch from "src/components/layout/JobSearch/JobSearch";
import Field from "src/models/Field";
import Job from "src/models/Job";

const Search = ({
    results,
    location,
    query,
}: {
    results: {count:number,next:boolean,results:Job[]};
    location: string;
    query: string;
}) => {
    return (
        <main className="py-20 flex flex-col gap-10">
            <JobSearch  location={location} query={query} />
            <JobSearchResults results={results} />
        </main>
    );
};

export default Search;

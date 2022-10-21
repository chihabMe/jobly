import React from "react";
import JobSearchResults from "src/components/jobSearchResults/JobSearchResults";
import JobSearch from "src/components/layout/JobSearch/JobSearch";
import Field from "src/models/Field";
import Job from "src/models/Job";

const Search = ({
    results,
    industry,
    location,
    query,
}: {
    results: Job[];
    industry: Field;
    location: Field;
    query: string;
}) => {
    return (
        <main className="py-20 flex flex-col gap-10">
            <JobSearch industry={industry} location={location} query={query} />
            <JobSearchResults results={results} />
        </main>
    );
};

export default Search;

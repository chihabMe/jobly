import React from 'react'
import JobSearchResults from 'src/components/jobSearchResults/JobSearchResults'
import JobSearch from 'src/components/layout/JobSearch/JobSearch'

const Search = () => {
  return (
    <main className='py-20 flex flex-col gap-10'>
        <JobSearch  />
        <JobSearchResults/>
    </main>
  )
}

export default Search
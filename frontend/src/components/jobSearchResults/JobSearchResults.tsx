import React from 'react'
import JobSearchResult from './JobSearchResult'

const JobSearchResults = () => {
  return (
    <section className='grid   grid-cols-1 sm:grid-cols-2 gap-4'>
    <JobSearchResult/>
    <JobSearchResult/>
    <JobSearchResult/>
    <JobSearchResult/>
    <JobSearchResult/>
    </section>
  )
}

export default JobSearchResults
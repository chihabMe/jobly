import React from 'react'
import Job from 'src/models/Job'
import JobSearchResult from './JobSearchResult'

const JobSearchResults = ({results}:{results:Job[]}) => {
  return (
    <section className='grid   grid-cols-1 sm:grid-cols-2 gap-4'>
      {results?.map((item,index)=>(
        <JobSearchResult key={item.description+item.companyName+item.title+index} {...item} />
      ))}
    </section>
  )
}

export default JobSearchResults
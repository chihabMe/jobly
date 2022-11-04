import React from 'react'
import Job from 'src/models/Job'

const JobDetail = ({job}:{job:Job}) => {
  return (
    <div>
        {job.title}
    </div>
  )
}

export default JobDetail
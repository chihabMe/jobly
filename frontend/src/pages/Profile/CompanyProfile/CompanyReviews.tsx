import React from 'react'
import ReviewItem from './ReviewItem'

const CompanyReviews = () => {
  return (
    <div className='flex flex-col gap-2'>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
    </div>
  )
}

export default CompanyReviews
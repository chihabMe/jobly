import React from 'react'
import ReviewItem from './ReviewItem'

const CompanyReviews = () => {
  return (
    <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 '>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
      <ReviewItem/>
    </div>
  )
}

export default CompanyReviews
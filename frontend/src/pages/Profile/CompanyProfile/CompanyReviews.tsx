import React from "react";
import ReviewItem from "./ReviewItem";

const CompanyReviews = () => {
  return (
    <section className="flex gap-2">
      <div className=" gap-4 grid grid-cols-1 w-full max-w-screen-md ">
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </div>
      <div className="">
        <h1 className="font-bold text-title dark:text-title-dark capitalize text-lg">filters</h1>
        <h3>number of positive reviews 123</h3>
      </div>
    </section>
  );
};

export default CompanyReviews;

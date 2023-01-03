import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Alert from "src/components/ui/Alert";
import Model from "src/components/ui/Model";
import ReviewItem from "../ReviewItem";
import CompanyReviewForm from "./CompanyReviewForm";

const CompanyReviews = () => {
  return (
    <section className="flex flex-col  gap-2 w-full  ">
      <div className=" gap-4  grid grid-cols-1 lg:grid-cols-2  w-full  ">
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
        <ReviewItem />
      </div>
    </section>
  );
};

export default CompanyReviews;

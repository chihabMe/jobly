import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Alert from "src/components/ui/Alert";
import Model from "src/components/ui/Model";
import PageIsLoading from "src/components/ui/PageIsLoading";
import CompanyReview from "src/models/CompanyReview";
import { useGetCompanyReviewsQuery } from "src/store/features/companyProfileApit";
import ReviewItem from "../ReviewItem";
import CompanyReviewForm from "./CompanyReviewForm";
import CompanyReviewsFilters from "./CompanyReviewsFilters";

const CompanyReviews = ({ companySlug }: { companySlug: string }) => {
  const {
    isLoading,
    isError,
    isSuccess,
    data: reviews,
  } = useGetCompanyReviewsQuery(companySlug);
  return (
    <section className="flex  mt-10  ">
      <div className="flex-col w-full lg:w-3/4  max-w-screen-lg   gap-4  items-center ">
        <div className=" mt-8 w-full flex flex-col gap-4    ">
          <CompanyReviewsFilters />
          {!isLoading && isSuccess && (
            <>
              {reviews?.map((item: CompanyReview) => (
                <ReviewItem key={item.id} review={item} />
              ))}
            </>
          )}
          {isLoading && (
            <div className="h-72 w-full ">
              <PageIsLoading />
            </div>
          )}
        </div>
      </div>
      <aside className="hidden lg:flex w-1/4  bg-gray-800"></aside>
    </section>
  );
};

export default CompanyReviews;

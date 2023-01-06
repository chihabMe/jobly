import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import Model from "src/components/ui/Model";
import {
  useGetCompanyReviewQuery,
  useUpdateCompanyReviewMutation,
} from "src/store/features/companyProfileApit";
import CompanyReviewForm from "./CompanyReviewForm";

const CompanyWriteAReview = ({ companySlug }: { companySlug: string }) => {
  const [showReviewModel, setShowReviewModel] = useState(false);
  const closeModel = () => {
    setShowReviewModel(false);
  };
  const showModel = () => {
    setShowReviewModel(true);
  };
  const modalHandler = () => setShowReviewModel((prev) => !prev);
  const {
    isLoading: isReviewLoading,
    isSuccess: isReviewSuccess,
    data: review,
  } = useGetCompanyReviewQuery(companySlug);
  const initialValues = {
    body: "",
    rate: 1,
  };
  if (isReviewSuccess && review) {
    initialValues.body = review.body;
    initialValues.rate = review.rate;
  }
  return (
    <>
      <Model header="review" open={showReviewModel} handler={modalHandler}>
        {!isReviewLoading && (
          <CompanyReviewForm
            initialValues={initialValues}
            companySlug={companySlug}
            closeModel={closeModel}
          />
        )}
      </Model>
      <Button
        onClick={showModel}
        className="!bg-bg shadow    !py-2 px-3 md:!py-3.5 md:px-6  shadow-gray-600  !text-title "
      >
        write a review
      </Button>
    </>
  );
};

export default CompanyWriteAReview;

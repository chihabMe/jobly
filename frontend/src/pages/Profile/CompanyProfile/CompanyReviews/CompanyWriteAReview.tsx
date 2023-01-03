import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Button from "src/components/ui/Button";
import Model from "src/components/ui/Model";
import CompanyReviewForm from "./CompanyReviewForm";

const CompanyWriteAReview = () => {
  const [showReviewModel, setShowReviewModel] = useState(false);
  const closeModel = () => {
    setShowReviewModel(false);
  };
  const showModel = () => {
    setShowReviewModel(true);
  };
  return (
    <>
      {showReviewModel && (
        <Model>
          <Typography className="text-title py-2 text-md dark:text-title-dark font-medium capitalize">
            what do you thing about this company ?
          </Typography>
          <CompanyReviewForm closeModel={closeModel} />
        </Model>
      )}
      <Button
        onClick={showModel}
        className="!bg-bg shadow rounded-sm  py-3.5 shadow-gray-600  !text-title "
      >
        write a review
      </Button>
    </>
  );
};

export default CompanyWriteAReview;

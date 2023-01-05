import { Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import Button from "src/components/ui/Button";
import Model from "src/components/ui/Model";
import { useUpdateCompanyReviewMutation } from "src/store/features/companyProfileApit";
import CompanyReviewForm from "./CompanyReviewForm";

const CompanyWriteAReview = ({ companySlug }: { companySlug: string }) => {
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
          <CompanyReviewForm
            companySlug={companySlug}
            closeModel={closeModel}
          />
        </Model>
      )}
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

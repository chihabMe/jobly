import { StarIcon, ShareIcon, FlagIcon } from "@heroicons/react/24/solid";
import React from "react";
import Button from "src/components/ui/Button";
import CompanyReview from "src/models/CompanyReview";
const ReviewItem = ({ review }: { review: CompanyReview }) => {
  const stars = [];
  for (let i = 1; i <= review.rate; i++) {
    stars.push(<StarIcon className="w-3 h-3 text-yellow-900" />);
  }
  return (
    <div className="shadow-md flex flex-col gap-2 w-full  rounded-md px-4 py-2">
      {/* top */}
      <div className="flex gap-2 flex-col ">
        <h2 className="text-title font-bold capitalize dark:text-title-dark text-lg ">
          {review.user}
        </h2>
        <div className="flex justify-between gap-4">
          <div className="flex  items-center">{stars}</div>
          <div className="text-text  font-medium capitalize dark:text-text-dark  ">
            {new Date(review.created).toDateString()}
          </div>
        </div>
      </div>
      {/* center */}
      <div>
        <p className="text-text text-sm  font-medium capitalize dark:text-text-dark  ">
          {review.body}
        </p>
        <div className="py-4 flex items-center flex-row gap-4">
          <h4 className="text-text    font-medium capitalize dark:text-text-dark  ">
            Was this review helpful?
          </h4>
          <div className="flex  gap-2 items-center">
            <Button className="px-5 py-1.5 !bg-transparent shadow-sm shadow-red-200  !text-red-400 flex gap-2">
              <span>{review.helpfulWithNo}</span>no
            </Button>
            <Button className="px-5 py-1.5 flex gap-2  ">
              <span>{review.helpfulWithYes}</span>yes
            </Button>
          </div>
        </div>
      </div>
      {/* actions */}
      <div className="flex justify-end gap-4">
        <Button className="  items-center  px-5 py-1.5 !bg-transparent shadow-sm   !text-title dark:!text-title-dark flex gap-2">
          <FlagIcon className="w-3 h-3" />
          <span>report</span>
        </Button>
        <Button className=" items-center px-5 py-1.5 !bg-transparent shadow-sm   !text-title dark:!text-title-dark flex gap-2">
          <ShareIcon className="w-3 h-3" />
          <span>share</span>
        </Button>
      </div>
    </div>
  );
};

export default ReviewItem;

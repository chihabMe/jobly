import {
  Form,
  Formik,
  FormikHelpers,
  setNestedObjectValues,
  validateYupSchema,
} from "formik";
import React, { useDebugValue, useEffect, useRef, useState } from "react";
import Button from "src/components/ui/Button";
import TextInput from "src/components/ui/TextInput";
import { Select, Option, Typography } from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import CompanyReviewStars from "./CompanyReviewStars";
import { useUpdateCompanyReviewMutation } from "src/store/features/companyProfileApit";
import { useGetCompanyReviewQuery } from "src/store/features/companyProfileApit";
import PageIsLoading from "src/components/ui/PageIsLoading";
import Alert from "src/components/ui/Alert";
interface InitialValues {
  body: string;
  rate: number;
}
interface Props {
  closeModel: () => void;
  companySlug: string;
}
const initialValues: InitialValues = {
  body: "",
  rate: 0,
};
const CompanyReviewForm = ({ closeModel, companySlug }: Props) => {
  const {
    isLoading: isReviewLoading,
    isSuccess: isReviewSuccess,

    data: review,
  } = useGetCompanyReviewQuery(companySlug);

  // useEffect(() => {
  //   if (!isReviewLoading && isReviewSuccess && review) {
  //     initialValues.body = review.body;
  //     initialValues.stars = review.rate;
  //   }
  // }, [isReviewLoading, isReviewSuccess, review]);
  const [updateReview, { isLoading, isSuccess, isError }] =
    useUpdateCompanyReviewMutation();
  const onSubmitHandler = async (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) => {
    try {
      await updateReview({
        companySlug: companySlug,
        body: JSON.stringify(values),
      }).unwrap();
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <div className="w-full  ">
      {isReviewLoading && (
        <div className="w-full h-52">
          <PageIsLoading />
        </div>
      )}
      {isSuccess && <Alert body="reviewed successfully" />}

      {!isReviewLoading && isReviewSuccess && review && (
        <Formik
          initialValues={{ body: review?.body, rate: review?.rate }}
          onSubmit={onSubmitHandler}
        >
          {(props) => (
            <Form className="  flex flex-col gap-4">
              <TextInput name="body" label="Review" placeholder="" />
              <div className="w-full max-w-[200px]">
                <Typography className="capitalize text-title dark:text-title-dark  font-medium py-2">
                  rate
                </Typography>
                <CompanyReviewStars
                  value={props.values.rate}
                  setValue={props.getFieldHelpers("rate").setValue}
                />
              </div>
              <div className="flex justify-end gap-4">
                <div
                  onClick={closeModel}
                  className="!bg-red-400 flex justify-center cursor-pointer items-center rounded-sm h-11 w-28 !capitalize "
                >
                  <span className="text-white text-xs font-bold">cancel</span>
                </div>

                <Button className="rounded-sm h-11 w-28 !capitalize ">
                  {!isLoading && "review"}
                  {isLoading && <PageIsLoading />}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CompanyReviewForm;

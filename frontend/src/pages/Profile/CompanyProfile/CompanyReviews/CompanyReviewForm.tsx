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
  initialValues: InitialValues;
}
const initialValues: InitialValues = {
  body: "",
  rate: 0,
};
const CompanyReviewForm = ({
  closeModel,
  companySlug,
  initialValues,
}: Props) => {
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
      {isSuccess && <Alert body="reviewed successfully" />}
      <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
        {(props) => (
          <Form className="  flex flex-col gap-4">
            <Typography className="text-title py-2 !text-sm md:text-base text-md dark:text-title-dark font-medium capitalize">
              what do you thing about this company ?
            </Typography>
            <TextInput name="body" label="Review" placeholder="" />
            <div className="w-full max-w-[200px]">
              <Typography className="capitalize text-title dark:text-title-dark text-sm md:text-base font-medium py-2">
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
                className="!bg-red-400   flex justify-center cursor-pointer items-center rounded-md h-9 md-20 px-4 md:px-0 md:h-11 md:w-28 !capitalize "
              >
                <span className="text-white text-xs font-bold">cancel</span>
              </div>

              <Button className="rounded-sm text-center  h-9 w-20 md:h-11 flex justify-center items-center md:w-28 !capitalize ">
                {!isLoading && (
                  <span className="text-white text-xs font-bold">review</span>
                )}
                {isLoading && <PageIsLoading size={14} />}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyReviewForm;

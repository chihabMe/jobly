import { Form, Formik, FormikHelpers } from "formik";
import React from "react";
import Button from "src/components/ui/Button";
import TextInput from "src/components/ui/TextInput";
import { Select, Option, Typography } from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
import CompanyReviewStars from "./CompanyReviewStars";
import { useUpdateCompanyReviewMutation } from "src/store/features/companyProfileApit";
interface InitialValues {
  body: string;
  stars: number;
}
interface Props {
  closeModel: () => void;
}
const initialValues: InitialValues = {
  body: "",
  stars: 0,
};
const CompanyReviewForm = ({ closeModel }: Props) => {
  const [updateReview] = useUpdateCompanyReviewMutation();
  const onSubmitHandler = (
    values: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) => {};
  return (
    <div className="w-full  ">
      <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
        {(props) => (
          <Form className="  flex flex-col gap-4">
            <TextInput name="body" label="Review" placeholder="" />
            <div className="w-full max-w-[200px]">
              <Typography className="capitalize text-title dark:text-title-dark  font-medium py-2">
                rate{" "}
              </Typography>
              <CompanyReviewStars />
            </div>
            <div className="flex justify-end gap-4">
              <div
                onClick={closeModel}
                className="!bg-red-400 flex justify-center cursor-pointer items-center rounded-sm h-11 w-28 !capitalize "
              >
                <span className="text-white text-xs font-bold">cancel</span>
              </div>

              <Button className="rounded-sm h-11 w-28 !capitalize ">
                review
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CompanyReviewForm;

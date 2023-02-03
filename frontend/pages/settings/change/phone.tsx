import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import Input from "src/components/ui/Input";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { phoneSchema } from "src/helpers/schemas";
import SettingsChangeCardWrapper from "src/pages/Settings/SettingsChangeCardWrapper";
import SettingsChangeLayout from "src/pages/Settings/SettingsChangeLayout";
import SettingsChangeTitle from "src/pages/Settings/SettingsChangeTitle";
import Button from "src/components/ui/Button";
import Link from "next/link";
import PageIsLoading from "src/components/ui/PageIsLoading";
import UseFetch from "src/hooks/use-fetch";
import { useRouter } from "next/router";
import { useUpdatePhoneNumberMutation } from "src/store/features/employeeProfileApi";

const initialValues = {
  phone: "",
};
const Phone = () => {
  // const { data, request, status, isLoading, error } = UseFetch();
  const [updatePhone, { data, error, isLoading, isSuccess }] =
    useUpdatePhoneNumberMutation();
  const router = useRouter();
  const handleChangeSubmit = async (body: typeof initialValues) => {
    const data = new FormData();
    data.append("phone", body.phone);
    return await updatePhone({
      data,
    });
  };
  useEffect(() => {
    if (!isLoading && isSuccess) router.push("/settings");
  }, [isLoading]);
  console.log("data", data);
  console.log("error", error);
  return (
    <SettingsChangeCardWrapper>
      <CardHeader>
        <SettingsChangeTitle title="phone" />
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={initialValues}
          validationSchema={phoneSchema}
          onSubmit={async (values, actions) => {
            const resData = await handleChangeSubmit(values);
            //@ts-ignore
            actions.setErrors(resData?.error.data);
          }}
        >
          {(props) => (
            <Form className="flex flex-col gap-4">
              <Input
                name="phone"
                type="text"
                label="enter your phone number "
              />
              <div></div>
              <div className="py-4 flex gap-4 items-center justify-end">
                <Link href={"/settings"}>
                  <Typography className="   !bg-red-400   shadow  text-center  rounded-md cursor-pointer font-bold h-10 text-xs flex justify-center items-center  w-24 text-white">
                    cancel
                  </Typography>
                </Link>
                <Button className="w-24 text-center">
                  {isLoading ? <PageIsLoading size={10} /> : "change"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </SettingsChangeCardWrapper>
  );
};

Phone.PageLayout = SettingsChangeLayout;
export default Phone;

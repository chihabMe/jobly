import { CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { changePasswordSchema } from "src/helpers/schemas";
import { Card } from "@material-tailwind/react";
import UseFetch from "src/hooks/use-fetch";
import SettingsChangeTitle from "src/pages/Settings/SettingsChangeTitle";
import SettingsChangeCardWrapper from "src/pages/Settings/SettingsChangeCardWrapper";
import SettingsChangeLayout from "src/pages/Settings/SettingsChangeLayout";
const initialsValues = {
  newPassword: "",
  reNewPassword: "",
  currentPassword: "",
};
const Password = () => {
  const { data, request, status, isLoading, error } = UseFetch();
  const router = useRouter();
  const handleChangeSubmit = async (body: typeof initialsValues) => {
    return await request(
      "POST",
      "/api/profile/change/password",
      JSON.stringify({
        new_password: body.newPassword,
        re_new_password: body.reNewPassword,
        current_password: body.currentPassword,
      })
    );
  };
  useEffect(() => {
    if (isLoading && status == 204) router.push("/settings");
  }, [isLoading]);
  return (
    <SettingsChangeCardWrapper>
      <CardHeader>
        <SettingsChangeTitle title="password" />
      </CardHeader>
      <CardBody>
        <Formik
          onSubmit={async (values, actions) => {
            const { response, resData } = await handleChangeSubmit(values);
            if (response && response.status != 200) {
              actions.setErrors(resData);
            }
          }}
          validationSchema={changePasswordSchema}
          initialValues={initialsValues}
        >
          {(props) => (
            <Form className="flex w-full  flex-col gap-4">
              <Input name="newPassword" type="password" label="new password" />
              <Input
                name="reNewPassword"
                type="password"
                label="confirm your new password"
              />
              <Input
                name="currentPassword"
                type="password"
                label="current password"
              />
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
Password.PageLayout = SettingsChangeLayout;

export default Password;

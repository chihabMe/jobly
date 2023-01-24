import { Typography } from "@material-tailwind/react";
import camelize from "camelize-ts";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { changePasswordSchema } from "src/helpers/schemas";
import UseFetch from "src/hooks/use-fetch";
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
    <main className="pt-10">
      <section className="w-full mt-10 flex flex-col gap-4 p-2 max-w-sm mx-auto">
        <Typography className="font-bold text-lg py-2 capitalize text-title dark:text-title-dark">
          change your password
        </Typography>
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
            <Form className="flex flex-col gap-4">
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
              <Button className="w-full h-10">
                {isLoading ? <PageIsLoading size={10} /> : "change"}
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default Password;

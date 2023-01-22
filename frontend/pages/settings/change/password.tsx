import { Typography } from "@material-tailwind/react";
import { Form, Formik } from "formik";
import React from "react";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import { changePasswordSchema } from "src/helpers/schemas";
import UseFetch from "src/hooks/use-fetch";
const initialsValues = {
  new_password: "",
  re_new_password: "",
  current_password: "",
};
const Password = () => {
  const { data, request, isLoading, error } = UseFetch();
  const handleChangeSubmit = (body: typeof initialsValues) => {};
  return (
    <main className="pt-10">
      <section className="w-full mt-10 flex flex-col gap-4 p-2 max-w-sm mx-auto">
        <Typography className="font-bold text-lg py-2 capitalize text-title dark:text-title-dark">
          change your password
        </Typography>
        <form className="rounded-md    ">
          <Formik
            onSubmit={(values, actions) => {
              console.log(values);
            }}
            validationSchema={changePasswordSchema}
            initialValues={initialsValues}
          >
            {(props) => (
              <Form className="flex flex-col gap-4">
                <Input
                  name="new_password"
                  type="password"
                  label="new password"
                />
                <Input
                  name="re_new_password"
                  type="password"
                  label="confirm your new password"
                />
                <Input
                  name="current_password"
                  type="password"
                  label="current password"
                />
                <Button>save</Button>
              </Form>
            )}
          </Formik>
        </form>
      </section>
    </main>
  );
};

export default Password;

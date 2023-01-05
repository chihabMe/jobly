import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import { registrationSchema } from "src/helpers/schemas";
import Image from "next/image";
import AccountTypeChoices from "./AccountTypeChoices";
interface Props {
  setIsRegistered: (value: boolean) => void;
}
interface FormTypes {
  username: string;
  email: string;
  password: string;
  re_password: string;
  account_type: string;
}

const SignupForm = ({ setIsRegistered }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const signup = async ({
    account_type,
    email,
    password,
    re_password,
    username,
  }: FormTypes) => {
    return await fetch("/api/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        re_password,
        account_type,
      }),
    });
  };
  const initialState: FormTypes = {
    username: "",
    email: "",
    password: "",
    re_password: "",
    account_type: "employee",
  };

  return (
    <Formik
      validateOnChange={false}
      initialValues={initialState}
      validationSchema={registrationSchema}
      onSubmit={async (values, actions) => {
        setIsLoading(true);
        const response = await signup({
          username: values.username,
          email: values.email,
          password: values.password,
          re_password: values.re_password,
          account_type: values.account_type,
        });
        const data = await response.json();
        if (response.status != 201) actions.setErrors(data);
        // else router.push("/login");
        else setIsRegistered(true);
        actions.setSubmitting(false);
        setIsLoading(false);
      }}
    >
      {(props) => (
        <Form className="flex flex-col gap-6 ">
          <Input
            name="username"
            type="text"
            label="Username"
            placeholder="Enter your username"
          />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
          />
          <Input
            name="re_password"
            type="password"
            label="password confirmation"
            placeholder="re enter your password"
          />
          <AccountTypeChoices
            choice={props.values.account_type}
            setChoice={props.getFieldHelpers("account_type").setValue}
          />
          <Button className="w-full  h-11 items-center  py-0 !capitalize bg-blue-300    flex justify-center text-sm font-medium  ">
            {isLoading ? <MoonLoader size={20} color="white" /> : "sign up"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;

import Link from "next/link";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import { useRouter } from "next/router";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { authActions } from "src/store/slices/authSlice";
import useAppSelector from "src/hooks/useAppSelector";
import useDispatchApp from "src/hooks/useAppDispatch";
import useAppDispatch from "src/hooks/useAppDispatch";
import { Form, Formik, FormikValues } from "formik";
import { loginSchema, registrationSchema } from "src/helpers/schemas";
import Image from "next/image";
import { CircleLoader, MoonLoader } from "react-spinners";
import camelize from "camelize-ts";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const signup = async (
    username: string,
    email: string,
    password: string,
    re_password: string
  ) => {
    return await fetch("/api/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, re_password }),
    });
  };
  const router = useRouter();
  const initialState = {
    username: "",
    email: "",
    password: "",
    re_password: "",
  };
  return (
    <main className="w-full min-h-screen   ">
      <div className="w-full mt-10 flex max-w-screen-xl min-h-[550px] mx-auto bg-primary rounded-2xl  ">
        <div className="hidden md:flex md:w-1/2  min-h-full    bg-primary rounded-l-md">
          <div className="w-60 h-60 relative mx-auto my-auto ">
            <Image src="/images/svg/welcome.svg" layout="fill" />
          </div>
        </div>
        <div className="w-full md:w-1/2  bg-bg dark:bg-gray-900 pt-6 rounded-r-md">
          <div className="w-full h-full max-w-sm mx-auto flex flex-col justify-center gap-4">
            <h1 className="text-center capitalize py-4 text-2xl text-title dark:text-title-dark font-bold">
              Sing up
            </h1>
            <Formik
              validateOnChange={false}
              initialValues={initialState}
              validationSchema={registrationSchema}
              onSubmit={async (values, actions) => {
                setIsLoading(true);
                const response = await signup(
                  values.username,
                  values.email,
                  values.password,
                  values.re_password
                );
                const data = await response.json();
                if (response.status != 201) actions.setErrors(data);
                else router.push("/login");
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
                  <Button className="w-full rounded-sm h-11 items-center  py-0 !capitalize bg-blue-300    flex justify-center text-sm font-medium  ">
                    {isLoading ? (
                      <MoonLoader size={20} color="white" />
                    ) : (
                      "sign up"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="flex gap-4 justify-between items-center">
              <ul className=" h-px py-px  bg-gray-800 w-1/3" />
              <h2 className="text-title dark:text-title-dark font-medium">
                or
              </h2>
              <ul className=" h-px py-px  bg-gray-800 w-1/3" />
            </div>
            <div className="w-full">
              <ul className="flex justify-around">
                <li className="w-8 h-8 relative    cursor-pointer">
                  <Image
                    layout="fill"
                    src={"/images/icons/google.png"}
                    alt="google icons"
                  />
                </li>
                <li className="w-8 h-8 relative    cursor-pointer">
                  <Image
                    layout="fill"
                    src={"/images/icons/github.png"}
                    alt="github icons"
                  />
                </li>
                <li className="w-8 h-8 relative    cursor-pointer">
                  <Image
                    layout="fill"
                    src={"/images/icons/linkedin.png"}
                    alt="linkedin icons"
                  />
                </li>
              </ul>
            </div>
            <div className="">
              <h1 className="text-center text-sm  font-medium flex justify-center gap-2 ">
                <span className="text-title  dark:text-title-dark">
                  Don you Have an account ?
                </span>
                <span className="text-primary  cursor-pointer">
                  <Link href={"/login"}>login </Link>
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignUp;

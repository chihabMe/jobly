import Link from "next/link";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import Input from "src/components/ui/Input";
import { useRouter } from "next/router";
import { verify } from "crypto";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { authActions } from "src/store/slices/authSlice";
import useAppSelector from "src/hooks/useAppSelector";
import useDispatchApp from "src/hooks/useAppDispatch";
import useAppDispatch from "src/hooks/useAppDispatch";
import { Form, Formik, FormikValues } from "formik";
import { loginSchema } from "src/helpers/schemas";
import Image from "next/image";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogged, registeredEmail, isLoading, loggingFailed } =
    useAppSelector((state) => state.auth);
  const onChangeHandler = (e: any) => {
    // setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    dispatch(authActions.consumeEmailAfterEnteringTheLoggingPage());
  }, []);
  useEffect(() => {
    if (!isLoading && isLogged) {
      router.push("/");
    }
  }, [isLogged]);
  return (
    <main className="w-full min-h-screen   ">
      <div className="w-full mt-10 flex max-w-screen-xl min-h-[500px] mx-auto bg-primary rounded-2xl  ">
        <div className="hidden md:flex md:w-1/2  min-h-full    ">
          <div className="w-60 h-60 relative mx-auto my-auto ">
            <Image src="/images/svg/welcome.svg" layout="fill" />
          </div>
        </div>
        <div className="w-full md:w-1/2  bg-white">
          <div className="w-full h-full max-w-sm mx-auto flex flex-col justify-center gap-10">
            <h1 className="text-center text-2xl text-title dark:text-title-dark font-bold">
              Hello! Welcome back
            </h1>
            <Formik
              initialValues={initialState}
              validationSchema={loginSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form className="flex flex-col gap-4 ">
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
                  <div className="text-end">
                    <span className="text-primary font-medium cursor-pointer">
                      Reset Password
                    </span>
                  </div>
                  <Button className="w-full rounded-sm h-11 items-center  py-0 !capitalize bg-blue-300    flex justify-center text-sm font-medium  ">
                    {isLoading ? <PageIsLoading size={7} /> : "login"}
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
                  Don't Have an account ?
                </span>
                <span className="text-primary  cursor-pointer">
                  Crete an account
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;

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
import SignupForm from "./SignupForm";
import RegistredDisplay from "./RegistredDisplay";
import SignupWithSocialAccounts from "./SignupWithSocialAccounts";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const SignUp = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <main className="w-full min-h-screen   ">
      <div className="w-full mt-10 flex justify-center max-w-screen-xl   mx-auto  rounded-2xl  ">
        <div className="w-full md:w-1/2  bg-bg dark:bg-gray-900 pt-6 pb-4 rounded-r-md px-4 ">
          <div className="w-full h-full max-w-sm  mx-auto flex flex-col justify-center gap-2">
            <h1 className="text-center capitalize py-4 text-2xl text-title dark:text-title-dark font-bold">
              Sing up
            </h1>
            {!isRegistered && (
              <>
                <SignupForm setIsRegistered={setIsRegistered} />
                <SignupWithSocialAccounts />
              </>
            )}
            {isRegistered && <RegistredDisplay />}

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

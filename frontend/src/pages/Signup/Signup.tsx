import Link from "next/link";
import router from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";
import UseFetch from "src/hooks/use-fetch";

const initialState = {
  email: "",
  username: "",
  password: "",
  re_password: "",
};
const Signup = () => {
  const { request,status, isLoading, data, error } = UseFetch();
  const [form, setForm] = useState(initialState);
  const onChangeHandler = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    request("POST", "/api/register", JSON.stringify(form));
  };
  useEffect(() => {
    if(status==201)router.replace("/login")
  }, [status]);
  return (
    <div className="  pt-10 md:pt-20   ">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-sm p-2 mx-auto flex flex-col gap-2    rounded-md"
      >
        <Controller htmlFor="email" text="email">
          <Input value={form.email} name="email" onChange={onChangeHandler} />
        </Controller>
        <Controller
          error={error["username"]}
          htmlFor="username"
          text="username"
        >
          <Input
            value={form.username}
            name="username"
            onChange={onChangeHandler}
          />
        </Controller>
        <Controller
          error={error["password"]}
          htmlFor="password"
          text="password"
        >
          <Input
            type="password"
            value={form.password}
            name="password"
            onChange={onChangeHandler}
          />
        </Controller>
        <Controller
          error={error["re_password"]}
          htmlFor="re_password"
          text="password confirmation"
        >
          <Input
            type="password"
            value={form.re_password}
            name="re_password"
            onChange={onChangeHandler}
          />
        </Controller>
        <Button
          text={isLoading ? "signing up " : " sign up "}
          className="w-full  capitalize rounded-md bg-primary  flex justify-center font-medium  "
        />
        <Link href="/login">
          <span className=" hover:text-blue-300 cursor-pointer">
            go to login page
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Signup;

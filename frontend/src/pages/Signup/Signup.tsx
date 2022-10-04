import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Button from "src/components/ui/Button";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";

const initialState = {
  email: "",
  username: "",
  password: "",
  re_password: "",
};
const Signup = () => {
  const [form, setForm] = useState(initialState);
  const onChangeHandler = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="  pt-10 md:pt-20   ">
      <form className="w-full max-w-sm p-2 mx-auto flex flex-col gap-4    rounded-md">
        <Controller htmlFor="email" text="email">
          <Input value={form.email} name="email" onChange={onChangeHandler} />
        </Controller>
        <Controller htmlFor="username" text="username">
          <Input
            value={form.username}
            name="username"
            onChange={onChangeHandler}
          />
        </Controller>
        <Controller htmlFor="password" text="password">
          <Input
            value={form.password}
            name="password"
            onChange={onChangeHandler}
          />
        </Controller>
        <Controller htmlFor="re_password" text="password confirmation">
          <Input
            value={form.re_password}
            name="re_password"
            onChange={onChangeHandler}
          />
        </Controller>
        <Button
          text="sign up"
          className="w-full  capitalize rounded-md bg-blue-300  flex justify-center font-medium  "
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

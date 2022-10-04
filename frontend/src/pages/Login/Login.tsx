import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Button from "src/components/ui/Button";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const [form, setForm] = useState(initialState);
  const onChangeHandler = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="  pt-10 md:pt-32   ">
      <form className="w-full max-w-sm p-2 mx-auto flex flex-col gap-4    rounded-md">
        <Controller htmlFor="email" text="email">
          <Input value={form.email} name="email" onChange={onChangeHandler} />
        </Controller>
        <Controller htmlFor="password" text="password">
          <Input
            value={form.password}
            name="password"
            onChange={onChangeHandler}
          />
        </Controller>
        <Button
          text="login"
          className="w-full rounded-md bg-blue-300  flex justify-center font-medium  "
        />
        <Link href="/signup">
          <span className=" hover:text-blue-300 cursor-pointer">
            create an account
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;

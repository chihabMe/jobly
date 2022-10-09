import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";
import UseFetch from "src/hooks/use-fetch";
import { useDispatch } from "react-redux";
import { authAction } from "src/store/slices/authSlice";
import { useRouter } from "next/router";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const router = useRouter()
  const [form, setForm] = useState(initialState);

  //redux 
  const dispatch = useDispatch()
  //

  const { request, status, data, error, isLoading } = UseFetch();
  const onChangeHandler = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    request("POST", "/api/login", JSON.stringify(form));
  };
  useEffect(()=>{
    if(status==200){
      dispatch(authAction.login())
      router.replace("/")
      }
  },[status])
  return (

    <div className="  pt-10 md:pt-32   ">
      <form
        onSubmit={submitHandler}
        className="w-full max-w-sm p-2 mx-auto flex flex-col gap-4    rounded-md"
      >
        <Controller htmlFor="email" text="email">
          <Input type='email' value={form.email} name="email" onChange={onChangeHandler} />
        </Controller>
        <Controller htmlFor="password" text="password">
          <Input
            value={form.password}
            type='password'
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

import Link from "next/link";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Button from "src/components/ui/Button";
import Controller from "src/components/ui/Controller";
import Input from "src/components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { verify } from "crypto";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { authActions } from "src/store/slices/authSlice";

const initialState = {
    email: "",
    password: "",
};
const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLogged, registeredEmail, isLoading, loggingFailed } = useSelector((state) => state.auth);
    const [form, setForm] = useState({ ...initialState, email: registeredEmail ?? "" });
    const onChangeHandler = (e: any) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        dispatch(authActions.login(form));
    };
    useEffect(() => {
        dispatch(authActions.consumeEmailAfterEnteringTheLoggingPage());
    }, [])
    useEffect(() => {
        if (!isLoading && isLogged) {
            router.push("/");
        }
    }, [isLogged]);
    return (
        <div className="  pt-10 md:pt-32   ">
            <form
                onSubmit={submitHandler}
                className="w-full max-w-sm p-2 mx-auto flex flex-col gap-4    rounded-md"
            >
                <Controller htmlFor="email" text="email">
                    <Input
                        type="email"
                        value={form.email}
                        name="email"
                        onChange={onChangeHandler}
                    />
                </Controller>
                <Controller htmlFor="password" text="password">
                    <Input
                        value={form.password}
                        type="password"
                        name="password"
                        onChange={onChangeHandler}
                    />
                </Controller>
                {loggingFailed && <div className="text-red-300">invalid credentials please try again</div>}
                <Button
                    text={isLoading ? <PageIsLoading size={7} /> : "login"}
                    className="w-full rounded-md bg-blue-300    flex justify-center font-medium  "
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

import React, { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import useAppDispatch from "src/hooks/useAppDispatch";
import { authActions } from "src/store/slices/authSlice";
import useAppSelector from "src/hooks/useAppSelector";
import { MoonLoader } from "react-spinners";
import PageIsLoading from "../ui/PageIsLoading";

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(authActions.verify());
  }, []);
  if (isLoading)
    return (
      <div className="w-full h-screen">
        <PageIsLoading />
      </div>
    );
  return <div className="mx-auto max-w-screen-2xl   ">{children}</div>;
};

export default Container;

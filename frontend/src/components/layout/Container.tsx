import React, { ReactNode, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import useAppDispatch from "src/hooks/useAppDispatch";
import { authActions } from "src/store/slices/authSlice";

const Container: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("run verify=");
    dispatch(authActions.verify());
  }, []);
  return <div className="mx-auto max-w-screen-2xl   ">{children}</div>;
};

export default Container;

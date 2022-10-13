import React, { ReactNode, useEffect } from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "src/store/slices/authSlice";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLogged, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(authActions.verify());
  }, []);
  if (isLoading) return <PageIsLoading />;
  if (!isLoading && !isLogged) {
     router.push("/login");
   return <PageIsLoading />;
  }
  return children;
};

export default ProtectedRoute;

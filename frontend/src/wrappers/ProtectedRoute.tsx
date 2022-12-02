import React, { ReactNode, useEffect, useRef } from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { authActions } from "src/store/slices/authSlice";
import { useRouter } from "next/router";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();;
  const fetched = useRef(false)
  
  const dispatch = useAppDispatch();
  const { isLogged, isLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if(!fetched.current){
    dispatch(authActions.verify());
    fetched.current=true

    }
  }, [dispatch]);
  if (isLoading) return <PageIsLoading />;
  if (!isLoading && !isLogged) {
    console.log("----")
    console.log("isloading",isLoading)
    console.log("isLogged",isLogged)
    console.log("----")
    router.push("/login");
    return <PageIsLoading />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

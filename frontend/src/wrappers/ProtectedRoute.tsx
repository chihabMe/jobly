import React, { ReactNode, useEffect } from "react";
import PageIsLoading from "src/components/ui/PageIsLoading";
import { authActions } from "src/store/slices/authSlice";
import { useRouter } from "next/router";
import useAppDispatch from "src/hooks/useAppDispatch";
import useAppSelector from "src/hooks/useAppSelector";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();;
  const dispatch = useAppDispatch();
  const { isLogged, isLoading } = useAppSelector((state) => state.auth);
  useEffect(() => {
    dispatch(authActions.verify());
  }, [dispatch]);
  if (isLoading) return <PageIsLoading />;
  if (!isLoading && !isLogged) {
    router.push("/login");
    return <PageIsLoading />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

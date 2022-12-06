import Head from "next/head";
import React from "react";
import useAppSelector from "src/hooks/useAppSelector";
import CompanyProfile from "src/pages/Profile/CompanyProfile/CompanyProfile";
import EmployeeProfile from "src/pages/Profile/EmployeeProfile/EmployeeProfile";
import ProtectedRoute from "src/wrappers/ProtectedRoute";

const ProfilePage = () => {
  const { isLoading, isLogged, user } = useAppSelector((state) => state.auth);
  return (
    <>
      <ProtectedRoute>
        <Head>
          <title>{user?.name} profile</title>
        </Head>
        {user && user?.type == "EMPLOYEE" && <EmployeeProfile />}
        {user && user?.type == "COMPANY" && <CompanyProfile />}
      </ProtectedRoute>
    </>
  );
};

export default ProfilePage;

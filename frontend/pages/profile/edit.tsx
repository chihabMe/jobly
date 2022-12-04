import Head from "next/head";
import React from "react";
import useAppSelector from "src/hooks/useAppSelector";
import EmployeeProfile from "src/pages/Profile/EmployeeProfile/EmployeeProfile";
import CompanyProfileEdit from "src/pages/ProfileEdit/CompanyProfileEdit";
import EmployeeProfileEdit from "src/pages/ProfileEdit/EmployeeProfileEdit";
import ProtectedRoute from "src/wrappers/ProtectedRoute";

const ProfileEditPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <>
    <Head>
      <title>{user?.name} profile edit</title>
    </Head>
      <main>
        <ProtectedRoute>
          {user && user.type == "COMPANY" && <CompanyProfileEdit />}
          {user && user.type == "EMPLOYEE" && <EmployeeProfileEdit />}
        </ProtectedRoute>
      </main>
    </>
  );
};

export default ProfileEditPage;

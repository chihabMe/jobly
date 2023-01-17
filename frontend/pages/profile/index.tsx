import { currentUserEndpoint, currentUserProfileEndpoint } from "config";
import { NextPageContext } from "next";
import Head from "next/head";
import React from "react";
import useAppSelector from "src/hooks/useAppSelector";
import generateAuthConfig from "src/libs/generateAuthConfig";
import CompanyProfile from "src/pages/Profile/CompanyProfile/CompanyProfile";
import EmployeeProfile from "src/pages/Profile/EmployeeProfile/EmployeeProfile";
import ProtectedRoute from "src/wrappers/ProtectedRoute";
import request from "src/services/request";
import cookie from "cookie";
import CompanyUser from "src/models/CompanyUser";

const ProfilePage = ({ profile }: { profile: CompanyUser }) => {
  const { isLoading, isLogged, user } = useAppSelector((state) => state.auth);
  return (
    <>
      <Head>
        <title>{user?.name} profile</title>
      </Head>
      {user && user?.type == "EMPLOYEE" && <EmployeeProfile />}
      {user && user?.type == "COMPANY" && <CompanyProfile profile={profile} />}
    </>
  );
};

export default ProfilePage;
export const getServerSideProps = async (context: NextPageContext) => {
  const config = generateAuthConfig("GET", context.req?.headers.cookie || "");
  const refresh = cookie.parse(context?.req?.headers.cookie || "").refresh;
  const finalEndpoint = currentUserProfileEndpoint;
  try {
    const {
      status,
      data: profile,
      newTokens,
    } = await request({
      endpoint: finalEndpoint,
      config,
      refresh,
      res: context?.res,
    });
    if (status != 200) return { notFound: true };
    return {
      props: {
        profile,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

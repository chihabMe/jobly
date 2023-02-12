import { GetServerSideProps, NextPageContext } from "next";
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
import EmployeeUser from "src/models/EmployeeUser";
import { currentUserProfileEndpoint } from "config/constances";

const ProfilePage = ({ profile }: { profile: CompanyUser | EmployeeUser }) => {
  const { isLoading, isLogged, user } = useAppSelector((state) => state.auth);
  return (
    <>
      <Head>
        <title>{user?.name} profile</title>
      </Head>
      {user && user?.type == "EMPLOYEE" && (
        <EmployeeProfile profile={profile as EmployeeUser} />
      )}
      {user && user?.type == "COMPANY" && (
        <CompanyProfile profile={profile as CompanyUser} />
      )}
    </>
  );
};

export default ProfilePage;
export const getServerSideProps = async (context: NextPageContext) => {
  const config = generateAuthConfig("GET", context.req?.headers.cookie || "");
  const refresh = cookie.parse(context?.req?.headers.cookie || "").refresh;
  const access = cookie.parse(context?.req?.headers.cookie || "").access;
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
    if (status != 200) {
      return { props: {}, redirect: { destination: "/signup" } };
    }
    return {
      props: {
        profile,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

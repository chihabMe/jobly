import { NextPageContext } from "next";
import Head from "next/head";
import generateAuthConfig from "src/libs/generateAuthConfig";
import React from "react";
import cookie from "cookie";
import CompanyUser from "src/models/CompanyUser";
import CompanyProfile from "src/pages/Profile/CompanyProfile/CompanyProfile";
import { companyEndpoint } from "config";
import request from "src/services/request";

const ProfilePage = ({ profile }: { profile: CompanyUser }) => {
  return (
    <>
      <Head>
        <title>{profile.name} profile</title>
      </Head>
      <CompanyProfile profile={profile} />
    </>
  );
};

export default ProfilePage;
export const getServerSideProps = async (context: NextPageContext) => {
  const config = generateAuthConfig("GET", context.req?.headers.cookie || "");
  const refresh = cookie.parse(context?.req?.headers.cookie || "").refresh;
  const companySlug = context.query.slug as string[];
  const finalEndpoint = companyEndpoint + companySlug[1] + "/";
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
  } catch {
    return { notFound: true };
  }
};

import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { refreshEndpoint } from "config/constances";
import { authActions } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  mode: "cors",
  credentials: "same-origin",
});
const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status == 401) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(refreshEndpoint, config);
    const data = await response.json();
    if (response.status == 200) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(authActions.logout());
    }
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  tagTypes: [
    "Profile",
    "Job",
    "CompanyJobs",
    "CompanyReviews",
    "CompanyReview",
  ],
  endpoints: (builder) => ({}),
});

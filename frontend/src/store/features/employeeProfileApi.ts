import type EmployeeUser from "src/models/EmployeeUser";
import { apiSlice } from "../api/apiSlice";
import camelize from "camelize-ts";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<EmployeeUser, void>({
      query: () => "/me",
      providesTags: ["Profile"],
      transformResponse:(response:EmployeeUser)=>{
        return camelize(response)
      }
    }),
    uploadCv: builder.mutation({
      query: (data:FormData) => ({
        url: "/profile/update",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUploadCvMutation } =
  extendedApiSlice;

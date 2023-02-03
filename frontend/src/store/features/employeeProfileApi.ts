import type EmployeeUser from "src/models/EmployeeUser";
import { apiSlice } from "../api/apiSlice";
import camelize from "camelize-ts";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployeeProfile: builder.query<EmployeeUser, void>({
      query: () => "/profile",
      providesTags: ["Profile"],
      transformResponse: (response: EmployeeUser) => {
        return camelize(response);
      },
    }),
    uploadCv: builder.mutation({
      invalidatesTags: ["Profile"],
      query: (data: FormData) => ({
        url: "/profile/update",
        method: "PUT",
        body: data,
      }),
    }),
    updatePhoneNumber: builder.mutation({
      invalidatesTags: ["Profile"],
      query: ({ data }: { data: FormData }) => ({
        url: "/profile/update",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetEmployeeProfileQuery,
  useUploadCvMutation,
  useUpdatePhoneNumberMutation,
} = extendedApiSlice;

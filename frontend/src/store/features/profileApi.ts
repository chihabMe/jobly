import User from "src/models/User";
import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<User, void>({
      query: () => "/me",
      providesTags: ["Profile"],
    }),
    changeProfileImage: builder.mutation({
      invalidatesTags: ["Profile"],
      query: (data: FormData) => ({
        url: "/profile/update",
        method: "PUT",
        body: data,
      }),
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

export const { useGetProfileQuery, useUploadCvMutation,useChangeProfileImageMutation } =
  extendedApiSlice;

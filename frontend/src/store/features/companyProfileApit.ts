import camelize from "camelize-ts";
import CompanyReview from "src/models/CompanyReview";
import CompanyUser from "src/models/CompanyUser";
import Job from "src/models/Job";
import { apiSlice } from "../api/apiSlice";
export interface ResponseError {
  name: string[];
  description: string[];
  number_of_employees: string[];
  website: string[];
  phone: string[];
}

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<CompanyUser, void>({
      query: () => "/me",
      providesTags: ["Profile"],
      transformResponse: (response: CompanyUser) => {
        if (response.image == null) response.image = "";
        return camelize(response);
      },
    }),
    getCompanyJobs: builder.query<
      { count: number; next: boolean; results: Job[] },
      string
    >({
      query: (company) => `profile/company/${company}/jobs`,
      providesTags: ["CompanyJobs"],
    }),
    getCompanyReview: builder.query<CompanyReview[], string>({
      providesTags: ["CompanyReviews"],
      query: (companySlug) => `profile/company/${companySlug}/reviews`,
    }),
    updateCompanyReview: builder.mutation<
      any,
      { companySlug: string; rate: number; body: string }
    >({
      invalidatesTags: ["CompanyReviews"],
      query: ({ companySlug, body, rate }) => ({
        url: `profile/company/${companySlug}/reviews`,
        method: "PUT",
        body: { body, rate },
      }),
    }),

    changeCompanyProfileCover: builder.mutation({
      invalidatesTags: ["Profile"],
      transformResponse: (result: { data: ResponseError }) => {
        return camelize(result);
      },
      query: (cover: FormData) => ({
        url: "/profile/update",
        method: "PUT",
        body: cover,
      }),
    }),
    updateCompanyProfile: builder.mutation({
      invalidatesTags: ["Profile"],
      transformResponse: (result: { data: ResponseError }) => {
        return camelize(result);
      },

      query: ({
        phone,
        name,
        website,
        description,
        numberOfEmployees,
      }: {
        phone: string;
        name: string;
        numberOfEmployees: number;
        website: string;
        description: string;
      }) => ({
        url: "/profile/update",
        method: "PUT",
        body: {
          phone,
          name,
          website,
          description,
          number_of_employees: numberOfEmployees,
        },
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateCompanyProfileMutation,
  useGetCompanyJobsQuery,
  useChangeCompanyProfileCoverMutation,
  useGetCompanyReviewQuery,
  useUpdateCompanyReviewMutation,
} = extendedApiSlice;

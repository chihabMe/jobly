import camelize from "camelize-ts";
import CompanyUser from "src/models/CompanyUser";
import { apiSlice } from "../api/apiSlice";

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<CompanyUser, void>({
      query: () => "/me",
      providesTags: ["Profile"],
      transformResponse: (response: CompanyUser) => {
        return camelize(response);
      },
    }),
    changePhoneNumber:builder.mutation({
        invalidatesTags:["Profile"],
        query:(phoneNumber:string)=>({
            url:"/profile/update",
            method:"PUT",
            body:{phone:phoneNumber}
        }),
    })
  }),
});

export const {useGetProfileQuery,useChangePhoneNumberMutation} = extendedApiSlice
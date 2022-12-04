import { apiSlice } from "../api/apiSlice";
const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeProfileImage: builder.mutation({
      invalidatesTags: ["Profile"],
      query: (data: FormData) => ({
        url: "/profile/update",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {useChangeProfileImageMutation} = extendedApiSlice


import Job from "src/models/Job";
import { apiSlice } from "../api/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getJobDetail:builder.query<Job,string>({
            providesTags:["Job"],
            query:(slug)=>`/jobs/${slug}/detail`
        }),

    })
})
export const {useGetJobDetailQuery} = extendedApi
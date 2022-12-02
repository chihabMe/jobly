import { NextPageContext } from "next"
import Head from "next/head"
import JobDetail from "src/components/jobSearchResults/JobDetail"
import Job from "src/models/Job"


const Detail  = ({job}:{job:Job})=>{
    return (
        <>  
        <Head>
            <title>
            {job.title}
            </title>
        </Head>
        <JobDetail job={job}></JobDetail>
        </>
    )
}
export default Detail

export const  getServerSideProps =async(context:NextPageContext)=>{
    const {slug} = context.query
    const response =await  fetch (`api/jobs/${slug}/detail`,{method:"GET"})
    const data = await response.json()
    if(response.status!=200)return {
        notFound:true,
    }
    return {
        props:{
            job:data
        }
    }

}
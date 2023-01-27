import { jobDetailEndpoint } from "config/config";
import { NextPageContext } from "next";
import JobDetail from "src/components/jobSearchResults/JobDetail";
import generateAuthConfig from "src/libs/generateAuthConfig";
import Job from "src/models/Job";

const Detail = ({ slug }: { slug: string }) => {
  return <JobDetail slug={slug}></JobDetail>;
};
export default Detail;

export const getServerSideProps = async (context: NextPageContext) => {
  const { slug } = context.query;
  // const config = generateAuthConfig("GET",context?.req?.headers.cookie||"")
  // const response =await  fetch (`${jobDetailEndpoint}${slug}/`,config)
  // const data = await response.json()
  // if(response.status!=200)return {
  //     notFound:true,
  // }
  return {
    props: {
      slug,
    },
  };
};

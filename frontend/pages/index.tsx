import type { NextPage, NextPageContext } from "next";
import Home from "src/pages/Home/Home";
import cookie from "cookie";
import { verifyAuth } from "src/services/verifyAuth";
import Header from "src/components/layout/Header/Header";
import Footer from "src/components/layout/Footer/Footer";
import { API } from "config";

const HomePage: NextPage = () => {
    return (
        <>
                  <h1 className="text-xl">api{API}</h1>

            <Home />
            <Footer />
        </>
    );
};

export const getServerSideProps = async (context: NextPageContext) => {
    //   const cookie = context.req?.headers?.cookie;
    // let session;
    // try {
    //   if(cookie)session = await verifyAuth(cookie);
    // } catch (err) {
    //   return {
    //     notFound: true,
    //   };
    // }
    // console.log(session)
    return {
        props: {
        },
    };
};
export default HomePage;

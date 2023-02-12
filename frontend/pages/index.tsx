import type { NextPage, NextPageContext } from "next";
import Home from "src/pages/Home/Home";
import cookie from "cookie";
import Header from "src/components/layout/Header/Header";
import Footer from "src/components/layout/Footer/Footer";

const HomePage: NextPage = () => {
  return (
    <>
      <Home />
      <Footer />
    </>
  );
};

export default HomePage;

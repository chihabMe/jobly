import React, { useState } from "react";
import Image from "next/image";
import JobSearch from "src/components/layout/JobSearch/JobSearch";
import { useDispatch } from "react-redux";
import { authAction } from "src/store/slices/authSlice";
const Home = () => {
  
  return (
    <main>
      {/* home top */}

      <section className="w-full flex     pt-20  items-center p-4  md:px-10">
        <div className=" flex flex-col text-left gap-8 w-full md:w-2/3 ">
          <h1 className="  text-title text-3xl md:text-5xl font-bold md:max-w-md ">
            The <span className="text-primary shadow-sm "> Easiest Way </span>
            to Get Your New Job
          </h1>
          <p className="text-text text-sm md:text-lg font-medium">
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
          <JobSearch />
        </div>
        <div className="hidden md:block relative w-full md:w-1/3  ">
          <div className="w-96 h-96">
            <Image
              src="/images/home/homeHero.svg"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

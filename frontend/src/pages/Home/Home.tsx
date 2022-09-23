import React from "react";
import Image from "next/image";

const Home = () => {
  return (
    <main>
      {/* home top */}

      <section className="w-full flex    pt-20  items-center p-4  md:px-10">
        <div className=" flex flex-col text-left gap-4 w-full md:w-1/2 ">
          <h1 className="  text-5xl font-bold md:max-w-md ">
            The <span className="text-primary shadow-sm "> Easiest Way </span>
            to Get Your New Job
          </h1>
          <p className="text-text text-lg font-medium">
            Each month, more than 3 million job seekers turn to website in their
            search for work, making over 140,000 applications every single day
          </p>
        </div>
        <div className="hidden md:block relative w-full md:w-1/2  ">
          <div className="w-80 h-80">
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

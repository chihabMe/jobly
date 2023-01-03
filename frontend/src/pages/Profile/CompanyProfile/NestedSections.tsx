import React, { useState } from "react";
import CompanyUser from "src/models/CompanyUser";
import CompanyInfos from "./CompanyInfos";
import CompanyJobs from "./CompanyJobs";
import CompanyQanA from "./CompanyQanA";
import CompanyReviews from "./CompanyReviews/CompanyReviews";
import CompanyWhyUs from "./CompanyWhyUs";
import { Tab } from "@headlessui/react";

const NestedSections = ({ profile }: { profile: CompanyUser }) => {
  const [currentSection, setCurrentSections] = useState("infos");
  const [categories] = useState([
    {
      title: "information",
      component: <CompanyInfos profile={profile} />,
      id: 1,
    },
    {
      title: "jobs",
      component: <CompanyJobs company={profile.slug} />,
      id: 2,
    },
    {
      title: "why us",
      component: <CompanyWhyUs />,
      id: 3,
    },
    {
      title: "reviews",
      component: <CompanyReviews />,
      id: 4,
    },
    {
      title: "Q&A",
      component: <CompanyQanA />,
      id: 5,
    },
  ]);
  return (
    <div className="flex  min-h-screen flex-col gap-4">
      <Tab.Group>
        <Tab.List className={"  flex justify-between  w-full    p-1 "}>
          {categories.map((item) => (
            <Tab
              key={item.title}
              className={({
                selected,
              }) => `'w-full font-bold capitalize px-2 md:px-4 rounded-sm py-2.5  text-xs sm:text-sm md:text-base  leading-5 hover:bg-primary hover:!text-white  
                  ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'k
                ${
                  selected
                    ? "  bg-primary  !text-title-dark  shadow"
                    : "!text-title dark:!text-title-dark "
                }

                  `}
            >
              {item.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {categories.map((item) => (
            <Tab.Panel key={item.id}>{item.component}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default NestedSections;

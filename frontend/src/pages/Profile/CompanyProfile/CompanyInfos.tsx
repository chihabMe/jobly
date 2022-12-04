import React from "react";
import CompanyUser from "src/models/CompanyUser";
import ProfileTitle from "../ProfileTitle";

const CompanyInfos = ({ profile }: { profile: CompanyUser }) => {
  return (
    <div className="w-full flex flex-col gap-4 py-2 ">
      <ProfileTitle>about us</ProfileTitle>
      <p className="text-title dark:text-title-dark font-medium text-base ">
        {profile.description}
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit qui
        veniam cumque sapiente vel maxime quas nulla, ipsam commodi
        exercitationem delectus ullam officiis harum dolor? Deserunt excepturi
        consequuntur quasi repellat?
      </p>

      <div className="flex justify-between items-center">
        <ProfileTitle>website</ProfileTitle>
        <h2 className="text-lg font-medium ">{profile.website || "None"}</h2>
      </div>
      <div className="flex justify-between items-center">
        <ProfileTitle>phone number</ProfileTitle>
        <h2 className="text-lg font-medium ">{profile.phone || "None"}</h2>
      </div>
      <div className="flex justify-between items-center">
        <ProfileTitle> location</ProfileTitle>
        <h2 className="text-lg font-medium ">{profile.location || "None"}</h2>
      </div>
      <div className="flex justify-between items-center">
        <ProfileTitle> number of employees</ProfileTitle>
        <h2 className="text-lg font-medium ">
          {profile.numberOfEmployees || 0}
        </h2>
      </div>
      <div className="flex justify-between items-center">
        <ProfileTitle> number of jobs</ProfileTitle>
        <h2 className="text-lg font-medium ">
          {profile.numberOfOpenJobs || 0}
        </h2>
      </div>
    </div>
  );
};

export default CompanyInfos;

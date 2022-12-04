import React from "react";
import Image from "next/image";
import CompanyUser from "src/models/CompanyUser";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutLine } from "@heroicons/react/24/outline";
import Button from "src/components/ui/Button";

const CompanyTopInfos = ({ profile }: { profile: CompanyUser }) => {
  const stars = [];
  for (let i = 1; i < profile.rating; i++) {
    stars.push(<StarIcon className="w-4 h-4 text-yellow-900" />);
  }
  const reminder = profile.rating - Math.floor(profile.rating);
  for (let i = profile.rating; i < 5; i++) {
    stars.push(<StarIconOutLine className="w-4 h-4 text-gray-500" />);
  }
  return (
    <div className="flex gap-4 flex-col">
      <div className="w-full h-52 sm:h-64 md:h-72 relative">
        <Image className="rounded-md" src={profile.image} layout="fill" />
      </div>
      <div className="flex justify-between items-center py-2">

        {/* top-left */}
        <div className="flex  gap-4">
          <div className="w-16 h-16   relative ">
            <Image className="rounded-full" src={profile.image} layout="fill" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-title dark:text-title-dark font-bold text-lg sm:text-xl md:text-2xl capitalize">
              {profile.name}
            </h2>
            <div className="flex gap-2 items-center">
              <span className="font-bold text-title dark:text-title-dark   md:text-md">
                {profile.rating}
              </span>
              <div className="flex  items-center">{stars}</div>
            </div>
          </div>
        </div>
        {/* top-right */}
        <div className=" flex gap-4 items-center">
            <Button className=""  >
                follow
            </Button >
            <Button className="!bg-bg shadow  shadow-gray-600  !text-title "  >
                write a review
            </Button >

        </div>
      </div>
    </div>
  );
};

export default CompanyTopInfos;

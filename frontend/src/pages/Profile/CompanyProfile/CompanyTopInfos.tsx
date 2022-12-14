import React from "react";
import Image from "next/image";
import CompanyUser from "src/models/CompanyUser";
import { StarIcon } from "@heroicons/react/24/solid";
import {
  PencilSquareIcon,
  StarIcon as StarIconOutLine,
} from "@heroicons/react/24/outline";
import Button from "src/components/ui/Button";
import Link from "next/link";
import CompanyWriteAReview from "./CompanyReviews/CompanyWriteAReview";

const CompanyTopInfos = ({ profile }: { profile: CompanyUser }) => {
  const stars = [];
  for (let i = 1; i < profile.rating; i++) {
    stars.push(<StarIcon className="h-3 w-3 md:w-4 md:h-4 text-yellow-900" />);
  }
  const reminder = profile.rating - Math.floor(profile.rating);
  for (let i = profile.rating; i < 5; i++) {
    stars.push(
      <StarIconOutLine className="h-3 w-3 md:w-4 md:h-4 text-yellow-900" />
    );
  }
  return (
    <div className="flex gap-4 flex-col">
      <div className="w-full h-52 sm:h-64 md:h-[500px] relative">
        <Image className="rounded-md" src={profile.cover} layout="fill" />
      </div>
      <div className="flex justify-between items-center py-2">
        {/* top-left */}
        <div className="flex  gap-4">
          <div className=" h-14 w-14 md:w-16 md:h-16   relative ">
            <Image className="rounded-full" src={profile.image} layout="fill" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-title dark:text-title-dark font-bold text-base sm:text-xl md:text-2xl capitalize">
              {profile.name}
            </h2>
            <div className="flex gap-1 items-center">
              <span className="font-bold text-title dark:text-title-dark  text-sm  md:text-md">
                {profile.rating}
              </span>
              <div className="flex  items-center">{stars}</div>
            </div>
          </div>
        </div>
        {/* top-right */}
        <div className=" flex gap-4 items-center">
          {profile.owner && (
            <Link href="/profile/edit">
              <Button className=" py-2 px-4 md:!px-6 md:!py-2.5   hover:!bg-primary hover:!text-white   !bg-bg dark:!bg-bg-dark  !text-primary ">
                <PencilSquareIcon className="w-6 h-6" />
              </Button>
            </Link>
          )}
          {!profile.owner && (
            <Button className=" px-3 !py-2 md:!py-3.5 md:px-6 ">follow</Button>
          )}
          {!profile.owner && <CompanyWriteAReview companySlug={profile.slug} />}
        </div>
      </div>
    </div>
  );
};

export default CompanyTopInfos;

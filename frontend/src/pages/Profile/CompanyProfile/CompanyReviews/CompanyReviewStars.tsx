import { StarIcon } from "@heroicons/react/24/solid";
import { Select, Option } from "@material-tailwind/react";
import React, { FormEvent } from "react";

const CompanyReviewStars = ({
  setValue,
  value,
}: {
  setValue: (value: string) => void;
  value: number;
}) => {
  const handlerChange = (value: any) => {
    setValue(value);
  };
  return (
    <Select defaultValue={value.toString()} onChange={handlerChange}>
      <Option value={"1"}>
        <StarsGenerator count={1} />
      </Option>
      <Option value="2">
        <StarsGenerator count={2} />
      </Option>
      <Option value="3">
        <StarsGenerator count={3} />
      </Option>
      <Option value="4">
        <StarsGenerator count={4} />
      </Option>
      <Option value="5">
        <StarsGenerator count={5} />
      </Option>
    </Select>
  );
};
const StarsGenerator = ({ count }: { count: number }) => {
  let stars = [];
  for (let i = 1; i <= count; i++)
    stars.push(<StarIcon className="w-3 h-3 text-yellow-900" />);
  return <div className="flex gap-2">{stars}</div>;
};

export default CompanyReviewStars;

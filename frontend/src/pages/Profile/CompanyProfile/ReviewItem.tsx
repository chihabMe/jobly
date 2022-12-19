import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";
const review = {
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit minus similique, fuga provident nulla beatae esse, perferendis et ea cumque velit dolore sint ratione aperiam. Libero in voluptate doloribus porro.",
  rating: 3,
  username: "chihab",
  date: new Date(),
};
const ReviewItem = () => {
  const stars = [];
  for (let i = 1; i < review.rating; i++) {
    stars.push(<StarIcon className="w-4 h-4 text-yellow-900" />);
  }
  return (
    <div className="shadow-md">
      {/* top */}
      <div className="flex flex-col">
        <h2>{review.username}</h2>
        <div className="flex  items-center">{stars}</div>
        <p>{review.body}</p>
      </div>
    </div>
  );
};

export default ReviewItem;

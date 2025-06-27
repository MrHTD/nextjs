import React from "react";
import { AiFillStar } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

interface RatingProps {
  value: number;
  maxStars?: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ value, maxStars = 5, className }) => {
  return (
    <div className="flex">
      {[...Array(maxStars)].map((x, index) => (
        <AiFillStar
          key={index}
          className={twMerge(
            "w-6 h-6",
            index < value ? "text-yellow-500" : "text-gray-400",
            className
          )}
        />
      ))}
    </div>
  );
};

export default Rating;

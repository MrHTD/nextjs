"use client";
import React, { useState, useRef, useEffect } from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";
import Rating from "../Rating";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { LiaThumbtackSolid } from "react-icons/lia";
import { PiMessengerLogo } from "react-icons/pi";
import { BsTrash } from "react-icons/bs";

export default function ReviewsSection({ reviews }: any) {
  const [visiblePopoverIndex, setVisiblePopoverIndex] = useState<number | null>(
    null
  );
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  

  const togglePopover = (index: number) => {
    setVisiblePopoverIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  console.log("REviews", reviews);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setVisiblePopoverIndex(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {reviews?.map((review: any, index: any) => (
        <ul key={index} className="mb-14">
          <li>
            <div className="flex justify-between">
              <div
                className="rounded-full flex-row items-center gap-4 w-full sm:w-auto inline-flex"
                style={{ maxWidth: "100%", height: "auto" }}
              >
                <BaseImage
                  src="/assets/images/sellerimg.png"
                  height={40}
                  width={40}
                  alt="Profile-Pic"
                  className="rounded-full object-cover"
                />
                <Heading level={5}>{review.user_name}</Heading>
              </div>
              <span>
                <button
                  ref={buttonRef}
                  onClick={() => togglePopover(index)}
                  className="relative"
                >
                  <IoEllipsisHorizontalOutline />
                </button>
                {visiblePopoverIndex === index && (
                  <div
                    ref={popoverRef}
                    className="absolute right-4 transform -translate-x-1/2 rounded-md bg-[#FCFCFC] shadow-lg border border-gray-200"
                  >
                    <span className="flex items-center border-b border-b-[#E1E1E1] hover:bg-gray-100 cursor-pointer p-2">
                      <LiaThumbtackSolid className="mr-2" /> Pin
                    </span>
                    <span className="flex items-center border-b border-b-[#E1E1E1] hover:bg-gray-100 cursor-pointer p-2">
                      <PiMessengerLogo className="mr-2" /> Reply
                    </span>
                    <span className="flex items-center hover:bg-gray-100 cursor-pointer p-2">
                      <BsTrash className="mr-2" /> Remove
                    </span>
                  </div>
                )}
              </span>
            </div>
          </li>
          <li className="flex justify-between ml-11">
            <Rating className="mt-1" value={review.rating} />
            <p className="text-sm text-paracolor">{review.timeStamp}</p>
          </li>
          <li className="ml-11 mt-2">
            <p className="text-textsecondary">{review.comment}</p>
          </li>
          {review.media && review.media.length > 0 && (
            <span className="inline-flex ml-11 mt-2">
              {review.media.map((image: any, idx: any) => (
                <div
                  key={idx}
                  className="rounded-md border border-gray-300 w-20 h-20 overflow-hidden relative cursor-pointer mx-2"
                >
                  <BaseImage
                    src={image?.url}
                    alt={`Reviewed Customer Pictures`}
                    width={96}
                    height={96}
                    className="rounded-md"
                  />
                </div>
              ))}
            </span>
          )}
          <hr className="mt-4" />
        </ul>
      ))}
    </div>
  );
}

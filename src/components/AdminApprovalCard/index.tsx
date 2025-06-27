import React from "react";
import BaseImage from "../Base/BaseImage";
import Heading from "../Base/Heading";
import { twMerge } from "tailwind-merge";
import { ApprovalData } from "@/constants/Data";

export default function AdminApprovalCard() {
  return (
    <div>
      {ApprovalData.map((data, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b py-3 last:border-none"
        >
          <div className="flex items-center">
            <BaseImage
              src={data.imagesrc}
              alt={data.name}
              width={40}
              height={40}
              className={twMerge(
                "rounded-full",
                typeof data.imagesrc === "string"
                  ? "w-10 h-10 rounded-full mr-4"
                  : "rounded-full mr-4"
              )}
            />
            <div>
              <Heading level={4}>{data.name}</Heading>
              <Heading
                level={6}
                className="text-sm text-gray-500"
              >{`Registered ${data.registered}`}</Heading>
            </div>
          </div>
          <BaseImage src='/assets/images/eye.png' alt="eye" width={21} height={21}/>
        </div>
      ))}
    </div>
  );
}

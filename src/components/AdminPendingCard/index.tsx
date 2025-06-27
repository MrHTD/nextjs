import React from "react";
import { PendingData } from "@/constants/Data";
import { twMerge } from "tailwind-merge";
import BaseImage from "../Base/BaseImage";

export default function AdminApprovalCard() {
  return (
    <div>
      {PendingData.map((data, index) => (
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
              <h3 className="font-medium text-gray-800">{data.name}</h3>
              <p className="text-sm text-gray-500">
                Registered {data.registered}
              </p>
            </div>
          </div>
          <BaseImage src='/assets/images/eye.png' alt="eye" width={21} height={21} />
        </div>
      ))}
    </div>
  );
}

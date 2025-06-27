import React from "react";
import BaseImage from "../Base/BaseImage";
import Heading from "../Base/Heading";
import { twMerge } from "tailwind-merge";
import { AdminApealsData } from "@/constants/Data";

export default function AdminAffiliateApealsuser() {
  return (
    <div>
      {AdminApealsData.map((data, index) => (
        <div key={index} className="flex items-center py-2 last:border-none">
          <div className="flex items-center w-full bg-white shadow-sm space-y-4 pt-4 pb-4 rounded-md">
            <div className="flex items-center mr-3 bg-primary rounded-full mt-2 p-2 ml-4">
              <BaseImage
                src={data.imagesrc}
                alt={"Affiliate Users"}
                width={32}
                height={32}
                className={twMerge(
                  "rounded-full",
                  typeof data.imagesrc === "string"
                    ? "w-10 h-10 rounded-full"
                    : "rounded-full"
                )}
              />
            </div>
            <div className="flex top-0">
              <Heading level={3} className="font-medium text-textsecondary">
                {data.apealUser}
              </Heading>
              <Heading level={3} className="font-normal text-textsecondary">
                {data.apealDesc}
              </Heading>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

import React from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";

interface AdminHeaderProps {
  pageName?: string;
}

export default function AdminHeader({ pageName = "" }: AdminHeaderProps) {
  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="mb-4 sm:mb-0">
          <Heading
            level={1}
            className="text-textsecondary mb-2 pt-12 sm:pt-0 lg:pt-0"
          >
            Admin Dashboard
          </Heading>
          <Heading level={6} className="text-textsecondary text-[#BBBBBB]">
            {pageName}
          </Heading>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-[#C3C3C3] font-normal text-sm sm:text-base">
            Logged in as{" "}
            <span className="font-bold text-textsecondary">Maaz</span>
          </p>
          <BaseImage
            src="/assets/images/profileimage.png"
            alt="Admin Image"
            width={50}
            height={50}
            className="rounded-full border-4 border-green-700"
          />
        </div>
      </div>
    </div>
  );
}

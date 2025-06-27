import React from "react";
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import Link from "next/link";
import { ManageVendorData } from "@/constants/Data";
import BaseImage from "../Base/BaseImage";

const ManageVendorPage = () => {
  return (
    <div className="flex-grow">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {ManageVendorData.map((item, index) => (
          <Link href="/admin/vendor-detail" key={index}>
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-6 flex flex-col items-center"
            >
              <BaseImage
                src={item.imagesrc}
                alt="Company Logo"
                className="object-cover"
                width={100}
                height={100}
              />
              <div className="text-center">
                <Heading level={3} className="text-textsecondary mt-4">
                  {item.storeName}
                </Heading>
                <p className="text-black mt-1">{item.vendorName}</p>
                <p className="text-[#ACACAC] text-sm">
                  Category: {item.Category}
                </p>
              </div>
              <div className="flex justify-between mt-6 w-full">
                <Button title="Approve" className="w-full" isPrimary />
                <Button
                  title="Reject"
                  className="bg-[#FF5228] w-full border-none"
                  isPrimary
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManageVendorPage;

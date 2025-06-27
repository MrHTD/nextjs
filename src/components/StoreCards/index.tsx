import React from "react";
import BaseImage from "../Base/BaseImage";
import Heading from "../Base/Heading";
import Button from "../Base/Button";

export default function StoreCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 mt-10 md:mt-0 bg-gray-50">
      <div className="col-span-12 md:col-span-6 bg-white border border-inputborder rounded-md p-4 overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)] gap-4 items-center sm:items-start p-4 rounded-lg">
          <BaseImage
            src="/assets/images/allapps.png"
            height={132}
            width={132}
            alt="Profile-Pic"
            className="rounded-full object-cover"
          />
          <div className="flex flex-col items-start">
            <Heading level={2} className="text-textsecondary">
              Emmy Shoes
            </Heading>
            <label className="text-sm text-[#9D9D9D] font-normal truncate whitespace-pre-wrap">
              https://www.emmyshoes.com
            </label>
          </div>
        </div>
        <div className="inline-flex">
          <Button
            title="Copy Link"
            secondaryVariant="darkdefault"
          />
          <Button title="Share Now" isPrimary primaryVariant="dark" />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary rounded-md relative p-4 min-h-[250px] overflow-hidden flex flex-col justify-between">
          <BaseImage
            alt="left-image"
            src="/assets/images/appsLogo.png"
            width={170}
            height={173}
            className="absolute bottom-0 right-0 object-cover"
          />
          <div className="relative z-10">
            <div className="mb-2">
              <Heading level={2} className="text-white font-light truncate">
                No of orders
              </Heading>
            </div>
            <div>
              <Heading level={2} className="text-white truncate">
                3000
              </Heading>
            </div>
            <div className="mt-24">
              <Heading level={6} className="text-white underline truncate">
                View More
              </Heading>
            </div>
          </div>
        </div>
        <div className="bg-primary rounded-md relative p-4 min-h-[250px] overflow-hidden flex flex-col justify-between">
          <BaseImage
            alt="left-image"
            src="/assets/images/appsLogo.png"
            width={170}
            height={173}
            className="absolute bottom-0 right-0 object-cover"
          />
          <div className="relative z-10">
            <div className="mb-2">
              <Heading level={2} className="text-white font-light truncate">
                Website Visits
              </Heading>
            </div>
            <div>
              <Heading level={2} className="text-white truncate">
                543
              </Heading>
            </div>
            <div className="mt-24">
              <Heading level={6} className="text-white underline truncate">
                View More
              </Heading>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

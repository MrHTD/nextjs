import React from "react";
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import Rating from "../Rating";
import BaseImage from "../Base/BaseImage";

export default function SellerInfo(props: {
  hideHeading?: boolean;
  store?: any;
}) {
  const { hideHeading, store } = props;
  return (
    <div className="mx-auto max-w-[65rem] mt-10 px-4 sm:px-6">
      {hideHeading ? null : (
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
          <div
            className="rounded-full flex items-center gap-4 w-full sm:w-auto"
            style={{ maxWidth: "100%", height: "auto" }}
          >
            <BaseImage
              src={store?.profile_image}
              height={50}
              width={50}
              alt="Profile-Pic"
              className="rounded-full object-cover h-[80px] w-[80px]"
            />
            <div className="flex flex-col items-start">
              <Heading level={2}>{store?.name}</Heading>
              <label className="whitespace-nowrap">1 Follower</label>
              <Rating className="mt-1" value={4} />
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start gap-2 w-full sm:w-auto mt-4 sm:mt-0">
            <Button title="Follow" isPrimary className="w-full sm:w-32" />
            <Button title="Share Store" className="w-full sm:w-32" />
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full p-6 mt-12">
        <div className="col-span-1 space-y-6">
          <Heading level={3}>Shop categories:</Heading>
          <div className="inline-flex gap-2">
            <p className="border border-solid p-2 text-xs rounded-full border-[#ACACAC] text-[#ACACAC]">
              Arabian
            </p>
            <p className="border border-solid p-2 text-xs rounded-full border-[#ACACAC] text-[#ACACAC]">
              Essential Oil
            </p>
            <p className="border border-solid p-2 text-xs rounded-full border-[#ACACAC] text-[#ACACAC]">
              Oil
            </p>
          </div>
          <Heading level={3}>Shop Description:</Heading>
          <p className="text-[#ACACAC]">{store?.description}</p>
          <Heading level={3}>Store Address:</Heading>
          <p className="text-[#ACACAC]">house 56 Apo garki Abuja</p>
          <Heading level={3}>Email:</Heading>
          <p className="text-[#ACACAC]">adekimberly123@gmail.com</p>
          <Heading level={3}>Phone Number:</Heading>
          <p className="text-[#ACACAC]">+2347060662787</p>
          <Heading level={3}>WhatsApp Number:</Heading>
          <p className="text-[#ACACAC]">+2347060662787</p>
        </div>
        <div className="col-span-1 space-y-6">
          <Heading level={3}>Opening Hours:</Heading>
          <div className="mt-4">
            <span className="inline-flex gap-2 ">
              <label className="text-sm">Monday:</label>
              <p className="text-sm text-[#ACACAC]">09:00 A.M. - 07:00 P.M.</p>
            </span>
            <br />
            <span className="inline-flex gap-2 ">
              <label className="text-sm">Tuesday:</label>
              <p className="text-sm text-[#ACACAC]">09:00 A.M. - 07:00 P.M.</p>
            </span>
            <br />
            <span className="inline-flex gap-2 ">
              <label className="text-sm">Wednesday:</label>
              <p className="text-sm text-[#ACACAC]">09:00 A.M. - 07:00 P.M.</p>
            </span>
            <br />
            <span className="inline-flex gap-2 ">
              <label className="text-sm">Thursday:</label>
              <p className="text-sm text-[#ACACAC]">09:00 A.M. - 07:00 P.M.</p>
            </span>
            <br />
            <span className="inline-flex gap-2 ">
              <label className="text-sm">Friday:</label>
              <p className="text-sm text-[#ACACAC]">09:00 A.M. - 07:00 P.M.</p>
            </span>
            <br />
            <span className="inline-flex gap-2 ">
              <label className="text-sm">Saturday:</label>
              <p className="text-sm text-[#ACACAC]">09:00 A.M. - 07:00 P.M.</p>
            </span>
            <br />
            <span className="inline-flex gap-2 ">
              <label className="text-sm">Sunday:</label>
              <p className="text-sm text-[#ACACAC]">09:00 A.M. - 07:00 P.M.</p>
            </span>
            <br />
          </div>
          <Heading level={3}>Pick Up Locations:</Heading>
          <p className="text-[#ACACAC]">Riyadh, Saudi Arabia</p>
          <Heading level={3}>Default Delivery Locations:</Heading>
          <p className="text-[#ACACAC]">
            Vendor is yet to set delivery location
          </p>
        </div>
      </div>
    </div>
  );
}

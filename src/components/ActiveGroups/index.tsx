"use client";
import React from "react";
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import BaseImage from "../Base/BaseImage";

export default function EmptyGroupComponent() {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-gray-800 p-11">
      <div className="mb-4">
        <BaseImage
          src="/assets/images/activegroup.png"
          alt="Empty Box"
          width={200}
          height={200}
        />
      </div>
      <Heading level={5}>There is no active buying group for this item</Heading>
      <p className="text-paracolor mb-6">Start a group for this item</p>
      <Button
        className="px-6 py-2 text-green-600 border border-green-600 rounded-md hover:bg-green-100"
        title="Start Group"
      />
    </div>
  );
}

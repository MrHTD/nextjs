"use client";
import React from "react";
import Input from "../Base/Input";
import CalendarInput from "../CalendarInput";
import Button from "../Base/Button";

export default function VendorAffiliateDealForm() {
  return (
    <div className="bg-white p-4 rounded-md space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Deal Name" labelClassName="text-textsecondary" />
        <Input
          label="Profit Per Sale"
          type="identifier"
          placeholder="$"
          labelClassName="text-textsecondary"
        />
        <CalendarInput
          label="Start Date"
          labelClassName="text-textsecondary"
          className="w-full"
        />
        <CalendarInput
          label="End Date"
          labelClassName="text-textsecondary"
          className="w-full"
        />
        <Input
          label="Actual Price"
          type="identifier"
          placeholder="$"
          labelClassName="text-textsecondary"
        />
        <Input
          label="Discount Price"
          type="identifier"
          placeholder="$"
          labelClassName="text-textsecondary"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-end">
        <Button title="Copy Link" secondaryVariant="darkdefault" />
        <Button title="Share Link" secondaryVariant="darkdefault" />
        <Button title="Add Product" isPrimary />
      </div>
    </div>
  );
}

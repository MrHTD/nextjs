"use client";
import React, { use, useEffect, useState } from "react";
import Input from "../Base/Input";
import { Option } from "@/constants/Types";
import Button from "../Base/Button";
import { useSelector } from "react-redux";
import { BackButton } from "@/utility/static";
import AutoCompleteDropdown from "../Base/AutoCompleteDropdown";

const options = [
  { label: "Pakistan", value: "Pakistan" },
  { label: "Usa", value: "Usa" },
  { label: "UK", value: "UK" },
];
const stateoptions = [
  { label: "Sindh", value: "Sindh" },
  { label: "Punjab", value: "Punjab" },
  { label: "Kpk", value: "Kpk" },
];

interface Props {
  getShippingData?: (data: Record<string, string | boolean>) => void;
}

export default function CheckoutLeft({ getShippingData }: Props) {
  const user = useSelector((state: any) => state.user.user);

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [selectedstateOption, setSelectedstateOption] = useState<Option | null>(
    null
  );
  const [inp, setInp] = useState<Record<string, string | boolean> | null>(null);

  const handleContinue = () => {
    const payload = {
      email: inp?.email || "",
      name: inp?.name || "",
      last_name: inp?.last_name || "",
      company: inp?.company || "",
      address: inp?.address || "",
      apartment: inp?.apartment || "",
      city: inp?.city || "",
      region: selectedOption?.value || "",
      state: selectedstateOption?.value || "",
      zip: inp?.zip || "",
      phone: inp?.phone || "",
      news_letter: inp?.news_letter || false,
    };
    if (getShippingData) getShippingData(payload);
  };

  const handleInput = (e: any) => {
    setInp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  useEffect(() => {
    setInp((prev) => ({ ...prev, email: user?.email, name: user?.name }));
  }, [user]);
  return (
    <div className="p-8 max-w-lg mx-auto">
      <div className="flex items-center space-x-2 text-gray-600 cursor-pointer mb-4">
        <BackButton className="text-textcolor">
          <span>&larr;</span>
          Back
        </BackButton>
      </div>
      <div className="text-sm text-gray-500 mb-4">
        <a href="/cart" className="text-textcolor hover:underline">
          Cart
        </a>
        <span className="mx-1">&gt;</span>
        <a href="/information" className="text-textcolor hover:underline">
          Information
        </a>
        <span className="mx-1">&gt;</span>
        <a href="/shipping" className="text-textcolor hover:underline">
          Shipping
        </a>
        <span className="mx-1">&gt;</span>
        <a href="/payment" className="text-textcolor hover:underline">
          Payment
        </a>
      </div>
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-2 text-center text-sm font-semibold text-gray-700">
            Express checkout
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <div className="flex justify-between space-x-2">
          <button className="flex-grow h-12 bg-purple-500 rounded-md"></button>
          <button className="flex-grow h-12 bg-yellow-500 rounded-md"></button>
          <button className="flex-grow h-12 bg-green-900 rounded-md"></button>
        </div>
      </div>
      <div className="flex items-center justify-center mb-8 mt-8">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="px-2 text-center text-sm font-medium text-black">
          OR
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-base font-medium text-textsecondary">
            Contact information
          </label>
          <a href="#" className="text-sm text-textcolor font-normal">
            Already have an account?{" "}
            <span className="text-textsecondary">Log in</span>
          </a>
        </div>
        <Input
          value={user?.email}
          type="email"
          name="email"
          onChange={handleInput}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-2 text-gray-700"
        />
        <div className="flex items-center text-black">
          <input
            name="news_letter"
            onChange={handleInput}
            type="checkbox"
            className="mr-2 p-3 text-black"
          />
          <label className="text-sm text-text">
            Email me with news and offers
          </label>
        </div>
      </div>
      <div className="space-y-3">
        <label className="text-base font-medium text-textsecondary mb-2 block mt-8">
          Shipping address
        </label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Input
            type="text"
            name="name"
            onChange={handleInput}
            placeholder="First name"
            value={user.name}
            className="w-full p-3 border rounded"
          />
          <Input
            type="text"
            name="last_name"
            onChange={handleInput}
            placeholder="Last name"
            className="w-full p-3 border rounded"
          />
        </div>
        <Input
          type="text"
          name="company"
          onChange={handleInput}
          placeholder="Company (required for business addresses)"
          className="w-full p-3 border rounded"
        />
        <Input
          type="address"
          name="address"
          onChange={handleInput}
          placeholder="Address"
          className="w-full p-3 border rounded"
        />
        <Input
          type="address"
          name="apartment"
          onChange={handleInput}
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full p-3 border rounded"
        />
        <Input
          type="address"
          name="city"
          onChange={handleInput}
          placeholder="City"
          className="w-full p-3 border rounded"
        />
        <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
          <AutoCompleteDropdown
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            placeholder="Select region"
          />
          <AutoCompleteDropdown
            options={stateoptions}
            selectedOption={selectedstateOption}
            setSelectedOption={setSelectedstateOption}
            placeholder="Select state"
          />
          <Input
            name="zip"
            type="digit"
            onChange={handleInput}
            placeholder="Zip code"
            className="w-full p-3 border rounded"
          />
        </div>
        <Input
          name="phone"
          type="digit"
          onChange={handleInput}
          placeholder="Phone (optional)"
          className="w-full p-3 border rounded mb-4"
        />
      </div>
      <Button
        onClick={handleContinue}
        title="Continue To shipping"
        className="w-full  hover:bg-green-700"
        isPrimary
      />
    </div>
  );
}

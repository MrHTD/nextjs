"use client";
import React, { useState } from "react";
import Button from "@/components/Base/Button";
import Heading from "@/components/Base/Heading";
import Input from "@/components/Base/Input";
import CountryDropdown from "@/components/Countrydropdown";
import { Country } from "@/constants/Types";
import { useAppContext } from "@/initialize";

const countryData = [
  { name: "Pakistan", code: "92", flag: '/assets/icons/countryflags/pak.png' },
  { name: "United States", code: "1", flag: '/assets/icons/countryflags/usa.png' },
  { name: "United Kingdom", code: "44", flag: '/assets/icons/countryflags/brit.png' },
];


interface SignupRightFormProps {
  SignupHandler?: (e: any) => void;
  cancelLink?: string;
}

function SignupRightForm({ SignupHandler }: SignupRightFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const { goBack } = useAppContext()

  const [inputVal, setInputVal] = useState({
    name: "",
    email: "",
    phone: "",
    country_code: "",
    password: "",
    confirm_password: "",
  });


  const Clickhandler = () => {
    if (SignupHandler) {
      SignupHandler({
        name: inputVal.name,
        email: inputVal.email,
        country_code: selectedCountry?.code,
        phone: inputVal.phone,
        password: inputVal.password,
        confirm_password: inputVal.confirm_password,
      })
    }
  }
  const getInput = (name: string, e: any) => {
    setInputVal((prev) => ({ ...prev, [name]: e.target.value }));
  }

  return (
    <div className="w-full">
      <Heading level={1} className="font-semibold mb-6">
        Signup
      </Heading>
      <div className="w-full space-y-4">
        <div className="text-start">
          <Heading level={6}>Name</Heading>
          <Input type="text"
            onChange={(e) => getInput("name", e)}
            className="w-full mt-2" />
        </div>
        <div className="text-start">
          <Heading level={6}>Email</Heading>
          <Input type="email"
            onChange={(e) => getInput("email", e)}
            className="w-full mt-2" />
        </div>
        <div className="text-start">
          <Heading level={6}>Phone Number</Heading>
          <CountryDropdown
            onInput={(e) => getInput("phone", e)}
            countryList={countryData}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            className="w-full mt-2"
          />
        </div>
        <div className="text-start">
          <Heading level={6}>Password</Heading>
          <Input type="password"
            onChange={(e) => getInput("password", e)}
            className="w-full mt-2" />
        </div>
        <div className="text-start">
          <Heading level={6}>Confirm Password</Heading>
          <Input type="password"
            onChange={(e) => getInput("confirm_password", e)}
            className="w-full mt-2" />
        </div>
      </div>
      <div className="flex gap-4 w-full mt-6">
        {/* <Link href={} > */}
        <Button title="Cancel" isPrimary={false} className="w-full" onClick={goBack} />
        {/* </Link> */}
        <Button title="Create" isPrimary={true} className="w-full" onClick={Clickhandler} />
      </div>
      {/* <div className="flex gap-4 w-full mt-6">
        <Button title="Cancel" isPrimary={false} className="w-full" onClick={() => window.location.href = cancelLink} />
        <Button title="Create" isPrimary={true} className="w-full" onClick={() => window.location.href = createLink} />
      </div> */}
    </div>
  );
}

export default SignupRightForm;

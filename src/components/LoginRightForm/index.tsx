"use client";
import React, { useState } from "react";
import Button from "@/components/Base/Button";
import Heading from "@/components/Base/Heading";
import Input from "@/components/Base/Input";
import Container from "../Base/Container";
import CountryDropdown from "@/components/Countrydropdown";
import Link from "next/link";
import { Country } from "@/constants/Types";
interface LoginProps {
  title?: string;
  signuplink?: string;
  loginlink?: string;
  LoginHandler?: (e: any) => void;
}
const countryData = [
  { name: "Pakistan", code: "92", flag: '/assets/icons/countryflags/pak.png' },
  { name: "United States", code: "1", flag: '/assets/icons/countryflags/usa.png' },
  { name: "United Kingdom", code: "44", flag: '/assets/icons/countryflags/brit.png' },
];

export default function LoginRightForm(prop: LoginProps) {
  const { title = "LOGIN AS BUYER",  signuplink = "/signup", LoginHandler } = prop;
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [inputVal, setInputVal] = useState({
    identifier: "",
    password: "",
  });


  const Clickhandler = () => {
    if (LoginHandler) {
      LoginHandler({
        identifier: inputVal.identifier,
        password: inputVal.password,
      })
    }
  }
  const getInput = (name: string, e: any) => {
    setInputVal((prev) => ({ ...prev, [name]: e.target.value }));
  }

  return (
    <Container>
      <Heading level={1} className="text-start font-semibold mb-6">
        {title}
      </Heading>
      <div className="w-full space-y-4">
        <div className="text-start">
          <Heading level={6}>Enter Phone Number or Email</Heading>
          <Input type="identifier" placeholder="Email or Phone number" className="w-full mt-2" onChange={(e) => getInput("identifier", e)} />
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">*For phone numbers, please include your country code (e.g., +971 for UAE)</p>
        </div>
        <div className="text-start">
          <Heading level={6}>Password</Heading>
          <Input type="password" className="w-full mt-2" onChange={(e) => getInput("password", e)} />
          <p className="text-sm text-right mt-2">Forgot Password?</p>
        </div>
      </div>
      <div className="flex gap-4 w-full mt-6">
        <span className="w-full">
          <Link href={signuplink}>
            <Button title="Signup" isPrimary={false} className="w-full" />
          </Link>
        </span>
        <span className="w-full">
            <Button title="Login" isPrimary className="w-full" onClick={Clickhandler} />
        </span>
      </div>
      <p className="text-xs text-center mt-8">
        By continuing, you agree to OURS Terms of Service and confirm that you
        have read OURS Privacy Policy
      </p>
    </Container>
  );
}

import React from "react";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import BaseImage from "../BaseImage";

export default function Footer() {
  return (
    <div className="bg-footerbg">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-5 border-b-2 border-primary">
          <div className="col-span-1 pl-4">
            <BaseImage
              src="/assets/images/ftrlogo.png"
              alt="Footer Logo"
              width={150}
              height={120}
            />
            <Heading level={5} className="text-white mt-8 text-base">
              Address:
            </Heading>
            <ul className="text-white text-sm font-light leading-6">
              <li>
                3500 South Dupont Highway, City of Dover, County of Kent,
                Delaware 19901. USA
              </li>
              <li>
                Suite 2006/7, GA 247 Plaza Plot 246, Ahmadu Bello Way Opp.
                Regent Academy Mabushi Abuja. Nigeria
              </li>
            </ul>

            <Heading level={5} className="text-white mt-8">
              Contact:
            </Heading>
            <ul className="text-white text-sm font-light leading-6">
              <li>+2348142533870</li>
              <li>info@getkamel.com</li>
            </ul>
            <div className="mt-8 flex gap-4">
              <FaLinkedinIn size={24} className="text-primary" />
              <FiTwitter size={24} className="text-primary" />
              <FaInstagram size={24} className="text-primary" />
              <FaFacebookF size={24} className="text-primary" />
            </div>
          </div>

          <div className="col-span-1 flex flex-col space-y-3 mt-10">
            <Heading level={5} className="text-white text-2xl">
              Company
            </Heading>
            <ul className="text-white text-base font-light leading-8">
              <li className="hover:underline hover:underline-offset-2">About</li>
              <li className="hover:underline hover:underline-offset-2">Sell on Mawrid</li>
              <li className="hover:underline hover:underline-offset-2">Privacy Policy</li>
              <li className="hover:underline hover:underline-offset-2">Ambassador Program</li>
              <li className="hover:underline hover:underline-offset-2">Help Centre</li>
            </ul>
          </div>

          <div className="col-span-1 space-y-4">
            <Heading level={3} className="text-primary mt-10 text-2xl">
              Download the Logo App
            </Heading>
            <BaseImage
              src="/assets/images/googleStore.png"
              alt="Footer Logo"
              width={150}
              height={120}
            />
            <BaseImage
              src="/assets/images/appStore.png"
              alt="Footer Logo"
              width={150}
              height={120}
            />
          </div>
        </div>
        <div className="py-7">
          <Heading level={5} className="text-white text-center">
            www.mawrid.com
          </Heading>
        </div>
      </Container>
    </div>
  );
}

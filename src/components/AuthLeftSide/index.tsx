import React from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";
import Image from "next/image";
import Logo from "/public/assets/images/top.png";
import bottomImg from "/public/assets/images/bottom.png";


export default function AuthLeftSide() {
  return (
    <>
      <Image
        src={Logo}
        alt="Logo Background"
        className="absolute top-10 hidden lg:flex"
        width={220}
        height={90}
      />
      <BaseImage
        src={bottomImg}
        alt="Logo Background"
        className="hidden md:flex absolute justify-center bottom-0 opacity-40"
        width={575}
        height={500}
      />
      <BaseImage
        src={bottomImg}
        alt="Logo Background"
        className="flex md:hidden absolute justify-center bottom-0 opacity-40"
        width={100}
        height={150}
      />
      <div className="relative z-10 text-white text-center md:mt-[-12rem] ">
        <Heading level={1} className="font-light ">
          Selling Made
        </Heading>
        <Heading level={1} className="">
          Easy with Marwid
        </Heading>
      </div>
    </>
  );
}

import React from "react";
import { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";
import BaseImage from "../BaseImage";

interface Props {
  title?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isPrimary?: boolean;
  primaryVariant?: "light" | "dark"; // Primary variants (light or dark)
  secondaryVariant?: "lightdefault" | "darkdefault"; // Secondary variants (default or variant2)
  prefixIcon?: string | StaticImageData;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  title,
  onClick,
  className,
  children,
  isPrimary,
  primaryVariant = "light",
  secondaryVariant = "lightdefault",
  prefixIcon,
  type = "submit",
}: Props) {
  return (
    <button
      type={type}
      className={twMerge(
        "font-medium flex justify-center items-center rounded-full h-fit text-sm px-5 py-3 me-2 mb-2 cursor-pointer",
        isPrimary
          ? primaryVariant === "dark"
            ? "text-white bg-textsecondary border border-solid border-textsecondary hover:bg-[#42793a]"
            : "text-white bg-primary border border-solid border-primary hover:bg-[#5DBC6E]"
          : secondaryVariant === "darkdefault"
          ? "border border-solid bg-white border-inputborder text-textsecondary hover:bg-textsecondary hover:text-white"
          : "text-primary bg-white hover:bg-[#5DBC6E] border border-solid border-primary hover:text-white",
        className
      )}
      onClick={onClick}
    >
      {prefixIcon && (
        <BaseImage
          src={prefixIcon}
          alt="icon"
          width={20}
          height={20}
          className="mr-2"
        />
      )}
      {title || children}
    </button>
  );
}

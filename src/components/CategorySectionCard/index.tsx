import React, { ReactNode } from "react";
import { StaticImageData } from "next/image";
import BaseImage from "../Base/BaseImage";
interface Prop {
  imagesrc?: string | StaticImageData;
  icon?: ReactNode;
  cardlabel: string;
}

export default function CategroySectionCard(prop: Prop) {
  const { imagesrc, cardlabel, icon } = prop;
  return (
    <div className="text-center flex-shrink-0">
      <div className="rounded-full p-8 bg-white cursor-pointer mb-2">
        {imagesrc ? (
          <BaseImage src={imagesrc as string | StaticImageData} alt={cardlabel} width={40} height={40} />
        ) : (
          icon
        )}
      </div>
      <label>{cardlabel}</label>
    </div>
  ); 
}

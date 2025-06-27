import { Divider } from "@mui/material";
import React from "react";
import Paragraph from "../Paragraph";
import BaseImage from "../Base/BaseImage";
import Heading from "../Base/Heading";

function ToReleaseOrderMobileCards({ data }: { data: any }) {
  console.log("data sai nhi hai", data);
  return (
    <div className="border w-full flex rounded-md gap-3 p-2 justify-between h-15  mb-3">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-row items-center gap-1 w-full">
          <div className="w-[70px] h-[80px] flex-shrink-0">
            <BaseImage
              src={
                !data?.product?.product_images ||
                data?.product?.product_images == ""
                  ? "https://upload.devxonic.com/80x80"
                  : data?.product?.product_images
              }
              width={120}
              height={120}
              alt="order"
              className="object-contain w-[120px] h-[80px]"
            />
          </div>
          <div className="flex flex-col w-full">
            <Paragraph size={10} className="text-textsecondary text-xs">
              {data?.product?.name}
            </Paragraph>
            <div className="grid grid-cols-3 border-t border-gray-300 py-2 mt-2">
              <div className="col-span-1">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] text-textsecondary">Quantity</p>
                  <Paragraph size={10} className="text-[11px] text-center mr-3">{data?.quantity}</Paragraph>
                </div>
              </div>
              <div className="col-span-1">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px]  text-textsecondary">Amount</p>
                  <Paragraph size={10} className="text-[11px] text-center mr-5">{data?.amount}</Paragraph>
                </div>
              </div>
              <div className="col-span-1 w-full">
                <div className="flex justify-end">
                  <div className="flex items-center rounded-full text-center justify-center w-20 p-1 bg-primary">
                    <Paragraph
                      size={10}
                      className="name text-[11px] text-white rounded-full"
                    >
                      {data?.status}
                    </Paragraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToReleaseOrderMobileCards;

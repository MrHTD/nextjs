import { Divider } from "@mui/material";
import React from "react";
import Paragraph from "../Paragraph";
import BaseImage from "../Base/BaseImage";

function OrderCardsMobile({ data, Btn }: { data: any; Btn: any }) {
  console.log("data sai nhi hai", data);
  return (
    <div className="border w-full flex rounded-md gap-3 p-2 justify-between h-15">
      <div className="flex flex-row gap-3">
        <div className="flex flex-row gap-5 justify-center items-center">
          <div className="w-[70px] h-[80px] flex-shrink-0">
            <BaseImage
              src={
                !data?.product?.image || data?.product?.image == ""
                  ? "https://upload.devxonic.com/80x80"
                  : data?.product?.image
              }
              width={100}
              height={100}
              alt="order"
              className="object-contain w-[120px] h-[80px]"
            />
          </div>
        </div>
        {/* <Divider orientation="vertical" flexItem style={{ marginTop: 6, marginBottom: 6 }} /> */}
        <div className="">
          <Paragraph size={10} className="name text-[14px]">
            {data?.product?.name}
          </Paragraph>
          <Paragraph size={9} className="price text-[18px] text-primary">
            {data?.pricing} $
          </Paragraph>
          <Paragraph
            size={11}
            className="customer-name text-[12px] text-textsecondary"
          >
            {data?.user?.name}
          </Paragraph>
        </div>
      </div>
      <div className="">
        <div className="status flex flex-col gap-2 justify-center items-center">
          {Btn ? <Btn /> : null}
          <Paragraph size={11} className="">
            {data?.id.slice(0, 8)}
          </Paragraph>
        </div>
      </div>
    </div>
  );
}

export default OrderCardsMobile;

import React from "react";
import Input from "../Base/Input";
import BaseImage from "../Base/BaseImage";
import { CartData } from "@/constants/Types";

interface CheckoutScreenProps {
  products: CartData[],
  state: any,
  setState?: any
}

const CheckoutScreen = ({ products, state }: CheckoutScreenProps) => {
  return (
    <div className="max-w-md mx-auto p-4">
      {products?.map((data: CartData, index: number) => (

        <div key={index} className="flex items-center mb-4">
          <div className="relative bg-gray-300 p-2 rounded border-gray-800 mt-4">
            <BaseImage
              src={data?.product?.product_images?.[0]?.url}
              width={70}
              height={96}
              alt={""}
            />
            <p className="absolute top-0 right-0 bg-black text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {data?.quantity}
            </p>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg ">{data?.product?.name} </h3>
            <p className="text-sm text-textcolor">{data?.quantity} x {data?.product?.name}</p>
          </div>
          <div className="text-lg">$ {data?.product?.base_price}</div>
        </div>
      ))
      }
      <div className="flex-grow border-t border-gray-300 mt-6 mb-6"></div>
      <div className="flex items-center mb-4 space-x-2">
        <Input placeholder="Promo code" type="digit" className="w-full p-3 border rounded" />

        <button className="px-4 py-3 bg-green-600 text-white font-semibold rounded-md">
          Apply
        </button>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600 ">Subtotal</p>
        <p className="font-normal">${state?.subtotal}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-600">Shipping</p>
        <p className="text-sm text-gray-700">{state?.shipping}</p>
      </div>

      <hr className="my-4" />

      <div className="grid grid-cols-2 justify-between mb-2">
        <div className="col-span-1 justify-start">
          <p className="text-lg">Total</p>
          <p className="text-text text-sm">including ${state?.tax} in taxes</p>
        </div>
        <div className="col-span-1 text-sm text-gray-500 justify-end">
          <p className="text-textcolor text-2xl text-end ">
            <span className="text-sm text-textcolor">GBP</span> ${state?.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;

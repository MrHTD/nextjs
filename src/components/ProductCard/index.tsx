"use client";
import React, { useState } from "react";
import BaseImage from "../Base/BaseImage";
import Scrollable from "../Scrollable";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/config/redux";
// import { addToCart } from "@/config/redux/reducers/cart";
import { GoHeartFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useAppContext } from "@/initialize";

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: any) => state.user);


  const handleAddToCart = async () => {
    console.log("handle add to cart");
  };

  const [isShared, setIsShared] = useState(false);
  const handleShareClick = () => {
    setIsShared(true);
    alert("Product shared!");
    setTimeout(() => setIsShared(false), 2000);
  };
  console.log("product", product);

  return (
    <div className="rounded-md bg-[#F9F9F9] border border-gray-300 mb-10 pb-10">
      <div className="pt-10 pb-10 overflow-hidden relative flex justify-center cursor-pointer">
        <Scrollable type="arrow" oneItemFullFrame>
          {product.product_images?.map(
            (image: { url: string }, index: number) => (
              <div
                key={`${product.id}-${index}`}
                className="flex items-center justify-center"
              >
                <BaseImage
                  src={image.url}
                  alt={`Product Image ${index + 1}`}
                  height={280}
                  width={280}
                  className="rounded-md"
                />
              </div>
            )
          )}
        </Scrollable>
      </div>
      <Link href={`/product/${encodeURIComponent(product.id)}`}>
        <div className="pl-8 pr-5">
          <p className="text-textcolor font-medium text-lg overflow-hidden text-ellipsis whitespace-normal max-w-full">
            {product?.name}
          </p>
        </div>
        <div
          className="flex items-center gap-4 ml-8 mt-5"
          style={{ width: "80%" }}
        >
          <BaseImage
            src={product?.store?.profile_image}
            alt="Profile-Pic"
            className="rounded-full h-[40px] w-[40px] object-cover"
            width={40}
            height={40}
          />
          <div className="flex flex-col text-start">
            <label className="whitespace-nowrap font-semibold">
              {product?.store?.name}
            </label>
            <label className="text-xs whitespace-normal">
              {product?.store?.description}
            </label>
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-2 justify-between mt-3 ml-8 mr-8">
        <div className="grid grid-cols-1 justify-start">
          <p className="text-base ">{`$ ${product?.base_price}`}</p>
        </div>
        <div className="flex justify-end space-x-2">
          <GoHeartFill size={24} className="text-red-500" />
          <button onClick={handleAddToCart}>
            <CiShoppingCart size={24} />
          </button>
          <button onClick={handleShareClick}>
            <IoMdShare
              size={24}
              color={isShared ? "blue" : "gray-400"}
              className="text-gray-400"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import BaseImage from "../Base/BaseImage";
import Heading from "../Base/Heading";
import QuickViewModal from "../QuickViewModal";
import { useAppContext } from "@/initialize";
import { productPrice } from "@/utility";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { IoMdShare } from "react-icons/io";
import { GoHeartFill } from "react-icons/go";
import { RiShoppingCart2Fill, RiShoppingCart2Line } from "react-icons/ri";
import { Product } from "@/constants/Types";
import DisableLink from "../DisableLinks";
import ShareModal from "../AffilliateSharePorductModal";

export default function FlashProductCardV2ForMobile({ product, isSelected, onSelect, className, disablePreview = false }: { product: Product, isSelected?: boolean, onSelect?: (data: any) => void, className?: string, disablePreview?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setShareIsModalOpen] = useState(false);
  const handleShareClick = () => {
    setShareIsModalOpen(true);
  };

  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [cartColor, setCartColor] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`grid grid-rows-2 flex-flex-shrink-0 rounded-2xl bg-white border border-gray-300 shadow-sm overflow-hidden hover:border-textsecondary  ${className}`}
      onClick={() => { onSelect?.(product) }}>
      <div className="overflow-hidden row-span-1 relative flex justify-center items-center align-middle cursor-pointer">
        <div
          className="p-2 flex flex-shrink-0 overflow-hidden justify-center items-center align-middle cursor-pointer "
          style={{ height: 120, padding: 0, backgroundPosition: "center" }}
        >
          <div className="cursor-pointer absolute top-3 right-3 bg-textsecondary text-white rounded-full p-2 z-10">
            <BaseImage
              onClick={handleShareClick}
              src="/assets/images/scan-eye.png"
              height={12}
              width={12}
              alt="scan"
              className="object-cover cursor-pointer"
            />
          </div>
          <DisableLink href={`/product/${encodeURIComponent(product.id)}`} disable={disablePreview} >
            <BaseImage
              src={product.product_images?.[0]?.url}
              alt="Product Image"
              height={100}
              width={100}
              className="h-[100px] w-[100px] rounded-md object-contain"
            />
          </DisableLink>
        </div>
      </div>
      <div className="overflow-hidden">
        <hr className="border-t border-gray-300 mt-1 mx-3" />
        <div className="content-wapper px-4 pt-2 pb-3 flex flex-col gap-1 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between w-full h-8 mb-2">
              <DisableLink
                href={`/product/${encodeURIComponent(product.id)}`}
                disable={disablePreview}
                className="w-full"
              >
                <Heading level={5} lines={2}>{product?.name}</Heading>
              </DisableLink>
            </div>
            <div className="grid grid-cols-12 w-full items-center justify-between gap-3">
              <div className="col-span-12 flex flex-col">
                <div className="flex flex-row gap-3 items-center align-middle">
                  <Avatar
                    src={product?.store?.profile_image}
                    sx={{ height: 30, width: 30 }}
                  />
                  <div className="flex flex-col w-full align-middle">
                    <Heading level={9} lines={1} className="text-[10px]">
                      {product?.store?.name}
                    </Heading>
                    {/* <Heading
                      level={10}
                      className="opacity-50 text-[10px] whitespace-normal"
                      lines={1}
                    >
                      {product?.store?.description?.substring(0, 15)}
                    </Heading> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-1 grid grid-cols-2 w-full items-center justify-between">
            <div className="col-span-2 flex flex-row">
              <Heading level={3} className="text-primary font-normal text-xs">
                {`$ ${productPrice(
                  product?.base_price ?? 0,
                  product?.discount ?? 0,
                  product?.discount_type ?? "percentage"
                ).toFixed(1)}`}
              </Heading>
              <del className="text-gray-400 text-xs">{`$ ${product?.base_price}`}</del>
            </div>
          </div>
          <div className="mt-1 flex flex-row justify-end gap-2">
            <button onClick={handleShareClick}>
              <IoMdShare size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      {isShareModalOpen &&
        <ShareModal
          link={`https://mawrid.user.devxonic.com/product/${product.id}`}
          product={product}
          isOpen={isShareModalOpen}
          onClose={closeModal}
        />
      }  
      {isModalOpen && (
        <QuickViewModal onClose={closeModal} images={product?.product_images} />
      )}
    </div>
  );
}

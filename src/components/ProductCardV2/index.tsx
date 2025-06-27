"use client";
import React, { Children, useState } from "react";
import BaseImage from "../Base/BaseImage";
import QuickViewModal from "../QuickViewModal";
import Link from "next/link";
import { productPrice } from "@/utility";
import { IoMdShare } from "react-icons/io";
import { Product } from "@/constants/Types";
import Heading from "../Base/Heading";
import { Avatar } from "@mui/material";
import DisableLink from "../DisableLinks";
import ShareModal from "../AffilliateSharePorductModal";

export default function ProductCard({ product, isSelected, onSelect, disablePreview = false }: { product: Product, isSelected?: boolean, onSelect?: (data: any) => void, disablePreview?: boolean }) {

  const [quickView, setQuickView] = useState(false);
  const handleQuickView = () => {
    setQuickView(true);
    alert("Product Quick View");
  };
  console.log("product", product);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareModalOpen, setShareIsModalOpen] = useState(false);

  const handleShareClick = () => {
    console.log("share", isShareModalOpen)
    setShareIsModalOpen(true);
  };

  const closeModal = () => {
    setShareIsModalOpen(false);
  };

  return (
    <div className={`grid grid-rows-2 flex-flex-shrink-0 rounded-2xl bg-white border border-gray-300 shadow-sm overflow-x-hidden hover:border-textsecondary ${isSelected ? "border-textsecondary" : "border-gray-300 "}`}
      onClick={() => { onSelect?.(product) }}>
      <div className="overflow-hidden row-span-1 relative flex justify-center items-center align-middle cursor-pointer">
        <div className="p-2 flex flex-shrink-0 overflow-hidden justify-center items-center align-middle cursor-pointer "
          style={{ height: 220, padding: 0, backgroundPosition: "center" }}
        >
          <div className="cursor-pointer absolute top-3 right-3 bg-textsecondary text-white rounded-full p-2 z-10">
            <BaseImage
              onClick={handleShareClick}
              src="/assets/images/scan-eye.png"
              height={17}
              width={17}
              alt="scan"
              className="object-cover cursor-pointer"
            />
          </div>
          <DisableLink href={`/product/${encodeURIComponent(product.id)}`} disable={disablePreview} >
            <BaseImage
              src={product.product_images?.[0]?.url}
              alt="Product Image"
              fill
              className="rounded-md object-contain"
            />
          </DisableLink>
        </div>
      </div >
      <div className="row-span-1">
        <hr className="border-t border-gray-300 mt-1 mx-3" />
        <div className="content-wapper p-4 flex flex-col gap-1 justify-between h-[calc(100%-7px)]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between w-full">
              <DisableLink href={`/product/${encodeURIComponent(product.id)}`} disable={disablePreview} className="w-full">
                <Heading level={5} lines={2}>
                  {product?.name}
                </Heading>
              </DisableLink>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-12 w-full items-center justify-between gap-3">
              <div className="col-span-8 flex flex-col">
                <div className="flex flex-row gap-3 items-center align-middle">
                  <Avatar src={product?.store?.profile_image} />
                  <div className="flex flex-col">
                    <Heading level={9} lines={1} className="text-center">
                      {product?.store?.name}
                    </Heading>
                    {/* <Heading level={10} className="opacity-50 text-center" lines={1}>
                      {product?.store?.description}
                    </Heading> */}
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-row justify-end gap-1 ">
                  <button onClick={handleShareClick}>
                    <IoMdShare
                      size={24}
                      className="text-gray-400"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 w-full items-center justify-between">
              <div className="col-span-2 flex flex-row">
                <Heading level={3} className="text-primary font-normal">
                  {`$ ${productPrice(Number(product?.base_price) ?? 0, product?.discount ?? 0, product?.discount_type ?? 'percentage').toFixed(1)}`}
                </Heading>
                <Heading level={8} className="text-gray-400 ml-2">
                  <del className="text-gray-400">{`$ ${product?.base_price}`}</del>
                </Heading>
              </div>
            </div>
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
      {isModalOpen &&
        <QuickViewModal
          onClose={closeModal}
          images={product?.product_images}
        />
      }
    </div>
  );
}

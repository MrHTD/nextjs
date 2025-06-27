"use client";
import React, { useState } from "react";
import BaseImage from "../Base/BaseImage";
import Heading from "../Base/Heading";
import QuickViewModal from "../QuickViewModal";
import { productPrice } from "@/utility";
import Link from "next/link";
import { LuClock1 } from "react-icons/lu";
import { BsCashCoin } from "react-icons/bs";
import ShareModal from "../AffilliateSharePorductModal";

export default function AffiliateProductCardV2ForMobile({
  product,
}: {
  product: any;
}) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQuickViewModalOpen, setIsQuickViewModalOpen] = useState(false);
  const [affiliateLink, setAffiliateLink] = useState("");

  const handleQuickViewOpen = () => {
    setIsQuickViewModalOpen(true);
  };

  const handleQuickViewClose = () => {
    setIsQuickViewModalOpen(false);
  };

  const handleShareModalClose = () => {
    setIsShareModalOpen(false);
  };

  const formatTime = (date: any) => {
    const Datee = new Date(date);
    const seconds = Math.floor((Datee.getTime() - new Date().getTime()) / 1000);
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  return (
    <div className="flex flex-col flex-flex-shrink-0 rounded-2xl bg-white border border-gray-300 shadow-sm overflow-x-hidden hover:border-textsecondary w-full min-w-[100px] max-w-[320px]">
      <div className="overflow-hidden relative flex justify-center items-center align-middle cursor-pointer">
        <div
          className="p-2 flex flex-shrink-0 overflow-hidden justify-center items-center align-middle cursor-pointer "
          style={{ height: 100, padding: 0, backgroundPosition: "center" }}
        >
          {product?.Program?.end_date && (
            <div className="absolute top-1 left-1 bg-primary text-white rounded-full p-2 z-10">
              <div className="flex flex-row justify-start gap-1 items-center align-middle">
                <LuClock1 size={15} className="text-white" />
                <p className="text-[10px]">
                  {" "}
                  {formatTime(product?.Program?.end_date)}
                </p>
              </div>
            </div>
          )}
          <div className="cursor-pointer absolute top-1 right-1 bg-textsecondary text-white rounded-full p-2 z-10">
            <BaseImage
              onClick={handleQuickViewOpen}
              src="/assets/images/scan-eye.png"
              height={12}
              width={12}
              alt="scan"
              className="object-cover cursor-pointer"
            />
          </div>
          <Link
            href={`/affiliate/product/${encodeURIComponent(product.id)}?p_id=${product?.Program?.id
              }`}
          >
            <BaseImage
              src={product.product_images?.[0]?.url}
              alt="Product Image"
              // fill
              height={100}
              width={100}
              className="h-[70px] w-[70px] rounded-md object-contain mt-10"
            />
          </Link>
        </div>
      </div>
      <div>
        <hr className="border-t border-gray-300 mt-1 mx-3" />
        <div className="content-wapper px-4 pt-2 pb-3 flex flex-col gap-1 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between w-full h-8">
              <Link
                href={`/affiliate/product/${encodeURIComponent(
                  product.id
                )}?p_id=${product?.Program?.id}`}
                className="w-full"
              >
                <Heading level={5} lines={2} className="text-[8px] h-14">
                  {product?.name}
                </Heading>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-1">
            <div className="flex gap-1 w-full items-center justify-between">
              <div className="flex flex-row">
                <Heading level={3} className="text-textsecondary text-[10px]">
                  {`$ ${productPrice(
                    product?.base_price ?? 0,
                    product?.discount ?? 0,
                    product?.discount_type ?? "percentage"
                  ).toFixed(1)}`}
                </Heading>
                <Heading
                  level={8}
                  className="text-gray-500 ml-2 text-[10px]"
                >
                  <del>{`$${product?.base_price}`} </del>
                </Heading>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center align-middle">
            <p className="font-normal text-[10px]">Comm.</p>
            <p className="text-primary text-[10px]">
              {product?.Program?.commission_percentage
                ? `${product?.Program?.commission_percentage}%`
                : `${product?.Program?.commission_fixed}`}
            </p>
          </div>
          <div className="flex flex-row items-center align-middle justify-between">
            <div className="flex justify-start w-full">
              <Heading level={3} className="text-primary text-[10px]">
                {`$ ${productPrice(
                  product?.base_price ?? 0,
                  product?.discount ?? 0,
                  product?.discount_type ?? "percentage"
                ).toFixed(1)}`}
              </Heading>
            </div>
          </div>
        </div>
      </div>
      {isQuickViewModalOpen && (
        <QuickViewModal
          onClose={handleQuickViewClose}
          images={product?.product_images}
        />
      )}
      <ShareModal
        product={product}
        link={`https://mawrid.user.devxonic.com/affiliate${affiliateLink}`}
        isOpen={isShareModalOpen}
        onClose={handleShareModalClose}
      />
    </div>
  );
}

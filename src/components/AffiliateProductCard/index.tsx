"use client";
import React, { useState } from "react";
import BaseImage from "../Base/BaseImage";
import QuickViewModal from "../QuickViewModal";
import Link from "next/link";
import Heading from "../Base/Heading";
import { productPrice } from "@/utility";
import { IoIosStar } from "react-icons/io";
import { LuClock1 } from "react-icons/lu";
import Button from "../Base/Button";
import ShareModal from "../AffilliateSharePorductModal";
import { showNotification } from "@/utility/snackBar";

export default function AffiliateProductCardV2({ product }: { product: any }) {
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
    <div className="grid grid-rows-2 flex-flex-shrink-0 rounded-2xl bg-white border border-gray-300 shadow-sm overflow-x-hidden hover:border-textsecondary min-w-[180px] max-w-[320px]">
      <div className="overflow-hidden row-span-1 relative flex justify-center items-center align-middle cursor-pointer">
        <div
          className="p-2 flex flex-shrink-0 overflow-hidden justify-center items-center align-middle cursor-pointer "
          style={{ height: 220, padding: 0, backgroundPosition: "center" }}
        >
          {product?.Program?.end_date && (
            <div className="absolute top-3 left-3 bg-primary text-white rounded-full p-2 z-10">
              <div className="flex flex-row justify-start gap-1 items-center align-middle">
                <LuClock1 size={15} className="text-white" />
                <p className="text-xs">
                  {formatTime(product?.Program?.end_date)}
                </p>
              </div>
            </div>
          )}
          <div className="cursor-pointer absolute top-3 right-3 bg-textsecondary text-white rounded-full p-2 z-10">
            <div className="flex flex-row justify-end">
              <BaseImage
                onClick={handleQuickViewOpen}
                src="/assets/images/scan-eye.png"
                height={17}
                width={17}
                alt="scan"
                className="object-cover cursor-pointer"
              />
            </div>
          </div>
          <Link
            href={`/product/${encodeURIComponent(product.id)}`}
          >
            <BaseImage
              src={product.product_images?.[0]?.url}
              alt="Product Image"
              fill
              className="rounded-md object-contain"
            />
          </Link>
        </div>
      </div>
      <div className="row-span-1">
        <hr className="border-t border-gray-300 mt-1 mx-3" />
        <div className="content-wapper p-4 flex flex-col gap-1 justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between w-full">
              <Link
                href={`/product/${encodeURIComponent(
                  product.id
                )}`}
                className="w-full"
              >
                <Heading level={5} lines={2} className="h-14">
                  {product?.name}
                </Heading>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-1 w-full items-center justify-between">
              <div className="flex flex-row">
                <Heading level={3} className="text-textsecondary">
                  {`$ ${productPrice(
                    product?.base_price ?? 0,
                    product?.discount ?? 0,
                    product?.discount_type ?? "percentage"
                  ).toFixed(1)}`}
                </Heading>
                <Heading level={8} className="text-gray-500 ml-2">
                  <del>{`$${product?.base_price}`}</del>
                </Heading>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-1 items-center align-middle">
            <p className="font-normal text-base">Comm.</p>
            <p className="text-primary text-base">
              {product?.Program?.commission_percentage
                ? `${product?.Program?.commission_percentage}%`
                : `$${product?.Program?.commission_fixed}`}
            </p>
          </div>
          <div className="flex flex-row gap-1 items-center align-middle w-full">
            <div className="flex justify-start w-full">
              <Heading level={3} className="text-primary">
                {`$ ${productPrice(
                  product?.base_price ?? 0,
                  product?.discount ?? 0,
                  product?.discount_type ?? "percentage"
                ).toFixed(1)}`}
              </Heading>
            </div>
            {/* <div className="flex justify-end w-full">
              <Button
                title="Earn"
                isPrimary
                className="rounded-full text-base px-4 py-1"
                onClick={handleAffiliateLink}
              />
            </div> */}
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
        link={`https://mawrid.user.devxonic.com${affiliateLink}`}
        isOpen={isShareModalOpen}
        onClose={handleShareModalClose}
      />
    </div>
  );
}

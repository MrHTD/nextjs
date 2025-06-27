"use client";
import React, { useMemo, useState } from "react";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";
import { GoHeartFill } from "react-icons/go";
import { IoMdShare } from "react-icons/io";
import Link from "next/link";
import { discountFromatter, productPrice } from "@/utility";
import QuickViewModal from "../QuickViewModal";

interface ProductCardProps {
  product: any;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export default function VendorAffiliateCardForMobile({
  product,
  isSelected,
  onSelect,
}: ProductCardProps) {
  const handleShareClick = () => {
    setIsModalOpen(true);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const selectedImage = useMemo(() => {
    const img = product?.product_images?.find((image: any) => image.is_selected)?.url
    if (img) return img
    return product?.product_images?.[0]?.url
  }, [product]);
  return (
    <div className="flex flex-col w-[35] flex-flex-shrink-0 rounded-2xl bg-white border border-gray-300 shadow-sm overflow-x-hidden mb-4 pb-5 hover:border-textsecondary">
      <div className="overflow-hidden relative flex justify-center items-center align-middle cursor-pointer mb-1">
        <div className="bg-textsecondary text-white rounded-full p-2 z-10 absolute top-2 right-2">
          <BaseImage
            onClick={handleShareClick}
            src="/assets/images/scan-eye.png"
            height={17}
            width={17}
            alt="scan"
            className="object-cover"
          />
        </div>
        <div className="p-2 flex justify-center items-center cursor-pointer mb-1 w-full h-36 sm:h-56 md:h-64 lg:h-72 xl:h-80">
          <BaseImage
            src={product.product_images?.[0]?.url}
            alt="Product Image"
            fill
            className="rounded-md object-contain px-2 object-center w-16 mt-4"
          />
        </div>
      </div >
      <div className="flex flex-row justify-between pl-2 pr-2">
        <div>
          <Link href={`/product/${encodeURIComponent(product.id)}`}>
            <p className="text-textcolor font-medium text-xs overflow-hidden text-ellipsis whitespace-nowrap max-w-full" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
              {product?.name?.length > 12 ? `${product?.name?.substring(0, 12)}...` : product?.name}
            </p>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 pl-2 mt-2 w-full items-center">
        <div className="col-span-1">
          <div className="flex flex-col">
            <p className="text-xs text-primary">
              {`$ ${productPrice(product?.base_price ?? 0, product?.discount ?? 0, product?.discount_type ?? 'percentage').toFixed(1)}`}
            </p>
            <div className="flex flex-row gap-1">
              <del className="text-xs text-gray-400">{`$ ${product?.base_price}`}</del>
              <p className="text-xs">{`${discountFromatter(product?.discount ?? 0, product?.discount_type ?? 'percentage')}`}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="flex flex-row justify-end mr-3">
            <GoHeartFill size={20} className="text-red-500" />
            <button onClick={handleShareClick}>
              <IoMdShare
                size={20}
                className="text-gray-400"
              />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen &&
        <QuickViewModal
          onClose={closeModal}
          images={product?.product_images}
        />
      }
    </div>
  );
}

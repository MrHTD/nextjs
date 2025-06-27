"use client";
import React, { useEffect, useState } from "react";
import Button from "../Base/Button";
import Heading from "../Base/Heading";
import Input from "../Base/Input";
import BaseImage from "../Base/BaseImage";
import Rating from "../Rating";
import { MdContentCopy } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { productPrice } from "@/utility";

interface AffiliateShareProductModal {
  isOpen: boolean;
  onClose: () => void;
  link: string;
  product: any;
}

const ShareModal: React.FC<AffiliateShareProductModal> = ({
  isOpen,
  onClose,
  link,
  product,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setCopied(true);

    // Hide the copied message after 2 seconds
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const handleDownloadMedia = async () => {
    try {
      const imageUrl = product?.product_images?.[0]?.url;
      const imageExtension = imageUrl?.lastIndexOf(".") + 1;
      const imageName = imageUrl?.substring(imageExtension, imageUrl?.length);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${product?.name}.${imageName}`; // Set the desired file name
      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const handleShareMedia = () => {

    if (navigator.share) {
      navigator
        .share({
          title: "Check out this image!",
          url: link,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Your browser does not support sharing.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-[60rem] w-full relative space-y-3">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <AiOutlineClose size={20} />
        </button>
        <div className="inline-flex flex-wrap gap-6">
          <div className="bg-gray-200 rounded-md border border-gray-300 w-44 h-44 overflow-hidden relative cursor-pointer">
            <BaseImage
              src={product?.product_images?.[0]?.url}
              alt={`Share product pic`}
              style={{ objectFit: "contain" }}
              fill
              className="rounded-md"
            />
          </div>
          <div>
            <Heading level={2} className="text-textcolor">
              {product?.name}
            </Heading>
            <div className="inline-flex mt-1 gap-1 md:mt-4 md:gap-3 text-center flex-wrap items-center">
              <Rating className="mb-1" value={product?.average_rating} />
              <p className="font-normal text-[#656565] text-xs md:text-sm">
                ({product?.reviews_count || 0} Customer review)
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Heading level={3} className="text-primary text-2xl">
                {`$ ${productPrice(
                  product?.base_price ?? 0,
                  product?.discount ?? 0,
                  product?.discount_type ?? "percentage"
                ).toFixed(1)}`}
              </Heading>
              <Heading level={6} className="text-[#656565] line-through">
                {`${product?.base_price}`}
              </Heading>
            </div>
          </div>
        </div>
        <p className="text-sm mb-3 text-textcolor text-center">
          Share link:
        </p>
        <div className="flex items-center border rounded p-2 mb-4 relative">
          <Input
            type="address"
            value={link}
            readOnly
            className="w-full text-xs md:text-base text-textsecondary border-none outline-none py-0"
          />
          <button onClick={handleCopy}>
            <MdContentCopy />
          </button>
          {copied && (
            <span className="absolute right-12 top-2 bg-primary text-white text-xs rounded px-2 py-1">
              Text Copied!
            </span>
          )}
        </div>
        <Heading level={3} className="text-textcolor text-center text-sm md:text-base">
          Share Product Media
        </Heading>
        <div className="flex justify-center flex-col md:flex-row gap-2">
          <Button
            title="Download Media"
            isPrimary
            primaryVariant="dark"
            onClick={handleDownloadMedia} // Trigger image download on button click
          />
          <Button
            title="Share Media"
            isPrimary
            onClick={handleShareMedia} // Trigger image share on button click
          />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;

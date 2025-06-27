"use client";
import React from "react";
import BaseImage from "../Base/BaseImage";
import { ProductData } from "@/constants/Data";
import { FaCopy, FaShareAlt, FaTrash } from "react-icons/fa";

const AffiliateLinkspage = () => {
  const handleDelete = (id: string) => {
    console.log(`Delete product with id: ${id}`);
  };
  const handleShare = (id: string) => {
    console.log(`Share product with id: ${id}`);
  };
  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(`Product ID: ${id}`);
    alert("Product ID copied to clipboard!");
  };

  return (
    <div className="grid col-span-2">
      <div className="col-span-1 space-y-6">
        <h2 className="font-normal text-textsecondary text-base mb-4">
          Active Links
        </h2>
        {ProductData.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center">
              <BaseImage
                src={product.images[0]}
                className="mr-4 rounded-lg"
                alt=""
                width={16}
                height={16}
              />
              <div className="overflow-ellipsis">
                <h3 className="text-md font-base text-textsecondary">
                  {product.store.name}
                </h3>
                <p className="text-sm text-gray-500">{product.url}</p>
                <p className="text-xs text-gray-400 w-40 overflow-hidden h-[1rem]">
                  {product.name}
                </p>
              </div>
            </div>
            <p className="text-primary mx-4 text-sm font-base ">
              {product.description}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleShare(product.id.toString())}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaShareAlt />
              </button>
              <button
                onClick={() => handleCopy(product.id.toString())}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaCopy />
              </button>
              <button
                onClick={() => handleDelete(product.id.toString())}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="col-span-1 space-y-6">
        <h2 className="font-normal text-textsecondary text-base mb-4">
          Inactive Links
        </h2>
        {ProductData.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between overflow-hidden"
          >
            <div className="flex items-center">
              <BaseImage
                src={product.images[0]}
                className="w-16 h-16 mr-4 rounded-lg"
                alt=""
                width={40}
                height={40}
              />
              <div className="overflow-ellipsis">
                <h3 className="text-md font-base text-textsecondary">
                  {product.store.name}
                </h3>
                <p className="text-sm text-gray-500">{product.url}</p>
                <p className="text-xs text-gray-400 w-40 overflow-hidden h-[1rem]">
                  {product.name}
                </p>
              </div>
            </div>
            <p className="text-primary mx-4 text-sm font-base ">
              {product.name}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleShare(product.id.toString())}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaShareAlt />
              </button>
              <button
                onClick={() => handleCopy(product.id.toString())}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaCopy />
              </button>
              <button
                onClick={() => handleDelete(product.id.toString())}
                className="text-gray-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffiliateLinkspage;

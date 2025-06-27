"use client";
import React from "react";
import Tabs from "../Base/Tab";
import Link from "next/link";
import SellerInfo from "../SellerInfo";
import ProductCard from "../ProductCard";
import ReviewsSection from "../ReviewsSection";
import { ProductData } from "@/constants/Data";

const tabData = [
  {
    label: "Products",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {ProductData.map((product) => (
          <ProductCard key={product.id} product={product as any} />
        ))}
      </div>
    ),
  },
  { label: "Reviews", content: <ReviewsSection /> },
  { label: "Shop Info", content: <SellerInfo hideHeading={true} /> },
];

export default function ShopProfile() {
  return (
    <>
        <div>
          <Link
            href="/"
            className="text-textcolor w-36 md:w-64 px-6 hover:bg-gray-200 hover:rounded-md cursor-pointer block"
          >
            ← Continue Shopping
          </Link>
        </div>
        <Tabs
          tabs={tabData}
          type="Button"
          className="mx-auto max-w-[35rem] mt-20"
        />
    </>
  );
}

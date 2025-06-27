"use client";
import React, { useState } from "react";
import ProductCard from "../ProductCardV2";
import ProductCardMobile from "../ProductCardV2Mobile";

interface VendorProductsProps {
    selected?: string;
    onSelect?: (data: any) => void;
    data?: any[];
    disablePreview?: boolean

}

export default function VendorProducts(props: VendorProductsProps) {
    const { data = [], onSelect, selected, disablePreview = false } = props;

    return (
        <div>
            {/* For Desktop */}
            <div className="desktop hidden md:flex flex-col rounded-md w-full gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 overflow-x-hidden mb-6  gap-3">
                    {data.length > 0 && data.map((product: any) => (
                        <ProductCard
                            disablePreview={disablePreview}
                            key={product.id}
                            product={product}
                            isSelected={selected == product.id}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>

            {/* For Mobile */}
            <div className="mobile md:hidden rounded-md w-full flex flex-col gap-5 my-10">
                <div className="grid grid-cols-2 mt-12 gap-3 overflow-x-hidden">
                    {data.length > 0 && data?.map((product: any) => (
                        <ProductCardMobile
                            disablePreview={disablePreview}
                            key={product.id}
                            product={product}
                            isSelected={selected == product.id}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
"use client";
import React, { useState, useEffect } from "react";
import Container from "@/components/Base/Container";
import SpecificProductCards from "@/components/SpecificProductCards";
import { getAffiliateSpecificProducts } from "@/services/affiliate";

export default function AffiliateSpecificProduct() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [products, setProducts] = useState<any>([]);

  const handleCardSelect = (id: any) => {
    console.log("Selected Card:", id);
  };

  const handleGetSpecificProducts = async () => {
    try {
      const response = await getAffiliateSpecificProducts();
      setProducts(response?.result);
      console.log("Specific Products:", response?.result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetSpecificProducts();
  }, []);

  return (
    <Container className="flex flex-col gap-5 min-h-screen my-10 px-3">
      <div className="bg-white rounded-md text-center items-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {products?.length === 0 ? (
            <div className="col-span-full p-4">
              <p>No products available</p>
            </div>
          ) : (
            products?.map((product: any) => (
              <SpecificProductCards
                key={product.id}
                product={product?.product}
                isSelected={selectedCards.includes(product.id)}
                onSelect={handleCardSelect}
              />
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

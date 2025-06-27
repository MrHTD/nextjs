"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Base/Container";
import ProgramCard from "@/components/program-cards";
import { getAffiliateAllProducts } from "@/services/affiliate";
import Heading from "@/components/Base/Heading";
import VendorProducts from "@/components/VendorProducts";
import AffiliateProductCardV2 from "@/components/AffiliateProductCard";
import AffiliateProductCardMobileV2 from "@/components/AffiliateProductCardMobile";


export default function AddAllProductAffiliateProgram() {
  const [selectedCards, setSelectedCards] = useState<string>();
  const [ProductsData, setProducts] = useState<any>([]);
  const [allProgramsData, setAllProgramsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCardSelect = (data: any) => {
    setSelectedCards(data.id);
    setProducts(data);
  };

  const handleAllProgramsData = async () => {
    setIsLoading(true);
    try {
      const response = await getAffiliateAllProducts();
      setAllProgramsData(response?.result);
      console.log("All programs data:", response?.result);
    } catch (error) {
      console.log("Error loading all programs data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleAllProgramsData();
  }, []);

  return (
    <Container className="md:my-10 ">
      {!selectedCards ? (
        <ProgramCard

          setAllProgramsData={setAllProgramsData}
          allProgramsData={allProgramsData}
          isLoading={isLoading}
          onSelect={handleCardSelect}
        />
      ) : (
        <>
          <div
            className="flex items-center my-4"
            onClick={() => {
              setSelectedCards(""), setProducts([]);
            }}
          >
            <Heading level={5} className="cursor-pointer">← Back</Heading>
          </div>
          <div className="desktop hidden md:flex flex-col rounded-md w-full gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 overflow-x-hidden mb-6 gap-3">
              {ProductsData?.length === 0 ? (
                <div className="col-span-full p-4">
                  <p>No products available</p>
                </div>
              ) : (
                ProductsData?.products?.map((x: any, i: number) => {
                  let prod = {
                    ...x,
                    Program: {
                      commission_percentage: ProductsData.commission_percentage,
                      commission_fixed: ProductsData.commission_fixed,
                    }
                  }
                  return <AffiliateProductCardV2 product={prod} key={i} />
                })
              )}
            </div>
          </div>
          <div className="mobile md:hidden rounded-md w-full flex flex-col gap-5">
            <div className="grid grid-cols-2 mt-2 gap-3 overflow-x-hidden">
              {ProductsData?.length === 0 ? (
                <div className="col-span-full p-4">
                  <p>No products available</p>
                </div>
              ) : (
                ProductsData?.products?.map((x: any, i: number) => {
                  let prod = {
                    ...x,
                    Program: {
                      commission_percentage: ProductsData.commission_percentage,
                      commission_fixed: ProductsData.commission_fixed,
                    }
                  }
                  return <AffiliateProductCardMobileV2 product={prod} key={i} />
                })
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

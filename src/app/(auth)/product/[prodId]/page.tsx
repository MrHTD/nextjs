"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Footer from "@/components/Base/Footer";
import SingleProdComp from "@/components/SingleProdComp";
import { getSingleProduct, getStoresProducts } from "@/services/vendor";

type ApiResponse = {
  success: boolean;
  message: string;
  token: string;
  result: any;
};

// SYCODE
// interface ApiError {
//   // Define the structure of the API error if known
//   message: string;
//   statusCode: number;
// }

const ProductPage = () => {
  const { prodId } = useParams() as { prodId: string };
  const [products, setProducts] = React.useState<any>(null);

  let getData = async () => {
    try {
      const products = await getSingleProduct(prodId);
      console.log("products : in page", products?.result);
      setProducts(products?.result);
    } catch (err) {
      console.error("Error in fetching store data", err);
    }
  };

  useEffect(() => {
    if (prodId) {
      getData();
    }
  }, [prodId]);

  return (
    <>
      {<SingleProdComp key={products?.id} product={products as any} />}
      <div className="hidden sm:block">
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;

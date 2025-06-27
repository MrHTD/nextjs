import React from "react";
import BaseImage from "@/components/Base/BaseImage";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import { ProductData } from "@/constants/Data";

export default function ProductListing() {
  return (
    <Container className="flex-grow">
      <div className="flex flex-col md:flex-row p-5 mt-10 md:mt-0">
        <Heading level={1} className="text-textsecondary mb-4 md:mb-0">
          Product Listing
        </Heading>
      </div>
      <div className="flex justify-end my-6">
        <BaseImage src='/assets/images/dustbin.png' alt="Remove Icon" width={24} height={24} className="cursor-pointer" />
      </div>
      {ProductData.map((product) => (
        <>
          <div className="bg-white rounded-md p-4 flex flex-col md:flex-row items-center justify-start gap-2 my-2">
            <div className="flex w-20 h-20 rounded-md justify-center">
              <BaseImage
                src={product.selectedImage[0]}
                alt="Product Image"
                width={60}
                height={40}
              />
            </div>
            <Heading level={3} className="text-textsecondary">
              {product.name}
            </Heading>
          </div>
        </>
      ))}
    </Container>
  );
}

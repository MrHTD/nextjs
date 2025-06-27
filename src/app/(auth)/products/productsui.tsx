import React from "react";
import Button from "@/components/Base/Button";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import { ProductData } from "@/constants/Data";
import BaseImage from "@/components/Base/BaseImage";

export default function Products() {
  return (
    <Container className="flex-grow">
      <div className="flex flex-col md:flex-row justify-between p-5 mt-10 md:mt-0">
        <Heading level={1} className="text-textsecondary mb-4 md:mb-0">
          Product
        </Heading>
        <div className="flex flex-col md:flex-row">
          <Button title="Archives" />
          <Button title="Add Product" isPrimary />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {ProductData.map((product) => (
          <div key={product.id} className="grid grid-cols-2 items-center bg-white rounded-md p-4 shadow-md gap-4">
            <div className="col-span-1 flex items-center gap-4">
              <div className="w-20 h-20 rounded-md overflow-hidden">
                <BaseImage
                  src={product.images[0]}
                  alt="Product Image"
                  className="object-contain w-full h-full"
                  width={100}
                  height={80}
                />
              </div>
              <Heading
                level={5}
                className="text-sm font-semibold text-gray-800 whitespace-pre-wrap"
              >
                {product.name}
              </Heading>
            </div>
            <div className="col-span-1 flex justify-end gap-2">
              <button className="w-10 h-10 bg-green-100 text-green-600 rounded-md flex items-center justify-center shadow-md hover:bg-green-200">
                <BaseImage src='/assets/images/edit.png' alt="Edit" width={20} height={20} />
              </button>
              <button className="w-10 h-10 bg-red-100 text-red-600 rounded-md flex items-center justify-center shadow-md hover:bg-red-200">
                <BaseImage src='/assets/images/delete.png' alt="Delete" width={20} height={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

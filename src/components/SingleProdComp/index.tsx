"use client";
import React, { Suspense, useState } from "react";
import Link from "next/link";
import Container from "../Base/Container";
import Heading from "../Base/Heading";
import Button from "../Base/Button";
import Tabs from "../Base/Tab";
import BaseImage from "../Base/BaseImage";
import ImageMagnify from "../ImageMagnify";
import ProductReview from "../ProductReviews";
import { Product, ProductImageType } from "@/constants/Types";
import Scrollable from "../Scrollable";
import { productPrice } from "@/utility";
import Rating from "../Rating";
import Toggle from "../Base/Toggle";
import { disableProduct } from "@/services/vendor";
import { showNotification } from "@/utility/snackBar";
import GoBackLink from "../GoBack";

export default function SingleProdComp({ product, backURL }: { product: Product, backURL?:string }) {
  const [isDisabled, setIsDisabled] = useState(product?.is_active || false);
  const tabData = [
    {
      label: "Reviews",
      content: (
        <ProductReview
          id={product?.id}
          average_rating={product?.average_rating}
        />
      ),
    },
    {
      label: "Description",
      content: (
        <div className="p-4 mt-5">
          <h3 className="text-xl font-semibold">Product Description</h3>
          <p className="whitespace-normal text-sm mt-3 max-w-[90%]">
            {product?.long_description
              ? product?.long_description
              : "no long description available"}
          </p>
        </div>
      ),
    },
  ];

  const [selectedImage, setSelectedImage] = useState<ProductImageType | null>(
    product?.product_images?.[0] || null
  );

  const handleThumbnailClick = (imageSrc: ProductImageType) => {
    setSelectedImage(imageSrc);
  };

  const handleDisableProduct = async () => {
    const body = {
      product_id: product?.id,
      status: !isDisabled,
    };
    try {
      const response = await disableProduct(body);
      setIsDisabled(!isDisabled);
      console.log("response", response);
      showNotification("success", response?.result);
    } catch (error: any) {
      showNotification(
        "error",
        error?.data?.message || "Error in disabling product try again later"
      );
      console.error("Error in disabling product", error);
    }
  };
  return (
    <Suspense fallback={<div></div>}>
      <Container>
      <Link
          href={backURL || "/"}
          className="text-textcolor px-6 hover:bg-gray-200 hover:rounded-md cursor-pointer"
        >
          ← Back 
        </Link>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 overflow-hidden mt-8">
          <div className="col-span-1 overflow-x-hidden justify-start flex flex-col items-start">
            <div className="h-[600px] w-[100%] lg:max-w-[90%] sm:max-h-[80%] max-h-[400px] relative p-0 rounded-md border flex justify-center bg-[#D9D9D9] border-gray-300 overflow-hidden">
              {selectedImage && <ImageMagnify Imagesrc={selectedImage.url} />}
            </div>

            <Scrollable
              type="arrow"
              containerClassName="w-[100%] lg:max-w-[90%] overflow-none scroll-smooth"
            >
              <div className="flex gap-3 mt-4">
                {product?.product_images?.map(
                  (imageSrc: ProductImageType, index: number) => (
                    <div
                      key={index}
                      className="rounded-md border border-gray-300 w-24 h-24 max-h-[100%] relative cursor-pointer"
                      onClick={() => handleThumbnailClick(imageSrc)}
                    >
                      <BaseImage
                        src={imageSrc.url}
                        alt={`Thumbnail Image ${index + 1}`}
                        fill
                        className="p-1 rounded-md object-contain"
                      />
                    </div>
                  )
                )}
              </div>
            </Scrollable>
          </div>
          <div className="col-span-1 py-6 justify-start">
            <div className="flex flex-row justify-between items-center">
              <div className="w-[85%]">
                <Heading level={1} className="text-3xl mb-3 mt-6">
                  {product?.name}
                </Heading>
              </div>
              <div className="w-[15%]">
                <Toggle
                  isOn={isDisabled}
                  onToggle={() => {
                    handleDisableProduct();
                  }}
                />
              </div>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Rating
                className="mb-3"
                value={Number(product?.average_rating)}
              />
              <p className="font-normal text-[#656565] text-sm pb-3">
                ({product?.reviews?.length || 0} Customer Review)
              </p>
            </div>

            <div className="flex flex-row items-center align-middle gap-1 mt-4">
              <Heading level={1} className="text-primary">
                {`$ ${productPrice(
                  product?.base_price ?? 0,
                  product?.discount ?? 0,
                  product?.discount_type ?? "percentage"
                ).toFixed(1)}`}
              </Heading>
            </div>
            <div className="flex flex-row gap-4 mt-3 items-center">
              <p>{product?.description}</p>
            </div>
            <hr className="mt-5 mb-5" />
            <div className="flex flex-col md:flex-row gap-4 items-center justify-start">
              <Link href={`/add-product?product_id=${product?.id}`}>
                <Button title="Edit Product" isPrimary />
              </Link>
            </div>
            <hr className="mt-5 mb-5" />
            <div className="rounded-full w-full flex flex-row items-center text-center gap-4">
              <Link
                href={`/store`}
                className="flex flex-row w-full gap-3 items-center"
              >
                <BaseImage
                  src={product?.store?.profile_image}
                  alt="Profile-Pic"
                  className="rounded-full h-[60px] w-[60px] object-auto"
                  width={70}
                  height={70}
                />
                <Heading level={4} className="font-semibold">
                  {product?.store?.name}
                </Heading>
              </Link>
            </div>
            <div className="flex flex-row gap-2 mt-4 items-center">
              <Heading level={5} className="font-semibold">
                Categories:
              </Heading>
              <p className="text-sm">{product?.category?.name || ""}</p>
            </div>
            <div className="flex flex-row gap-2 mt-4 items-center">
              <Heading level={5} className="font-semibold">
                Tags:
              </Heading>
              {product?.tags?.map((val: any, i: number) => (
                <p key={i} className="text-sm">
                  {val?.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Tabs tabs={tabData} type="span" className="border-none" />
      </Container>
    </Suspense>
  );
}

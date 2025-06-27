"use client";
import React, { use, useEffect, useState } from "react";
import Container from "@/components/Base/Container";
import Button from "@/components/Base/Button";
import Heading from "@/components/Base/Heading";
import { GeneralInformation } from "@/components/VendorGeneralInfo";
import { ProductMedia } from "@/components/VendorProdMedia";
import { PricingInventory } from "@/components/VendorPrice&Inv";
import { Category } from "@/components/VendorCategory";
import { useRouter, useSearchParams } from "next/navigation";
import { showNotification } from "@/utility/snackBar";
import { uploadFile } from "@/utility";
import {
  AddProductData,
  Category as CategoryType,
  Option,
} from "@/constants/Types";
import { getCategories, getTags } from "@/services/public";
import {
  createProducts,
  getSingleProduct,
  updateProduct,
  updateProductImage,
} from "@/services/vendor";

const delivaryCharges = [
  { label: "Free Delivery", value: "free" },
  { label: "Standard Delivery", value: "standard" },
];

export default function AddProduct() {
  const params = useSearchParams();
  const productId = params.get("product_id");
  const [payload, setPayload] = React.useState<AddProductData | null>(null);
  const [selectedcategory, setSelectedcategory] = useState<Option | null>(null);
  const [selectedproducttags, setSelectedproducttags] = useState<Option | null>(
    null
  );
  const [deliveryCharge, setDeliveryCharge] = useState<Option | null>(null);
  const [categoryData, setCategoryData] = useState<any>();
  const [tagData, setTagData] = useState<any>();
  const route = useRouter();
  const store_id = useSearchParams()?.get("store_id");

  const getSingleProductHandler = async () => {
    if (productId) {
      const product = await getSingleProduct(productId);
      if (product) {
        setPayload(product.result);
      }
    }
  };

  useEffect(() => {
    getSingleProductHandler();
  }, [productId]);

  useEffect(() => {
    if (payload && productId) {
      if (payload.category_id) {
        const selectedCat = categoryData?.find(
          (cat: any) => cat.value === payload.category_id
        );
        setSelectedcategory({
          label: selectedCat?.label,
          value: selectedCat?.value,
        });
      }
      if (
        payload?.tags &&
        payload.tags.length > 0 &&
        payload.tags[0]?.id &&
        payload.tags?.[0]?.name
      ) {
        setSelectedproducttags({
          value: payload.tags?.[0]?.id,
          label: payload.tags?.[0]?.name,
        });
      }
      if (payload.delivery_type) {
        const selectedDelivery = delivaryCharges.find(
          (cat: any) => cat.value === payload.delivery_type
        );
        if (selectedDelivery)
          setDeliveryCharge({
            label: selectedDelivery?.label,
            value: selectedDelivery?.value,
          });
      }
    }
  }, [payload]);
  console.log("payload in editProd: ", payload);

  useEffect(() => {
    getCategories("product")
      .then((res) => {
        console.log("Categories", res);
        const categoryOptions = (res.result || []).map((cat: CategoryType) => ({
          label: cat.name,
          value: cat.id,
        }));
        setCategoryData(categoryOptions);
      })
      .catch((err) => {
        console.log("Error in getting categories", err);
      });
    getTags()
      .then((res) => {
        console.log("Tags", res);
        const TagsOptions = (res.result || []).map((cat: CategoryType) => ({
          label: cat.name,
          value: cat.id,
        }));
        setTagData(TagsOptions);
      })
      .catch((err) => {
        console.log("Error in getting categories", err);
      });
  }, []);

  const getImage = (urls: File[], selected?: File) => {
    console.log("urls", urls);
    if (selected) {
      setPayload((prev) => ({ ...prev, selected_image: selected }));
    }
    if (urls.length > 0) {
      setPayload((prev) => ({ ...prev, collect_images: urls }));
      if (selected && urls.includes(selected)) {
        return selected;
      }
      return urls[0];
    }
    return "";
  };

  const addProductHandler = async () => {
    if (
      !payload?.name ||
      !payload?.description ||
      !payload?.long_description ||
      !payload?.base_price ||
      !payload?.marketing_price ||
      !payload?.discount ||
      !payload?.discount_type ||
      !payload?.sku ||
      !payload?.bar_code ||
      !payload?.stock
    ) {
      return showNotification("error", "Please fill all the fields");
    }

    console.log("data on add Product  page", payload);
    if (payload?.collect_images?.length) {
      const img = await Promise.all(
        payload.collect_images.map(async (url) => {
          if (url) {
            const response = await uploadFile(url);
            console.log("response", response);
            return {
              is_selected: !!(
                payload.selected_image &&
                url.name === payload.selected_image.name
              ),
              url: response?.filename,
            };
          }
        })
      );
      payload.product_images = [
        ...img,
        ...(payload.product_images ?? []),
      ] as any;
    }
    if (productId) {
      if (payload?.product_images?.length) {
        await Promise.all(
          payload?.product_images.map(async (img: any) => {
            if (!img?.id) {
              await updateProductImage({
                product_id: productId,
                url: img.url,
              });
            }
          })
        );
      }
      if (deliveryCharge) {
        payload.delivery_type = deliveryCharge.value;
        payload.delivery_cost =
          deliveryCharge?.value === "free" ? Number("0") : Number("50");
        payload.delivery_time = "3-5 days"; // default value
      }
      try {
        const response: any = await updateProduct(payload);
        console.log("Product successful!", response);
        showNotification("success", "Create Products successfully");
        route.replace("/store");
      } catch (error: any) {
        console.log("update Products failed", error);
        showNotification("error", error.message);
      }
    }
    console.log("payload after Uploading", payload);
    if (payload && store_id) {
      payload.store_id = store_id;
      if (selectedcategory) {
        payload.category_id = selectedcategory.value;
      }
      if (selectedproducttags) {
        payload.tags = [selectedproducttags.value];
      }
      if (deliveryCharge) {
        payload.delivery_type = deliveryCharge.value;
        payload.delivery_cost =
          deliveryCharge?.value === "free" ? Number("0") : Number("50");
        payload.delivery_time = "3-5 days"; // default value
      }
      try {
        const response: any = await createProducts(payload);
        console.log("Product successful!", response);
        showNotification("success", "Product Created Successfully");
        route.replace("/store");
      } catch (error: any) {
        console.log("Create Product failed", error);
        showNotification("error", error.message);
      }
    }
  };

  return (
    <Container className="flex-grow mb-2">
      <div className="flex flex-col md:flex-row justify-between p-5 mt-10 md:mt-0">
        <Heading level={1} className="text-textsecondary mb-4 md:mb-0">
          {productId ? "Update Product" : "Add Product"}
        </Heading>
        <Button
          title={productId ? "Update Product" : "Add Product"}
          isPrimary
          onClick={addProductHandler}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GeneralInformation state={payload} setState={setPayload} />
        <ProductMedia
          getHandler={getImage}
          setPayload={setPayload}
          payload={payload}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
        <PricingInventory state={payload} setState={setPayload} />
        <Category
          tagData={tagData}
          categoriesData={categoryData}
          delivaryChargesData={delivaryCharges}
          selectedcategory={selectedcategory}
          setSelectedcategory={setSelectedcategory}
          deliveryCharge={deliveryCharge}
          selectedproducttags={selectedproducttags}
          setSelectedproducttags={setSelectedproducttags}
          setDeliveryCharge={setDeliveryCharge}
        />
      </div>
    </Container>
  );
}

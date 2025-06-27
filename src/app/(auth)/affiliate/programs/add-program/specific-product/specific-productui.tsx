"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Base/Button";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import Input from "@/components/Base/Input";
import SpecificProductCards from "@/components/SpecificProductCards";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux";
import { getStoresProducts } from "@/services/vendor";
import { productPrice } from "@/utility";
import { createAffiliateSpecificProduct } from "@/services/affiliate";
import { showNotification } from "@/utility/snackBar";
import VendorProducts from "@/components/VendorProducts";
import GoBackLink from "@/components/GoBack";
import { useRouter } from "next/navigation";

type SpecificProductPayload = {
  title: string;
  start_date: string;
  end_date: string;
  commission_fixed: number;
  max_commission_amount: number;
  product_id: string;
};

const initialPayload: SpecificProductPayload = {
  title: "",
  start_date: "",
  end_date: "",
  commission_fixed: 0,
  max_commission_amount: 0,
  product_id: "",
};

export default function AffiliateSpecificProduct() {
  const store = useSelector((state: RootState) => state?.storeReducer?.store);
  let router = useRouter()

  const [payload, setPayload] =
    useState<SpecificProductPayload>(initialPayload);
  const [selectedCards, setSelectedCards] = useState<any>();
  const [ProductData, setProductData] = useState<any[]>([]);
  const handleCardSelect = (data: any) => {
    setSelectedCards(data);
  };

  const isReadonly = selectedCards?.id ? false : true;

  const handleApply = async (id: string) => {
    const data = { ...payload, product_id: id };
    try {
      const response = await createAffiliateSpecificProduct(data);
      showNotification("success", "Product added successfully");
      setPayload(initialPayload);
      setSelectedCards(null);
      router.push('/affiliate/programs')
      console.log(response?.result);
    } catch (error: any) {
      showNotification("error", error?.data.error || "failed to add product");
      console.log(error);
    }
  };

  const handleGetStoreProducts = async () => {
    if (!store) return;
    try {
      const response = await getStoresProducts(store?.id);
      setProductData(response?.result);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (store) {
      handleGetStoreProducts();
    }
  }, [store]);

  return (
    <Container className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between py-5 mt-10 md:mt-0">
        <Heading level={1} className="text-textsecondary mb-4 md:mb-0">
          Specific Products
        </Heading>
        <div className="mt-2">
          <Link href="/affiliate/programs/add-program">
            <Heading level={5} className="whitespace-normal text-sm">
              ← Back to add program
            </Heading>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-end">
        <Input
          type="text"
          label="Title"
          labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
          className="bg-backgroundcolor"
          disabled={isReadonly}
          onChange={(e) => setPayload({ ...payload, title: e.target.value })}
        />
        <Input
          type="digit"
          label="Original Price"
          labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
          className="bg-backgroundcolor"
          value={`$ ${selectedCards?.base_price ?? 0}`}
          disabled={true}
        />
        <Input
          type="digit"
          label="Discounted Price"
          labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
          className="bg-backgroundcolor"
          value={`$ ${productPrice(
            selectedCards?.base_price ?? 0,
            selectedCards?.discount ?? 0,
            selectedCards?.discount_type ?? "percentage"
          ).toFixed(1)}`}
          disabled={true}
        />
        <Input
          type="identifier"
          label="Marketer Comission Amount"
          labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
          className="bg-backgroundcolor"
          disabled={isReadonly}
          inputMode="numeric"
          onChange={(e) =>
            setPayload({ ...payload, commission_fixed: Number(e.target.value) })
          }
        />
        <Input
          type="date"
          label="Start Date"
          labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
          className="bg-backgroundcolor"
          disabled={isReadonly}
          onChange={(e) =>
            setPayload({ ...payload, start_date: e.target.value })
          }
        />
        <Input
          type="date"
          label="End Date"
          labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
          className="bg-backgroundcolor"
          disabled={isReadonly}
          onChange={(e) => setPayload({ ...payload, end_date: e.target.value })}
        />
        <Input
          type="identifier"
          label="Maximum Amount Comission"
          labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
          className="bg-backgroundcolor"
          disabled={isReadonly}
          inputMode="numeric"
          onChange={(e) =>
            setPayload({
              ...payload,
              max_commission_amount: Number(e.target.value),
            })
          }
        />
        <div></div>
        <div></div>
        <div>
          <Button
            title="Apply"
            isPrimary
            className="w-full"
            onClick={() => {
              handleApply(selectedCards?.id);
            }}
          />
        </div>
      </div>
      <div className="">
        <VendorProducts
          disablePreview
          data={ProductData}
          onSelect={handleCardSelect}
          selected={selectedCards?.id}
        />
      </div>
    </Container>
  );
}

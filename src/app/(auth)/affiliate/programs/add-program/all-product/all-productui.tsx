"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Base/Button";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import Input from "@/components/Base/Input";
import Link from "next/link";
import { getStoresProducts } from "@/services/vendor";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux";
import { createAffiliateAllProduct } from "@/services/affiliate";
import { showNotification } from "@/utility/snackBar";
import { useRouter } from "next/navigation";

type Payload = {
  title: string;
  start_date: string;
  end_date: string;
  commission_percentage: number | null;
  max_commission_amount: number | null;
  promo_code: string;
  products: string[];
};

const initialPayload: Payload = {
  title: "",
  start_date: "",
  end_date: "",
  commission_percentage: null,
  max_commission_amount: null,
  promo_code: "",
  products: [],
};

export default function AddAllProductAffiliateProgram() {
  const store = useSelector((state: RootState) => state?.storeReducer?.store);
  let router = useRouter()
  const [payload, setPayload] = useState<Payload>(initialPayload);

  const handleCreateAffiliateProgram = async () => {
    try {
      const response = await createAffiliateAllProduct(payload);
      setPayload(initialPayload);
      router.push('/affiliate/programs')
      showNotification("success", "Affiliate program created successfully");
      console.log(response);
    } catch (error: any) {
      showNotification(
        "error", "failed to create program"
      );
      console.log(error);
    }
  };

  const handleGetStoreProducts = async () => {
    if (!store) return;
    try {
      const response = await getStoresProducts(store?.id);
      const productsId = response?.result?.map((product: any) => product.id);
      setPayload({ ...payload, products: productsId });
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
    <Container className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="rounded-md text-center items-center w-full">
        <div className="space-y-8 py-12 md:py-20 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1"></div>
            <div className="col-span-1">
              <Heading
                level={2}
                className="whitespace-pre-wrap text-lg font-semibold text-textsecondary"
              >
                How much percentage
                <br /> are you willing to offer the affiliate
              </Heading>
            </div>
            <div className="col-span-1 flex justify-end">
              <Link href="/affiliate/programs/add-program">
                <Heading level={6} className="whitespace-normal text-sm">
                  ← Back to add program
                </Heading>
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full text-start space-y-2">
              <Input
                type="text"
                label="Title"
                placeholder="Title"
                labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
                className="bg-backgroundcolor"
                value={payload?.title}
                onChange={(e) =>
                  setPayload({ ...payload, title: e.target.value })
                }
              />
            </div>
            <div className="w-full text-start space-y-2">
              <Input
                type="date"
                label="Start Date"
                labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
                className="bg-backgroundcolor"
                value={payload?.start_date}
                onChange={(e) =>
                  setPayload({ ...payload, start_date: e.target.value })
                }
              />
            </div>
            <div className="w-full text-start space-y-2">
              <Input
                type="date"
                label="End Date"
                labelClassName="text-xs md:text-[1.125rem] text-[#656565] truncate"
                className="bg-backgroundcolor"
                value={payload?.end_date}
                onChange={(e) =>
                  setPayload({ ...payload, end_date: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full text-start space-y-2">
              <Heading level={4} className="text-textsecondary">
                Commission percentage
              </Heading>
              <Input
                type="identifier"
                className="w-full"
                placeholder="Commission percentage"
                value={payload?.commission_percentage?.toString()}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    commission_percentage: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-full text-start space-y-2">
              <Heading level={4} className="text-textsecondary">
                Max commission amount
              </Heading>
              <Input
                type="identifier"
                className="w-full"
                placeholder="Max commission amount"
                value={payload?.max_commission_amount?.toString()}
                onChange={(e) =>
                  setPayload({
                    ...payload,
                    max_commission_amount: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="w-full text-start space-y-2">
              <Heading level={4} className="text-textsecondary">
                Promo code
              </Heading>
              <Input
                type="text"
                className="w-full"
                placeholder="Promo code"
                value={payload?.promo_code}
                onChange={(e) =>
                  setPayload({ ...payload, promo_code: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-full text-start space-y-2">
              <div className="w-full text-start space-y-2 flex justify-end">
                <Button
                  title="Proceed"
                  isPrimary
                  className="w-full md:w-1/3"
                  onClick={() => {
                    handleCreateAffiliateProgram();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

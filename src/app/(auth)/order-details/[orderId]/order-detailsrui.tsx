"use client";
import React, { use, useEffect, useState } from "react";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import BaseImage from "@/components/Base/BaseImage";
import { useParams } from "next/navigation";
import { showNotification } from "@/utility/snackBar";
import { getOrderById } from "@/services/vendor";

export default function OrderDetails() {
  const { orderId } = useParams();
  console.log("Order ID", orderId);

  const [order, setOrder] = useState<any>(null);

  const getOrder = async () => {
    if (!orderId) return;
    try {
      const res = await getOrderById({
        order_id: Array.isArray(orderId) ? orderId[0] : orderId,
      });
      const data = res?.result;
      if (data) {
        setOrder(data);
      }
      console.log("Api Response", res);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    if (orderId) {
      getOrder();
    } else {
      console.log("Order Id not found");
      showNotification("error", "Order Id not found");
    }
  }, []);

  if (!order) return;
  console.log("Order Data", order);

  return (
    <Container>
      <div className="flex flex-col md:flex-row p-5 mt-10 md:mt-0">
        <Heading level={1} className="text-textsecondary mb-4 md:mb-0">
          Order Details
        </Heading>
      </div>
      <div className="flex flex-col md:flex-row p-5 gap-6">
        <span className="flex flex-row gap-2">
          <Heading level={5} className="text-paracolor">
            Order ID#
          </Heading>
          <label className="font-semibold">{order?.id.slice(0, 8)}</label>
        </span>
        <span className="flex flex-row gap-2">
          <span className="p-3 rounded-full bg-primary"></span>
          <label className="text-paracolor">{order?.status}</label>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white p-12 border border-inputborder rounded-md gap-4">
        <div className="col-span-2 items-start text-start">
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 sm:gap-0">
            <div
              className="rounded-full flex items-center gap-4 w-full sm:w-auto"
              style={{ maxWidth: "100%", height: "auto" }}
            >
              <BaseImage
                src={
                  order?.user?.profile_image?.includes("https://")
                    ? order?.user?.profile_image
                    : "/assets/images/placeholder.png"
                }
                height={60}
                width={60}
                alt="Profile-Pic"
                className="rounded-full w=16 h-16 object-cover"
              />
              <div className="flex flex-col items-start">
                <Heading level={2} className="font-medium">
                  {order?.user?.name}
                </Heading>
              </div>
            </div>
          </div>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
          <Heading level={3}>Personal Information</Heading>
        </div>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1">
            <label className="text-paracolor text-sm">First Name</label>
            <Heading level={5}>{order?.user?.name}</Heading>
          </div>
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Email</label>
            <Heading level={5}>{order?.email}</Heading>
          </div>
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Phone</label>
            <Heading level={5}>+{order?.phone}</Heading>
          </div>
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Address</label>
            <Heading level={5}>{order?.address}</Heading>
          </div>
        </div>
        <hr className="col-span-2" />
        <div className="col-span-2">
          <Heading level={3}>Product</Heading>
        </div>
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Product Name</label>
            <Heading level={5}>{order?.product?.name}</Heading>
          </div>
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Color</label>
            <Heading level={5}>Pink</Heading>
          </div>
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Payment Method</label>
            <Heading level={5}>Cash on Delivery</Heading>
          </div>
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Quantity</label>
            <Heading level={5}>1</Heading>
          </div>
          <div className="col-span-1">
            <label className="text-paracolor text-sm">Prices</label>
            <Heading level={5}>$ {order?.product?.price}</Heading>
          </div>
        </div>
      </div>
    </Container>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Input from "../Base/Input";
import Button from "../Base/Button";
import Heading from "../Base/Heading";
import { twMerge } from "tailwind-merge";
import { OrdersList } from "@/constants/Enum";
import { OrderData } from "@/constants/Data";
import UpdateStatusModal from "../Modals/UpdateStatusModal";
import { options } from "./AllOrder";
import api from "@/services";
import { Option } from "@/constants/Types";
import { updateOrdersStatus } from "@/services/vendor";

export default function Shipped(props: any) {
  const { shippedOrder, getAllOrders } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlerDeliveryStatus = async (id: string) => {
    if (selectedOption && id) {
      const body = {
        id: id,
        status: selectedOption?.value,
      };
      try {
        const response = await updateOrdersStatus(body);
        getAllOrders();
        console.log("Update status Response :", response);
        closeModal();
      } catch (error) {
        console.log("Update Status Error", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="p-4 bg-white border border-solid border-paracolor rounded-md">
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="w-full">
          <Input
            type="identifier"
            prefixIcon="/assets/images/search.png"
            placeholder="Search for order ID, customer, order status or something..."
          />
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <Button prefixIcon="/assets/images/filters.png" title="Filters" />
          <Button
            prefixIcon="/assets/images/attachements.png"
            title="Attachment"
          />
          <Button prefixIcon="/assets/images/export.png" title="Export" />
        </div>
      </div>

      <div className="hidden sm:grid grid-cols-6 gap-4 text-center">
        <Heading level={5} className="truncate">
          Order ID
        </Heading>
        <Heading level={5} className="truncate">
          Customer
        </Heading>
        <Heading level={5} className="truncate">
          Order
        </Heading>
        <Heading level={5} className="truncate">
          Delivery Date
        </Heading>
        <Heading level={5} className="truncate">
          Delivery Pricing
        </Heading>
        <Heading level={5} className="truncate">
          Delivery Status
        </Heading>
      </div>

      <hr className="mt-2 mb-4" />

      <div className="md:grid hidden grid-cols-6 gap-4 text-center text-sm">
        {shippedOrder &&
          shippedOrder?.map((order: any, index: number) => (
            <React.Fragment key={index}>
              <div className="text-[#656565] truncate" title={order?.id}>
                {order?.id}
              </div>
              <div className="truncate" title={order?.user?.name}>
                {order?.user?.name}
              </div>
              <div className="truncate" title={order?.product?.name}>
                {order?.product?.name}
              </div>
              <div className="truncate" title={order?.delivery_date}>
                {order?.pricing}
              </div>
              <div className="truncate" title={order?.pricing}>
                {order?.pricing}
              </div>
              <div
                onClick={openModal}
                className={twMerge(
                  "px-3 rounded-full text-white h-5 truncate cursor-pointer",
                  order.status === OrdersList.SHIPPED && "bg-[#00BAE3]"
                )}
              >
                {order?.status?.toUpperCase()}
              </div>
              <div>
                {isModalOpen && (
                  <UpdateStatusModal
                    modalRef={modalRef}
                    options={options}
                    closeModal={closeModal}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    handlerDeliveryStatus={() =>
                      handlerDeliveryStatus(order.id)
                    }
                  />
                )}
              </div>
            </React.Fragment>
          ))}
      </div>

      <div className="grid grid-cols-1 sm:hidden gap-4">
        {OrderData.filter(
          (order) => order.deliveryStatus === OrdersList.SHIPPED
        ).map((order, index) => (
          <div key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
            <div className="mb-3">
              <div className="font-semibold">Order ID:</div>
              <div className="text-sm text-[#656565]" title={order.orderID}>
                {order.orderID}
              </div>
            </div>
            <div className="mb-3">
              <div className="font-semibold">Delivery Status:</div>
              <div
                className={twMerge(
                  "px-3 rounded-full text-white h-5 max-w-28 truncate",
                  order.deliveryStatus === OrdersList.SHIPPED && "bg-[#EAD72B]"
                )}
              >
                {order.deliveryStatus.toUpperCase()}
              </div>
            </div>
            <div className="mb-3">
              <div className="font-semibold">Customer:</div>
              <div className="text-sm" title={order.customerName}>
                {order.customerName}
              </div>
            </div>
            <div className="mb-3">
              <div className="font-semibold">Order:</div>
              <div className="text-sm" title={order.order}>
                {order.order}
              </div>
            </div>
            <div className="mb-3">
              <div className="font-semibold">Delivery Date:</div>
              <div className="text-sm" title={order.deilveryData}>
                {order.deilveryData}
              </div>
            </div>
            <div className="mb-3">
              <div className="font-semibold">Delivery Pricing:</div>
              <div className="text-sm" title={order.deliveryPricing}>
                $ {order.deliveryPricing}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

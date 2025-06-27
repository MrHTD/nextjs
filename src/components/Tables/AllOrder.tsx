import React, { useState, useEffect, useRef, useCallback } from "react";
import Input from "../Base/Input";
import Button from "../Base/Button";
// import Heading from "../Base/Heading";
import { twMerge } from "tailwind-merge";
import { OrdersList } from "@/constants/Enum";
// import { OrderData } from "@/constants/Data";
import { Option } from "@/constants/Types";
import Table from "../Table";
import UpdateStatusModal from "../Modals/UpdateStatusModal";
import { updateOrdersStatus } from "@/services/vendor";
import { useRouter } from 'next/navigation';
import OrderCardsMobile from "../OrderCardsMobile";


export const options = [
  { label: "Processing", value: "processing" },
  { label: "Accepted", value: "accepted" },
  { label: "Dropped-off", value: "dropped-off" },
  { label: "Shipped", value: "shipped" },
  { label: "To-ship", value: "to-ship" },
  { label: "Delayed", value: "delayed" },
  { label: "Failed", value: "failed" },
];

const headers = [
  { name: 'Order ID', key: 'orderID' },
  { name: 'Customer', key: 'customerName' },
  { name: 'Order', key: 'order' },
  { name: 'Delivery Date', key: 'delivery_date' },
  { name: 'Delivery Pricing', key: 'pricing' },
  { name: 'Pricing', key: 'pricing' },
];


export default function AllOrder(props: any) {
  const { orderData, getAllOrders } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataForRender, setDataForRender] = useState();

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  console.log("Order Data", orderData);

  useEffect(() => {
    console.log("Order Data", orderData);

    if (orderData?.length > 0) {
      console.log("data found", orderData);
      const rows = orderData.map((data: any) => {
        return {
          orderID: data?.id,
          customerName: data?.user.name,
          order: data?.product?.name,
          delivery_date: new Date(data?.delivery_date).toDateString(),
          pricing: data?.pricing,
          status: data?.status,
        }
      })
      console.log("Rows", rows);
      setDataForRender(rows);
    }
  }, [orderData]);
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

  const Status = ({ index }: { index: number }): JSX.Element => (
    <>
      <div
        key={index}
        onClick={() => openModalForRow(index)}
        className={twMerge(
          "px-3 md:py-1 rounded-full text-white  truncate text-center cursor-pointer text-[10px] md:text-md ",
          orderData?.[index ?? 0]?.status === OrdersList.CANCELED && "bg-red-500",
          orderData?.[index ?? 0]?.status === OrdersList.COMPLETED && "bg-green-500",
          orderData?.[index ?? 0]?.status === OrdersList.PENDING && "bg-gray-500",
          orderData?.[index ?? 0]?.status === OrdersList.DISPATCHED && "bg-blue-500",
          orderData?.[index ?? 0]?.status === OrdersList.SHIPPED && "bg-[#00BAE3]",
          orderData?.[index ?? 0]?.status === OrdersList.ACCEPTED && "bg-[#EAD72B]",
          orderData?.[index ?? 0]?.status === OrdersList.PROCESSING && "bg-[#8d8d8d]"
        )}
      >
        {orderData?.[index ?? 0]?.status?.toUpperCase()}
      </div>
      {isModalOpen && selectedRowIndex === index && (
        <UpdateStatusModal
          modalRef={modalRef}
          options={options}
          closeModal={closeModal}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          handlerDeliveryStatus={() =>
            handlerDeliveryStatus(orderData?.[index]?.id)
          }
        />
      )}
    </>
  );
  console.log("modal status ", isModalOpen);

  const actions = [
    {
      heading: 'Delivery Status',
      columns: [
        {
          name: 'View',
          handler: (rowId: number) => alert(`Viewing details for row ID ${rowId}`),
          render: (rowId: number, index?: number) => {
            console.log("Row ID", rowId);
            console.log("Index", index);
            return <Status index={index ?? 0} />;
          },
        },
      ],
    },
  ];

  const openModalForRow = (index: number | undefined) => {
    setSelectedRowIndex(index ?? null);
    setIsModalOpen(true);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       // closeModal();
  //     }
  //   };

  //   if (isModalOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   } else {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isModalOpen]);


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
      <div className="hidden md:block">

        {dataForRender && <Table
          defaultRowsPerPage={4}
          rowsPerPageOptions={[4, 8, 12]}
          headers={headers}
          rows={dataForRender}
          actions={actions}
          config={{ alignment: 'center' }}
          onRowDoubleClick={(row) => { router.push(`/order-details/${row.orderID}`) }}
          keyExtractor="orderID"
        />}
      </div>

      {/* Mobile view */}
      <div className="flex md:hidden flex-col gap-4">
        {orderData?.map((data: any, index: number) => (
          <div key={index} onClick={() => router.push(`/order-details/${data.id}`)}>
            <OrderCardsMobile key={index} data={data} Btn={() => <Status index={index} />} />
          </div>
        ))}
      </div>
    </div>
  );
}

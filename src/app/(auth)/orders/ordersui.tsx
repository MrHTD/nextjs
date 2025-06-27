"use client";
import React, { useEffect } from "react";
import Container from "@/components/Base/Container";
import Heading from "@/components/Base/Heading";
import Tabs from "@/components/Base/Tab";
import AllOrder from "@/components/Tables/AllOrder";
import { getOrders } from "@/services/vendor";

export default function Orders() {
  const [orderData, setOrderData] = React.useState<any[] | null>(null);
  const [pendingOrder, setPendingOrder] = React.useState<any[] | null>(null);
  const [acceptedOrder, setAcceptedOrder] = React.useState<any[] | null>(null);
  const [dispatchedOrder, setDispatchedOrder] = React.useState<any[] | null>(
    null
  );
  const [shippedOrder, setShippedOrder] = React.useState<any[] | null>(null);
  const [failedOrder, setFailedOrder] = React.useState<any[] | null>(null);
  const [delayedOrder, setDelayedOrder] = React.useState<any[] | null>(null);
  const [toShipOrder, setToShipOrder] = React.useState<any[] | null>(null);

  const getAllOrders = async () => {
    try {
      const data = await getOrders();
      const dataa = data?.result;
      if (dataa) {
        setOrderData(data?.result);
        let processing = dataa.filter(
          (item: any) => item.status === "processing"
        );
        let accepted = dataa.filter((item: any) => item.status === "accepted");
        let delayed = dataa.filter((item: any) => item.status === "delayed");
        let droppedOff = dataa.filter(
          (item: any) => item.status === "dropped-off"
        );
        let failed = dataa.filter((item: any) => item.status === "failed");
        let toShip = dataa.filter((item: any) => item.status === "to-ship");
        let shipped = dataa.filter((item: any) => item.status === "shipped");
        setPendingOrder(processing);
        setAcceptedOrder(accepted);
        setDispatchedOrder(droppedOff);
        setShippedOrder(shipped);
        setFailedOrder(failed);
        setDelayedOrder(delayed);
        setToShipOrder(toShip);
      }
      console.log("Api Response", data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const tabData = [
    {
      label: "All Orders",
      content: <AllOrder key="All Orders" orderData={orderData} getAllOrders={getAllOrders} />,
    },
    {
      label: "Processing",
      content: (
        <AllOrder key="Processing" orderData={pendingOrder} getAllOrders={getAllOrders} />
      ),
    },
    {
      label: "Accepted",
      content: (
        <AllOrder key="Accepted" orderData={acceptedOrder} getAllOrders={getAllOrders} />
      ),
    },
    {
      label: "Dropped-off",
      content: (
        <AllOrder
          key="Dropped-off" orderData={dispatchedOrder}
          getAllOrders={getAllOrders}
        />
      ),
    },
    {
      label: "Shipped",
      content: (
        <AllOrder key="Shipped" orderData={shippedOrder} getAllOrders={getAllOrders} />
      ),
    },
    {
      label: "To ship",
      content: (
        <AllOrder key="To Ship" orderData={toShipOrder} getAllOrders={getAllOrders} />
      ),
    },
    {
      label: "Delayed",
      content: (
        <AllOrder key="Delayed" orderData={delayedOrder} getAllOrders={getAllOrders} />
      ),
    },
    {
      label: "Failed",
      content: (
        <AllOrder key="Failed" orderData={failedOrder} getAllOrders={getAllOrders} />
      ),
    },
  ];

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <Container className="flex-grow">
      <Heading level={1} className="text-textsecondary p-5 mt-10 md:mt-0">
        Orders
      </Heading>
      <Tabs tabs={tabData} type="span" />
    </Container>
  );
}

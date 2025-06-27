import Sidebar from "@/components/Base/Sidebar";
import React from "react";
import OrderDetails from "./order-detailsrui";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <OrderDetails />
    </div>
  );
}

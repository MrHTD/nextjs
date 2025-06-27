import React from "react";
import Sidebar from "@/components/Base/Sidebar";
import VendorPayments from "./payments";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor w-full">
      <Sidebar />
      <VendorPayments />
    </div>
  );
}

import React from "react";
import Sidebar from "@/components/Base/Sidebar";
import ProductListing from "./product-listingui";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <ProductListing />
    </div>
  );
}

import React from "react";
import Sidebar from "@/components/Base/Sidebar";
import AffiliateSpecificProduct from "./specific-productui";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <AffiliateSpecificProduct />
    </div>
  );
}

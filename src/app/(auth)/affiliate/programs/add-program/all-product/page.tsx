import React from "react";
import Sidebar from "@/components/Base/Sidebar";
import AddAllProductAffiliateProgram from "./all-productui";
export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <AddAllProductAffiliateProgram />
    </div>
  );
}

import React from "react";
import Sidebar from "@/components/Base/Sidebar";
import AddAffiliateProgram from "./add-programui";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <AddAffiliateProgram />
    </div>
  );
}

import React from "react";
import Sidebar from "@/components/Base/Sidebar";
import AffiliatePrograms from "./programsui";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <AffiliatePrograms />
    </div>
  );
}

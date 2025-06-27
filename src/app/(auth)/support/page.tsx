import React from "react";
import Sidebar from "@/components/Base/Sidebar";
import Support from "./supportui";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <Support />
    </div>
  );
}

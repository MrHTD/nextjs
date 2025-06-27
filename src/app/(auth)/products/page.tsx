import React from "react";
import Products from "./productsui";
import Sidebar from "@/components/Base/Sidebar";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <Products />
    </div>
  );
}

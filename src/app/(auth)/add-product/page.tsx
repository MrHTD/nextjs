import React, { Suspense } from "react";
import Sidebar from "@/components/Base/Sidebar";
import AddProduct from "./add-productui";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>
      <AddProduct />
      </Suspense>
    </div>
  );
}

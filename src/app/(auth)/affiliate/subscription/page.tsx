import React from "react";
import SubscriptionUI from "./subscriptionui";
import Sidebar from "@/components/Base/Sidebar";

export default async function page() {
  return (
    <div className="flex flex-row justify-start bg-backgroundcolor">
      <Sidebar />
      <SubscriptionUI />
    </div>
  );
}

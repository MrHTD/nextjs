'use client';
import React, { useEffect } from "react";
import Earnings from "@/components/EarningComponent";
import { getVendorEarnings } from "@/services/vendor";
import Heading from "@/components/Base/Heading";
import Tabs from "@/components/Base/Tab";
import IncomeStatement from "@/components/IncomeStatement";
import WalletComponent from "@/components/WalletComponent";

export default function VendorPayments() {
  const [paymentData, setPaymentData] = React.useState({
    "amount_available": 0,
    "amount_pending": 0
  })
  const getPaymentData = async () => {
    const paymentData = await getVendorEarnings()
    

    setPaymentData(paymentData?.result)
  }
  useEffect(() => {
    getPaymentData()
  }, [])

  const tabData = [
    {
      label: "Income overview",
      content: <Earnings balance={paymentData?.amount_available} pending={paymentData?.amount_pending} />,
    },
    {
      label: "Income statement",
      content: <IncomeStatement />,
    },
    {
      label: "Income details",
      content: <Earnings balance={paymentData?.amount_available} pending={paymentData?.amount_pending} />,
    },
    {
      label: "Wallet",
      content: <WalletComponent />,
    },
  ];

  return (
    // <Container className="flex-grow">
    <div className="p-4 w-full">
      <Heading level={1} className="text-textsecondary font-normal mt-10 mb-4">My income</Heading>
      <Tabs tabs={tabData} type="span" />

    </div>
    // </Container>
  );
}

"use client";
import Container from "@/components/Base/Container";
import SubscriptionsCard from "@/components/SubscriptionCard";
import { saveSubscription } from "@/config/redux/reducers/user";
import { getSubscriptions, subscribe } from "@/services/affiliate";
import { showNotification } from "@/utility/snackBar";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function SubscriptionUI() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [subscriptionData, setSubscriptionData] = useState<any>([]);

  const handleSubscribe = async (subscription_id: string) => {
    try {
      const response = await subscribe({ subscription_id });
      showNotification("success", "Subscribed Successfully");
      router.push("/affiliate/programs");
      dispatch(saveSubscription({ is_subscribed: true }));
      router.refresh()
      console.log("Subscribe Response:", response);
      window.location.reload()
    } catch (error: any) {
      if (error?.data?.error) {
        dispatch(saveSubscription({ is_subscribed: true }));
        router.refresh()
        router.push("/affiliate/programs");
        window.location.reload()
      }
      showNotification("error", error?.data?.error || "Failed to Subscribe");
      console.log("Subscribe Error:", error);
    }
  };

  const handleGetSubscriptions = async () => {
    try {
      const response = await getSubscriptions();
      setSubscriptionData(response.result);
      console.log("Get Subscriptions Response:", response.result);
    } catch (error) {
      console.log("Get Subscriptions Error:", error);
    }
  };

  useEffect(() => {
    handleGetSubscriptions();
  }, []);
  return (
    <Container className="flex w-full gap-4">
      <SubscriptionsCard
        subscriptionData={subscriptionData}
        handleSubscribe={handleSubscribe}
      />
    </Container>
  );
}

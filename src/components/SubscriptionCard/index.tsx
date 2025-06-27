"use client";
import React, { useState } from "react";
import Heading from "@/components/Base/Heading";
import BaseImage from "@/components/Base/BaseImage";
import Button from "@/components/Base/Button";
import { twMerge } from "tailwind-merge";

type SubscriptionsCardProps = {
  subscriptionData: any;
  handleSubscribe: (subscription_id: string) => void;
};

export default function SubscriptionsCard(
  subscriptionProps: SubscriptionsCardProps
) {
  const { subscriptionData, handleSubscribe } = subscriptionProps;
  const [selectedSubscription, setSelectedSubscription] = useState<
    number | null
  >(0);

  const handleCardClick = (index: number) => {
    setSelectedSubscription(index);
    handleSubscribe(subscriptionData[index].id);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-32 bg-white max-w-6xl rounded-3xl h-[30rem]">
      {subscriptionData &&
        subscriptionData?.map((data: any, index: number) => (
          <div
            key={index}
            className={twMerge(
              "relative p-3 flex items-center pb-6 rounded-3xl cursor-pointer",
              selectedSubscription === index
                ? "bg-primary text-white shadow-md"
                : ""
            )}
          >
            {selectedSubscription === index && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url(/assets/images/subsciptionBg.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "bottom right",
                  opacity: 0.2,
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
            )}
            <div className="p-4 relative z-10">
              {data?.SubscriptionRank && (
                <div className="flex justify-end">
                  <span className="text-xs bg-white rounded-full text-secondary px-4 py-2 text-right">
                    {data?.SubscriptionRank}
                  </span>
                </div>
              )}
              <Heading
                level={2}
                className={twMerge(
                  selectedSubscription === index ? "text-white" : "text-primary"
                )}
              >
                {data.amount_in_str} 
                <span
                  className={twMerge(
                    "text-sm font-normal",
                    selectedSubscription === index
                      ? "text-white"
                      : "text-gray-600"
                  )}
                >{" "}
                  {data.duration_in_str}
                </span>
              </Heading>
              <Heading
                level={2}
                className={twMerge(
                  selectedSubscription === index ? "text-white" : "text-primary"
                )}
              >
                {data?.title}
              </Heading>
              <Heading level={6} className="whitespace-pre-wrap mt-2">
                {data?.description}
              </Heading>
              <ul className="text-sm font-normal space-y-2 mt-4">
                {data?.benefits?.map((feature: any, i: number) => (
                  <li key={i} className="inline-flex gap-1 items-center">
                    <BaseImage
                      alt="Arrow-Icon"
                      src={
                        selectedSubscription === index
                          ? "/assets/images/checkcircle2.png"
                          : "/assets/images/checkcircle.png"
                      }
                      width={24}
                      height={24}
                      className="w-5 object-contain align-top"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleCardClick(index)}
                title="Choose plan"
                className={twMerge(
                  selectedSubscription === index
                    ? "text-primary w-full bg-white rounded-full mt-4"
                    : "mt-4 rounded-full w-full text-primary bg-[#a9b9ff4f] border-none"
                )}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

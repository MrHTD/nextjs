"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

interface Tab {
  label: string;
  type?: "Button" | "span";
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  type?: "Button" | "span";
  className?: string;
}

const Tabs = ({ tabs, type, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div
        className={twMerge(
          "flex w-full",
          type === "Button"
            ? "p-1 pt-2 pb-0 border border-solid rounded-md border-gray-300"
            : "flex flex-row sm:border-b border-gray-300 overflow-x-auto sm:overflow-x-visible mb-2 scrollbar-hide",
          className
        )}
      >
        {tabs.map((tab, index) => {
          console.log(tab.type);
          return type === "span" ? (
            <span
              key={index}
              className={twMerge(
                "p-4 text-center cursor-pointer w-full text-sm sm:text-base sm:w-auto",
                activeTab === index
                  ? "border-b-2 text-textsecondary text-sm sm:text-base border-textsecondary"
                  : "text-gray-500"
              )}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </span>
          ) : (
            <Button
              key={index}
              className={twMerge(
                "flex-1 py-4 text-center text-black text-sm font-normal transition-all",
                activeTab === index
                  ? "bg-primary text-white border border-primary"
                  : "bg-white border text-textsecondary border-textsecondary"
              )}
              onClick={() => setActiveTab(index)}
              title={tab.label}
            />
          );
        })}
      </div>

      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;

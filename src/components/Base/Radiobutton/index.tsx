"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  labels: string[];
  direction?: "row" | "column";
  className?: string;
}

export default function RadioButton({ labels, direction = "row",className }: Props) {
  return (
    <div
      className={twMerge(`flex ${direction === "row" ? "flex-row" : "flex-col"} gap-4`, className)}
    >
      {labels.map((label, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <input
            type="radio"
            name="custom-radio"
            id={`custom-radio-${idx}`}
            value={idx + 1}
            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
          />
          <span
            onClick={() =>
              document.getElementById(`custom-radio-${idx}`)?.click()
            }
            className="cursor-pointer"
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

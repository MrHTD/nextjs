import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  label?: string;
  labelClassName?: string;
  className?: string;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
  onChange?: (event: { target: { value: string } }) => void;
}

export default function TimeInput({
  label,
  labelClassName,
  className,
  readOnly = false,
  required = false,
  placeholder = "🕒 Select Time",
  onChange,
}: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState({ hour: 1, minute: 0, period: "AM" });
  const inputRef = useRef<HTMLDivElement | null>(null);

  const inputContent = `${time.hour}:${time.minute.toString().padStart(2, "0")} ${time.period}`;
  
  const handleTimeChange = (type: string, value: number) => {
    // Validate and restrict input
    let validValue = value;
    
    if (type === "hour") {
      // Ensure hour is between 1 and 12
      if (value <= 0) validValue = 1;
      else if (value > 12) validValue = 12;
    } else if (type === "minute") {
      // Ensure minute is between 0 and 59
      if (value < 0) validValue = 0;
      else if (value > 59) validValue = 59;
    }

    const newTime = {
      ...time,
      [type]: validValue,
      period:
        type === "hour" && validValue === 12
          ? time.period === "AM"
            ? "PM"
            : "AM"
          : time.period,
    };
    setTime(newTime);
    if (onChange) onChange({ target: { value: inputContent } });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowTimePicker(false); // Close dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={inputRef}>
      {label && (
        <label
          className={twMerge(
            "block text-[1.2rem] whitespace-nowrap font-medium mb-2",
            required && "after:content-['*'] after:text-red-500 after:ml-1",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div
        className={twMerge(
          "block w-full px-2 py-3 border rounded-md focus:outline-none",
          className,
          readOnly ? "cursor-not-allowed bg-gray-100" : "cursor-pointer"
        )}
        onClick={() => !readOnly && setShowTimePicker((prev) => !prev)}
      >
        <div className="flex justify-between">
          <span className="text-gray-900 font-medium">
            {inputContent || placeholder}
          </span>
          <span className="ml-auto text-gray-900 font-medium">&#9662;</span>
        </div>
      </div>

      {showTimePicker && !readOnly && (
        <div className="absolute top-full left-0 mt-2 w-full p-4 border bg-white rounded-lg shadow-lg z-10">
          <div className="flex gap-2 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-medium text-gray-700">Hour</label>
              <input
                type="number"
                min={1}
                max={12}
                value={time.hour}
                onChange={(e) =>
                  handleTimeChange("hour", Number(e.target.value))
                }
                className="w-12 px-2 py-1 border rounded-md text-[10px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[10px] font-medium text-gray-700">Minute</label>
              <input
                type="number"
                min={0}
                max={59}
                value={time.minute}
                onChange={(e) =>
                  handleTimeChange("minute", Number(e.target.value))
                }
                className="w-12 px-2 py-1 border rounded-md text-[10px]"
              />
            </div>
            <button
              onClick={() =>
                setTime((prev) => {
                  const newTime = {
                    ...prev,
                    period: prev.period === "AM" ? "PM" : "AM",
                  };
                  if (onChange) onChange({ target: { value: inputContent } });
                  return newTime;
                })
              }
              className="px-2 py-1 border text-[10px] rounded-md bg-gray-200 hover:bg-gray-300"
            >
              {time.period}
            </button>
          </div>
          <button
            onClick={() => setShowTimePicker(false)}
            className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md text-[10px]"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  label?: string;
  labelClassName?: string;
  className?: string;
  readOnly?: boolean;
  required?: boolean;
  placeholder?: string;
}

export default function CalendarInput({
  label,
  labelClassName,
  className,
  readOnly = false,
  required = false,
  placeholder = "🗓 Select",
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [time, setTime] = useState({ hour: 1, minute: 0, period: "AM" });

  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      selectedDate?.getFullYear() || new Date().getFullYear(),
      selectedDate?.getMonth() || new Date().getMonth(),
      day
    );
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  const handleTimeChange = (type: string, value: number) => {
    setTime((prev) => ({
      ...prev,
      [type]: value,
      period:
        type === "hour" && value === 12
          ? prev.period === "AM"
            ? "PM"
            : "AM"
          : prev.period,
    }));
  };

  const currentMonth = selectedDate?.getMonth() || new Date().getMonth();
  const currentYear = selectedDate?.getFullYear() || new Date().getFullYear();
  const days = Array.from(
    { length: daysInMonth(currentYear, currentMonth) },
    (_, i) => i + 1
  );

  const inputContent = selectedDate
    ? `${selectedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}, ${time.hour}:${time.minute.toString().padStart(2, "0")} ${
        time.period
      }`
    : placeholder;

  return (
    <div className="relative w-full">
      {label && (
        <label
          className={twMerge(
            "block text-[1.2rem] whitespace-nowrap text-ellipsis font-medium mb-2",
            required && "after:content-['*'] after:text-red-500 after:ml-1",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      {/* Input Field */}
      <div
        className={twMerge(
          "block w-full px-2 py-3 border border-inputborder rounded-md focus:outline-none focus:ring-primary focus:border-primary",
          className,
          readOnly ? "cursor-not-allowed bg-gray-100" : "cursor-pointer"
        )}
        onClick={() => !readOnly && setShowCalendar((prev) => !prev)}
      >
        <div className="flex justify-between">
          <span
            className={twMerge(
              "block text-sm",
              selectedDate ? "text-gray-900 font-medium" : "text-gray-400"
            )}
          >
            {inputContent}
          </span>
          <span
            className={twMerge(
              "ml-auto text-secondary",
              selectedDate ? "text-gray-900 font-medium" : "text-gray-400"
            )}
          >
            &#9662;
          </span>
        </div>
      </div>

      {/* Calendar and Time Picker */}
      {showCalendar && !readOnly && (
        <div className="absolute top-full left-0 mt-2 w-full p-4 border bg-white rounded-lg shadow-lg z-10">
          {/* Calendar */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate?.getFullYear() || currentYear,
                    (selectedDate?.getMonth() || currentMonth) - 1
                  )
                )
              }
              className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              &lt;
            </button>
            <span className="text-lg font-medium">
              {selectedDate
                ? selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : new Date().toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
            </span>
            <button
              onClick={() =>
                setSelectedDate(
                  new Date(
                    selectedDate?.getFullYear() || currentYear,
                    (selectedDate?.getMonth() || currentMonth) + 1
                  )
                )
              }
              className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
              <span key={index} className="text-gray-500 font-medium">
                {day}
              </span>
            ))}
            {Array.from({
              length: new Date(currentYear, currentMonth, 1).getDay(),
            }).map((_, i) => (
              <span key={i}></span>
            ))}
            {days.map((day) => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`px-2 py-1 rounded-md ${
                  day === selectedDate?.getDate()
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Time Picker */}
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Hour
              </label>
              <input
                type="number"
                min={1}
                max={12}
                value={time.hour}
                onChange={(e) =>
                  handleTimeChange("hour", Number(e.target.value))
                }
                className="w-16 px-2 py-1 border rounded-md text-gray-900 shadow-sm focus:ring focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Minute
              </label>
              <input
                type="number"
                min={0}
                max={59}
                value={time.minute}
                onChange={(e) =>
                  handleTimeChange("minute", Number(e.target.value))
                }
                className="w-16 px-2 py-1 border rounded-md text-gray-900 shadow-sm focus:ring focus:ring-primary focus:border-primary"
              />
            </div>
            <button
              onClick={() =>
                setTime((prev) => ({
                  ...prev,
                  period: prev.period === "AM" ? "PM" : "AM",
                }))
              }
              className="px-4 py-1 border rounded-md text-gray-900 bg-gray-200 hover:bg-gray-300 shadow-sm"
            >
              {time.period}
            </button>
          </div>

          {/* Confirm Button */}
          <button
            onClick={() => setShowCalendar(false)}
            className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primarydark"
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ScrollableProps {
  type: "arrow";
  children: React.ReactNode;
  oneItemFullFrame?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}

export default function CarouselForProduct({
  type,
  children,
  oneItemFullFrame = false,
  containerClassName,
  contentClassName,
}: ScrollableProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const childrenArray = React.Children.toArray(children);
      setTotalItems(childrenArray.length);
    }
  }, [children]);

  const scrollBy = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const childWidth =
        oneItemFullFrame || !scrollContainerRef.current.firstChild
          ? containerWidth
          : (scrollContainerRef.current.firstChild as HTMLElement).offsetWidth;

      let newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;

      if (newIndex < 0) newIndex = 0;
      if (newIndex >= totalItems) newIndex = totalItems - 1;

      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -childWidth : childWidth,
        behavior: "smooth",
      });

      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, clientWidth } = scrollContainerRef.current;
        const childWidth =
          oneItemFullFrame || !scrollContainerRef.current.firstChild
            ? clientWidth
            : (scrollContainerRef.current.firstChild as HTMLElement)
                .offsetWidth;

        const newIndex = Math.round(scrollLeft / childWidth);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
          }
        }, 100);
      }
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [oneItemFullFrame, children, currentIndex]);

  return (
    <div className={twMerge("relative w-full p-5", containerClassName)}>
      {type === "arrow" && (
        <button
          onClick={() => scrollBy("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-none bg-transparent"
        >
          <span className="text-primary text-4xl">&lt;</span>
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className={twMerge(
          "flex items-center gap-5 overflow-x-auto scrollbar-hide",
          oneItemFullFrame ? "scroll-snap-x snap-mandatory" : "",
          contentClassName
        )}
        style={{
          scrollSnapType: oneItemFullFrame ? "x mandatory" : undefined,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex justify-center item-center align-middle w-full h-full p-0"
            style={{
              width: oneItemFullFrame
                ? `${scrollContainerRef.current?.clientWidth || 0}px`
                : "auto",
              scrollSnapAlign: oneItemFullFrame ? "start" : undefined,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      {type === "arrow" && (
        <button
          onClick={() => scrollBy("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-transparent rounded-none"
        >
          <span className="text-primary text-4xl ">&gt;</span>
        </button>
      )}
      
      {/* Pagination at the Bottom */}
      {type === "arrow" && oneItemFullFrame && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-transparent text-textsecondary text-2xl px-4 py-2 rounded-full">
          {currentIndex + 1} / {totalItems}
        </div>
      )}
    </div>
  );
}

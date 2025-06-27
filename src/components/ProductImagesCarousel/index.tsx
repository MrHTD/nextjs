import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface ProductImagesCarouselProps {
  children: React.ReactNode;
  oneItemFullFrame?: boolean;
  containerClassName?: string;
  contentClassName?: string;
}

export default function ProductImagesCarousel({
  children,
  oneItemFullFrame = false,
  containerClassName,
  contentClassName,
}: ProductImagesCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [dotStartIndex, setDotStartIndex] = useState(0);
  const maxVisibleDots = 4; // Number of visible dots

  useEffect(() => {
    if (scrollContainerRef.current) {
      const childrenArray = React.Children.toArray(children);
      setTotalItems(childrenArray.length);
    }
  }, [children]);

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;

      scrollContainerRef.current.scrollTo({
        left: containerWidth * index,
        behavior: "smooth",
      });

      setCurrentIndex(index);
    }
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    let newIndex = currentIndex;
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    } else {
      newIndex = currentIndex < totalItems - 1 ? currentIndex + 1 : totalItems - 1;
    }
    scrollToIndex(newIndex);

    // Update visible dots range
    if (direction === "prev" && currentIndex === dotStartIndex) {
      setDotStartIndex((prev) => Math.max(prev - 1, 0));
    } else if (direction === "next" && currentIndex === dotStartIndex + maxVisibleDots - 1) {
      setDotStartIndex((prev) => Math.min(prev + 1, totalItems - maxVisibleDots));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, clientWidth } = scrollContainerRef.current;
        const childWidth = oneItemFullFrame
          ? clientWidth
          : (scrollContainerRef.current.firstChild as HTMLElement)?.offsetWidth;

        const newIndex = Math.round(scrollLeft / childWidth);
        setCurrentIndex(newIndex);
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
    };
  }, [oneItemFullFrame, children]);

  return (
    <div className={twMerge("w-full", containerClassName)}>
      {/* Image Container */}
      <div
        ref={scrollContainerRef}
        className={twMerge(
          "flex items-center gap-5 overflow-x-auto scrollbar-hide object-cover",
          oneItemFullFrame ? "snap-x snap-mandatory" : "",
          contentClassName
        )}
        style={{
          scrollSnapType: oneItemFullFrame ? "x mandatory" : undefined,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="flex-shrink-0 object-cover"
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

      {/* Arrows and Dots Navigation */}
      <div className="flex justify-between items-center mt-4">
        {/* Left Arrow */}
        <button
          onClick={() => handleArrowClick("prev")}
          className="text-textsecondary"
        >
          <IoIosArrowBack size={23} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: totalItems })
            .slice(dotStartIndex, dotStartIndex + maxVisibleDots)
            .map((_, index) => {
              const realIndex = dotStartIndex + index;
              return (
                <button
                  key={realIndex}
                  onClick={() => scrollToIndex(realIndex)}
                  className={twMerge(
                    "w-2 h-2 rounded-full",
                    currentIndex === realIndex ? "bg-textsecondary" : "bg-gray-400"
                  )}
                />
              );
            })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => handleArrowClick("next")}
          className="text-textsecondary"
        >
          <IoIosArrowForward size={23} />
        </button>
      </div>
    </div>
  );
}

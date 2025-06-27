"use client";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface Prop {
  className?: string;
  initialQuantity?: number;
  max?: number;
  getQuantity?: (e: number) => void,
}
const QuantitySelector = ({
  className,
  initialQuantity = 1,
  max = 10,
  getQuantity,
}: Prop) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    if (quantity < max) {
      if(getQuantity) getQuantity(quantity + 1);
      setQuantity(quantity + 1);
    }
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      if(getQuantity) getQuantity(quantity + 1);
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className={twMerge("flex items-center gap-4", className)}>
      <button
        onClick={handleDecrease}
        className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
        disabled={quantity <= 1}
      >
        <FaMinus size={14} />
      </button>
      <span className="text-lg font-semibold">{quantity}</span>
      <button
        onClick={handleIncrease}
        className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400 disabled:bg-gray-200"
        disabled={quantity >= max}
      >
        <FaPlus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;

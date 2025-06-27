import React, { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

type Option = {
  label: string;
  value: string;
  link?: string;
  placeholder?: string;
  replace?: boolean;
};

type Props = Partial<{
  options: Option[];
  selectedOption: Option | null;
  setSelectedOption: (option: Option) => void;
  placeholder: string;
  className: string;
  disabled: boolean;
}>;

const AutoCompleteDropdown: React.FC<Props> = ({
  options = [],
  selectedOption = null,
  setSelectedOption = () => {},
  placeholder = "Select an option",
  className = "",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(selectedOption?.label || '' ); // State for search input
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSearchTerm(selectedOption?.label || '');
  }, [selectedOption]);
  
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.label); // Update search term with selected option
    setIsOpen(false);
  };

  console.log('selectedOption', selectedOption);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div
        className={twMerge(
          "w-full text-left px-3 py-3 border border-gray-300 rounded-md focus-within:ring-primary focus-within:border-primary",
          className
        )}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-transparent focus:outline-none"
          disabled={disabled}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <span className="inline-block w-2.5 h-2.5 border-b-2 border-r-2 border-gray-600 rotate-45" />
        </span>
      </div>
      {isOpen && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="max-h-48 overflow-y-auto">
            {filteredOptions.map((option) => (
              <li key={option.value} onClick={() => handleOptionClick(option)}>
                {option.link ? (
                  <Link
                    href={option.link}
                    replace={option?.replace}
                    passHref
                    className="block px-4 py-3 cursor-pointer hover:bg-primary hover:text-white transition duration-200 ease-in-out"
                  >
                    {option.label}
                  </Link>
                ) : (
                  <span className="block px-4 py-3 cursor-pointer hover:bg-primary hover:text-white transition duration-200 ease-in-out">
                    {option.label}
                  </span>
                )}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="px-4 py-3 text-gray-500">No options found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoCompleteDropdown;

import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { Country } from "@/constants/Types";
import BaseImage from "../Base/BaseImage";

interface CountryDropdownProps {
  countryList: Country[];
  selectedCountry: Country | null;
  setSelectedCountry: (country: Country) => void;
  className?: string;
  onInput?: (e: any) => void;
  disabled?: boolean;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  countryList,
  selectedCountry,
  setSelectedCountry,
  className,
  onInput,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedCountry && countryList.length > 0) {
      setSelectedCountry(countryList[0]);
    }
  }, [countryList, selectedCountry, setSelectedCountry]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={twMerge("relative w-full flex items-center", className)}
      ref={dropdownRef}
    >
      <div className="relative flex-initial">
        <button
          onClick={toggleDropdown}
          className="flex items-center border border-gray-300 rounded-l-md px-3 py-3 transition-all duration-200 w-auto"
          style={{ minWidth: "100px" }}
          disabled={disabled}
        >
          {selectedCountry && (
            <>
              <BaseImage
                src={selectedCountry.flag}
                alt={selectedCountry.name}
                width={20}
                height={20}
                className="mr-2"
              />
              <span className="text-secondary">{selectedCountry.code}</span>
            </>
          )}
          <span className="ml-auto text-secondary">&#9662;</span>
        </button>

        {isOpen && (
          <ul
            className="absolute left-0 w-full mt-1 border border-gray-300 rounded-md bg-white shadow-lg z-10 transition-opacity duration-200"
            style={{ opacity: isOpen ? 1 : 0 }}
          >
            {countryList.map((country) => (
              <li
                key={country.code}
                onClick={() => handleCountrySelect(country)}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
              >
                <BaseImage
                  src={country.flag}
                  alt={country.name}
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <span>{country.code}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="0123456789"
        maxLength={10}
        className="px-3 py-3 w-full ml-0 border border-gray-300 rounded-r-md focus:outline-none focus:ring-primary focus:border-primary"
        onInput={onInput}
        disabled={disabled}
      />
    </div>
  );
};

export default CountryDropdown;

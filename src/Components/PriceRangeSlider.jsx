import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const PriceRangeSlider = ({ headingTitle, min, max }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value >= min && value <= maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value <= max && value >= minPrice) {
      setMaxPrice(value);
    }
  };

  const handleMaxSliderChange = (e) => {
    const value = Number(e.target.value);
    setMaxPrice(value);
  };

  return (
    <div className="border border-gray-200 rounded-2xl bg-white flex flex-col">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[18px] leading-[27px] font-semibold text-black">
            {headingTitle}
          </p>
          <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
        </div>
        <ChevronDown
          className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] p-4 pt-0" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-1 w-1/2">
              <label
                htmlFor="price-from"
                className="text-sm font-medium text-gray-500"
              >
                From
              </label>
              <input
                type="number"
                id="price-from"
                className="w-full p-2 border border-gray-300 rounded-md text-center"
                value={minPrice}
                onChange={handleMinChange}
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label
                htmlFor="price-to"
                className="text-sm font-medium text-gray-500"
              >
                To
              </label>
              <input
                type="number"
                id="price-to"
                className="w-full p-2 border border-gray-300 rounded-md text-center"
                value={maxPrice}
                onChange={handleMaxChange}
              />
            </div>
          </div>

          <div className="relative h-1 w-full bg-gray-200 rounded-full mt-4">
            <div
              className="absolute h-full rounded-full"
              style={{
                backgroundColor: "#f88e0f",
                left: `0%`,
                width: `${(maxPrice / max) * 100}%`,
                zIndex: 1,
              }}
            />

            <input
              type="range"
              min={min}
              max={max}
              value={maxPrice}
              onChange={handleMaxSliderChange}
              className="absolute w-full h-full appearance-none bg-transparent outline-none cursor-pointer slider-thumb"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

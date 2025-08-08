import React, { useState } from "react";
import { MoveRight, ChevronDown } from "lucide-react";

// This is a reusable, collapsible component for displaying an active filter list.
const FilterActiveComponent = ({
  items,
  headingTitle,
  hoveredItem,
  setHoveredItem,
  selectedItem,
  setSelectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-xl bg-white flex flex-col">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[18px] leading-[27px] font-semibold text-black">
            {headingTitle}
          </p>
          {/* <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" /> */}
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
        <div
          onMouseLeave={() => setHoveredItem(null)}
          className="flex flex-col gap-2 w-full"
        >
          {items.map((item) => {
            const isActive =
              hoveredItem === item._id || selectedItem === item.sub_category;
            return (
              <div
                key={item._id}
                className={`flex w-full items-center cursor-pointer transition-colors duration-300 ${
                  isActive ? "text-[#00bbae]" : "text-[#69778a]"
                }`}
                onMouseEnter={() => setHoveredItem(item._id)}
                onClick={() => setSelectedItem(item.sub_category)}
              >
                <MoveRight
                  className={`w-5 h-5 ${isActive ? "block" : "hidden"}`}
                />
                <p
                  className={`text-[16px] leading-[24px] font-semibold transition-transform duration-500 ${
                    isActive ? "translate-x-1" : "translate-x-0"
                  }`}
                >
                  {item.sub_category}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterActiveComponent;

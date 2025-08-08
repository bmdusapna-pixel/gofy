import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // Using Lucide React for the chevron icon

// FilterCategory is now an accordion component.
const FilterCategory = ({
  items,
  hoveredItem,
  setHoveredItem,
  selectedItems,
  setSelectedItems,
  headingTitile,
}) => {
  // State to manage the open/closed state of the accordion
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the accordion state
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (title) => {
    const updatedItems = selectedItems.includes(title)
      ? selectedItems.filter((item) => item !== title)
      : [...selectedItems, title];
    setSelectedItems(updatedItems);
  };

  return (
    <div className="border border-gray-200 rounded-xl bg-white flex flex-col">
      {/* Accordion Header: Clickable area to toggle the content */}
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[18px] leading-[27px] font-semibold text-black">
            {headingTitile}
          </p>
          {/* <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" /> */}
        </div>
        {/* Chevron icon that rotates based on the isOpen state */}
        <ChevronDown
          className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Accordion Content: Conditionally rendered and with transition */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] p-4 pt-0" : "max-h-0"
        }`}
      >
        <div
          onMouseLeave={() => setHoveredItem(null)}
          className="flex flex-col gap-2 w-full"
        >
          {items.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredItem(item._id)}
              onClick={() => handleCheckboxChange(item.title)}
              className="flex gap-2 w-full items-center cursor-pointer text-[#69778a] hover:text-[#00bbae] transition-colors duration-300"
            >
              <input
                type="checkbox"
                checked={selectedItems.includes(item.title)}
                className="cursor-pointer w-5 h-4"
                onChange={(e) => e.stopPropagation()}
              />
              <p
                className={`text-[16px] leading-[24px] font-semibold transition-transform duration-500 ${
                  hoveredItem === item._id ? "translate-x-1" : "translate-x-0"
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;

import React from "react";

const FilterCategory = ({ items, hoveredItem, setHoveredItem, selectedItems, setSelectedItems, headingTitile, openFilter }) => {

  const handleCheckboxChange = (title) => {
    const updatedItems = selectedItems.includes(title)
      ? selectedItems.filter((item) => item !== title)
      : [...selectedItems, title];
    setSelectedItems(updatedItems);
  };

  return (
    <div onMouseLeave={() => setHoveredItem(null)} className={`${openFilter ? null : "border-gray-200 border-[2px] rounded-2xl"} bg-white p-4 flex flex-col gap-5`}>
      <div className="flex flex-col gap-2 w-full">
        <p className="text-[18px] leading-[27px] font-semibold text-black">{headingTitile}</p>
        <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        {
          items.map((item, index) => (
            <div key={index} onMouseEnter={() => setHoveredItem(item._id)} onClick={() => handleCheckboxChange(item.title)} className="flex gap-2 w-full items-center cursor-pointer text-[#69778a] hover:text-[#00bbae] transition-colors duration-300">
              <input type="checkbox" checked={selectedItems.includes(item.title)} className="cursor-pointer w-5 h-4" onChange={(e) => e.stopPropagation()} />
              <p className={`text-[16px] leading-[24px] font-semibold transition-transform duration-500 ${hoveredItem === item._id ? "translate-x-1" : "translate-x-0"}`}>{item.title}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default FilterCategory;
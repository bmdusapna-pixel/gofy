import React, { useState, useRef } from "react";

const SearchInput = ({ items }) => {
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
    const newFiltered = items.filter((item) =>
      item.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredItems(newFiltered);
    setShowSuggestions(true);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    if (search === "") {
      setFilteredItems(items);
    }
  };

  const handleItemClick = (item) => {
    setSearch(item);
    setShowSuggestions(false);
  };

  const handleBlur = (e) => {
    if (
      e.relatedTarget &&
      e.relatedTarget.parentNode === inputRef.current.nextSibling
    ) {
      return;
    }
    setTimeout(() => {
      setShowSuggestions(false);
    }, 100);
  };

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Product Name"
        className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
      />
      {showSuggestions && (
        <ul className="absolute top-full left-0 bg-white w-full rounded-md px-4 py-2 border border-gray-200 focus:border-[#00bbae] space-y-1 z-[3] max-h-[300px] overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="hover:bg-gray-100 cursor-pointer p-1 rounded-md"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No matching items</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;

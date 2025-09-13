import React, { useState, useRef, useEffect } from "react";

const SearchInput = ({ items, value, onChange }) => {
  const [filteredItems, setFilteredItems] = useState(items);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange({ name: inputValue, _id: null });
    const newFiltered = items.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredItems(newFiltered);
    setShowSuggestions(true);
    setHighlightIndex(-1);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
    if (!value?.name) {
      setFilteredItems(items);
    }
  };

  const handleItemClick = (item) => {
    onChange(item);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredItems.length - 1
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      handleItemClick(filteredItems[highlightIndex]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={inputRef}>
      <input
        type="text"
        value={value?.name || ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder="Product Name"
        className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
      />
      {showSuggestions && (
        <ul className="absolute top-full left-0 bg-white w-full rounded-md px-4 py-2 border border-gray-200 space-y-1 z-[3] max-h-[300px] overflow-y-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={item._id}
                className={`cursor-pointer p-1 rounded-md ${
                  index === highlightIndex ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
                onClick={() => handleItemClick(item)}
              >
                {item.name}
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

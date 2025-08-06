import React, { useState } from "react";

const SearchInput = ({ items }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(items);
  const handleChange = (e) => {
    setSearch(e.target.value);
    setFilter(
      items.filter((i) => i.toLowerCase().includes(search.toLowerCase()))
    );
  };
  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Product Name"
        className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
      />
      <ul
        className={`absolute top-full left-0 bg-white w-full rounded-md ${
          search &&
          !filter.includes(search) &&
          "px-4 py-2  border border-gray-200 focus:border-[#00bbae]"
        } space-y-1 z-[3] max-h-[300px] overflow-y-auto`}
      >
        {search &&
          !filter.includes(search) &&
          filter?.map((item) => (
            <li className="hover:bg-gray-100" onClick={() => setSearch(item)}>
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchInput;

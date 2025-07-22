import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search blog..."
          className="w-full pr-12 pl-4 py-3 border border-[#E8E6E6] bg-white text-black placeholder:text-gray-500 rounded-lg outline-none"
        />
        <button
          type="submit"
          className="absolute top-1/2 -translate-y-1/2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition"
        >
          <Search size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

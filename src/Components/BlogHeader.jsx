import React from 'react';
import {
  CircleUser,
  CalendarDays,
  Codesandbox,
} from "lucide-react";

const BlogHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-5 mx-4 md:mx-8">
      {/* Posted by */}
      <div className="flex items-center gap-3">
        <span className="bg-gray-300 p-2 text-white rounded-full">
          <CircleUser className="h-6 w-6 md:h-7 md:w-7" />
        </span>
        <div>
          <h3 className="text-[#69778A] text-sm">Posted by:</h3>
          <h2 className="text-[#001430] text-base md:text-[16px]">Admin</h2>
        </div>
      </div>

      {/* Date */}
      <div className="flex items-center gap-3">
        <div className="text-teal-400 p-2 rounded-full bg-teal-100">
          <CalendarDays className="h-6 w-6 md:h-7 md:w-7" />
        </div>
        <div>
          <h3 className="text-[#69778A] text-sm">Date:</h3>
          <h3 className="text-[#001430] text-base md:text-[16px]">27 Dec, 2023</h3>
        </div>
      </div>

      {/* Category */}
      <div className="flex items-center gap-3">
        <div className="text-amber-500 p-2 rounded-full bg-amber-100">
          <Codesandbox className="h-6 w-6 md:h-7 md:w-7" />
        </div>
        <div>
          <h3 className="text-[#69778A] text-sm">Category:</h3>
          <h3 className="text-[#001430] text-base md:text-[16px]">Top Toys</h3>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;

import React from "react";
import { MoveRight } from "lucide-react";

const Categories = () => {
  return (
    <div>
      <div className="bg-white p-10 border border-[#E8E6E6] rounded-lg">
        <h2 className="text-[25px] text-[#001430] font-semibold mb-2">
          Categories
        </h2>
        <hr className="bg-amber-500 h-1 w-10 text-[20px] rounded-lg border-none mb-4" />
        <ul className="flex flex-col font-medium gap-4">
          {[
            "Family Fun (1)",
            "Kids Activities (1)",
            "Learn & Inspire (1)",
            "Tips & Tricks (1)",
            "Top Toys (5)",
            "Toy Reviews (2)",
            "Toy Trends (3)",
          ].map((item, index) => (
            <li
              key={index}
              className="group relative flex items-center gap-2 pl-6 cursor-pointer text-gray-500 hover:translate-x-2 transition-all"
            >
              <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <MoveRight className="text-[#00BBAE]" size={16} />
              </span>
              <a className="group-hover:text-[#00BBAE] transition-colors">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;

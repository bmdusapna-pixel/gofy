import React from "react";

const PopularTags = () => {
  return (
    <div className="bg-white p-4 border mt-1 border-[#E8E6E6] rounded-lg">
      <h3 className="text-[20px] text-[#001430] font-semibold mb-2">
        Popular Tags
      </h3>
      <hr className="h-1 w-10 bg-amber-500 rounded-lg border-none mb-4" />
      <div className="text-gray-500 flex flex-wrap gap-2">
        {[
          "Family Fun",
          "Learn & Inspire",
          "Tips & Tricks",
          "Top Toys",
          "Toy Reviews",
          "Toy Trends",
        ].map((tag, i) => (
          <div
            key={i}
            className="p-1 border border-[#E8E6E6] hover:bg-[#00BBAE] hover:text-white font-medium rounded-lg"
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;

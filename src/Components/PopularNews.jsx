import React from "react";
import BTI1 from "../assets/blogtinyimg/bti1.jpg";
import BTI2 from "../assets/blogtinyimg/bti2.jpg";
import BTI3 from "../assets/blogtinyimg/bti3.jpg";
import BTI4 from "../assets/blogtinyimg/bti4.jpg";
import BTI5 from "../assets/blogtinyimg/bti5.jpg";
import NewsCard from "./NewsCard";

const PopularNews = () => {
  return (
    <div className="bg-white p-4 border  border-[#E8E6E6] rounded-lg">
      <h3 className="text-[20px] text-[#001430] font-semibold">Popular News</h3>
      <hr className="h-1 w-10 bg-amber-500 rounded-lg border-none mb-4" />
      <div className="flex flex-col gap-3">
        <NewsCard Image={BTI1} />
        <NewsCard Image={BTI2} />
        <NewsCard Image={BTI3} />
        <NewsCard Image={BTI4} />
        <NewsCard Image={BTI5} />
      </div>
    </div>
  );
};

export default PopularNews;

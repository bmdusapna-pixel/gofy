import React from "react";
import { X } from "lucide-react";
import SizeChat from "../assets/size-chat.jpeg";

const SizeChart = ({ openSizeChart, setOpenSizeChart, sizechart}) => {
  return (
    <div
      className={`fixed top-0 left-1/2 z-50 bg-gray-200 -translate-x-1/2 h-screen w-2xl overflow-y-auto hide-scrollbar transition-transform duration-300 ${
        openSizeChart ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="w-full h-full flex flex-col gap-5 relative">
        <div className="absolute top-0 right-0">
          <X
            onClick={() => setOpenSizeChart(false)}
            className="w-10 h-10 cursor-pointer p-1 rounded-full bg-gray-200 text-black hover:text-white hover:bg-[#00bbae] hover:rotate-180 transition-transform duration-700"
          />
        </div>
        <img src={sizechart} className="w-full" alt="Size Chart" />
      </div>
    </div>
  );
};

export default SizeChart;

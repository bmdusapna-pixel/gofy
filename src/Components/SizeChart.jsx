import React from "react";
import { X } from "lucide-react";

const SizeChart = ({ openSizeChart, setOpenSizeChart }) => {
  return (
    <div className={`fixed top-0 left-1/2 z-50 bg-gray-200 -translate-x-1/2 h-screen w-2xl overflow-y-auto hide-scrollbar transition-transform duration-300 ${ openSizeChart ? "translate-y-0" : "translate-y-full"}`}>
      <div className="w-full p-5 h-full flex flex-col gap-5">
        <div className="w-full flex justify-end">
          <X onClick={() => setOpenSizeChart(false)} className="w-10 h-10 cursor-pointer p-1 rounded-md bg-gray-200 text-black hover:text-white hover:bg-[#00bbae] hover:rotate-180 transition-transform duration-700"/>
        </div>
        <img src="https://cdn.shopify.com/s/files/1/1246/5437/files/KBJ-_Size_Guide-_12_M_to_14_Y-_inch.jpg?v=1737443385" className="w-full" alt="Size Chart" />
      </div>
    </div>
  );
};

export default SizeChart;

import React from "react";
import lego from "../assets/lego.png";
import { ChevronRight } from "lucide-react";

const OfferSection = () => {
  return (
    <div className=" rounded-lg flex flex-col justify-center items-center bg-blue-500 text-white text-center px-5 py-8">
      <h3 className="text-[25px] font-bold">Unique & Awesome Toy Collection</h3>
      <p>15% Off on Kids' Toys and Gifts!</p>
      <button className="group relative overflow-hidden rounded-full font-bold mt-4 px-4 py-2 transition-colors duration-300 bg-white text-[#69778A]">
        <span className="relative z-10 flex items-center gap-2 group-hover:text-white">
          See Collection
          <ChevronRight />
        </span>
        <span className="absolute inset-0 bg-[#00BBAE] scale-x-0 origin-left transition-transform duration-700 rounded-full ease-in-out group-hover:scale-x-100 z-0" />
      </button>
      <img className="h-48 mt-10" src={lego} alt="lego" />
    </div>
  );
};

export default OfferSection;

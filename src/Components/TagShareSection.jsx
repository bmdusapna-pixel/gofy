import React from "react";
import {
  Dribbble,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

const TagShareSection = () => {
  return (
    <div className="border-t border-[#E8E6E6] mt-6">
      <div className="flex flex-col md:flex-row justify-between px-4 sm:px-6 md:px-8 py-6 gap-y-6">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-[#001430]">
            Tags:
          </h3>
          <div className="px-3 py-1 border border-[#E8E6E6] hover:bg-[#00BBAE] hover:text-white font-medium rounded-lg text-sm sm:text-base">
            Family Fun
          </div>
          <div className="px-3 py-1 border border-[#E8E6E6] hover:bg-[#00BBAE] hover:text-white font-medium rounded-lg text-sm sm:text-base">
            Learn & Inspire
          </div>
          <div className="px-3 py-1 border border-[#E8E6E6] hover:bg-[#00BBAE] hover:text-white font-medium rounded-lg text-sm sm:text-base">
            Toy Trends
          </div>
        </div>

        {/* Share Icons */}
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-[#001430]">
            Share:
          </h3>
          {[Facebook, Dribbble, Linkedin, Twitter, Instagram].map((Icon, index) => (
            <div
              key={index}
              className="h-10 w-10 flex items-center justify-center text-[#69778A] rounded-full border border-[#E8E6E6] hover:bg-[#00BBAE] hover:text-white"
            >
              <Icon className="h-5 w-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagShareSection;

import React from "react";
import { Grip } from "lucide-react";
import { ChevronRight } from "lucide-react";

const NextPostCard = () => {
  return (
    <div className="flex items-center justify-between  gap-5  mt-10 bg-white  border  border-[#E8E6E6] rounded-lg">
      <div className="p-5  text-[#69778A]">
        {" "}
        <Grip />
      </div>
      <div className="flex flex-col p-[32px]">
        <div className="flex  flex-row-reverse text-[#69778A]">
          {" "}
          <span>
            <ChevronRight />
          </span>{" "}
          NextPost
        </div>
        <h1 className=" text-[#001430] mt-1 font-semibold">
          Tiny Emporium: Playful Picks for Kids’ Delightful Days!
        </h1>
      </div>
    </div>
  );
};

export default NextPostCard;

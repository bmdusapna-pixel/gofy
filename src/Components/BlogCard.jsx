import React from "react";
import { Calendar } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";


const BlogCard = ({ Image, Tag }) => {
  return (
    <Link to="/blog-details" className="w-[300px] p-1 h-auto border-[#E8E6E6] rounded-lg overflow-hidden bg-[#FFFF] shadow">
      <div className="relative p-3 rounded-lg">
        <img
          className="w-full h-60  rounded-lg object-cover"
          src={Image}
          alt="Blog"
        />
        <span className="absolute top-6 hover:bg-amber-600  left-6 bg-[#00BBAE] text-white text-sm font-semibold px-1 py-1 rounded-lg shadow">
          {Tag}
        </span>
      </div>

      <div className="p-1">
        <div className="flex items-center  w-[127px] h-[37px px-1 py-1 rounded-lg border-1 border-[#E8E6E6]  text-gray-500 gap-1">
          <Calendar className="w-5 h-5 text-[#00BBAE]" />
          <span className="text-[#001430">27, Dec 2023</span>
        </div>
        <h1 className="text-md  text-[20px] hover:text-[#00BBAE] text-[#001430]  font-semibold ">
          Toy Emporium: Playful Picks for Kids’ Delightful Days
        </h1>
        <p className="text text-[#69778A]">
          Lorem ipsum dolor sit amet construct. Quis vel nunc est aliquam
          luctus.
        </p>
        <div className="flex items-center gap-1 h-[63px] w-[252px] border-t-1 border-t-[#E8E6E6] text-sm text-gray-500">
          <CircleUserRound className="w-7 h-7" />
          <span className="text-[16px] font-medium">
            Posted by: <span className="text-[#001430]  ">Admin</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

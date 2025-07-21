import React from "react";
import smallImg from "../assets/blog_05-150x150.jpg";
import { Calendar } from "lucide-react";

const NewsCard = ({ Image }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <img
          className="h-[70px] w-[70px] rounded-lg object-cover"
          src={Image}
          alt="thumbnail"
        />
      </div>

      <div className="flex flex-col">
        <h1 className="font-medium  max-w-[250px] hover:text-[#00BBAE] line-clamp-2 leading-tight">
          Toy Emporium: Playful Picks for Kids’ Delightful Days
        </h1>

        <div className="flex items-center  text-gray-500 gap-1 mt-2">
          <Calendar className="w-5 h-5 text-[#00BBAE]" />
          <span className=" text-[14px]">27, Dec 2023</span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;

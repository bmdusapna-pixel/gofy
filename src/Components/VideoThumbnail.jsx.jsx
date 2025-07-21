import React from "react";
import { Play } from "lucide-react";
import video from "../assets/monkey.jpg";

const VideoThumbnail = () => {
  return (
    <div className="relative mt-20 mb-20 flex items-center justify-center overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
      <img
        src={video}
        alt="video"
        className="w-full h-full object-cover absolute inset-0"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30 z-0" />

        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center z-10">
          <svg
            className="absolute  animate-[spin-slow_8s_linear_infinite] w-full h-full"
            viewBox="0 0 200 200"
          >
            <defs>
              <path
                id="circlePath"
                d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              />
            </defs>
            <text
              fill="white"
              className="uppercase text-[18px] sm:text-[18px] md:text-[18px] font-semibold tracking-wide"
            >
              <textPath href="#circlePath" startOffset="0" textLength="470">
                Watch Video * Watch Video * Watch Video *
              </textPath>
            </text>
          </svg>

          <Play
            fill="#00BBAE"
            className="h-14 w-14 md:h-20 md:w-20 text-[#00BBAE] bg-white rounded-full p-3 shadow-xl cursor-pointer hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoThumbnail;

import React from 'react';
import profile from "../assets/profile.png";
import {
  Dribbble,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";

const AuthorInfo = () => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-6 mt-6 bg-white border border-[#E8E6E6] p-4 sm:p-6 md:p-8 rounded-lg">
      
      {/* Profile Image */}
      <div className="w-32 sm:w-40 md:w-48">
        <img src={profile} alt="Author" className="rounded-full w-full h-auto" />
      </div>

      {/* Author Info */}
      <div className="flex flex-col gap-4 text-[#001430]">
        <div className="text-base sm:text-lg text-[#69778A]">
          Posted by: <span className="text-[#001430] font-semibold text-base sm:text-lg">Admin</span>
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-[#69778A]">
          Lorem ipsum dolor sit amet consectetur. Viverra sed laoreet
          viverra eget donec ultricies nibh tellus. Adipiscing consequat
          egestas sit arcu a consectetur nibh. Ut scelerisque massa
          adipiscing vel. Netus in porttitor eget semper est ornare
          sagittis gravida. Sed a dolor pellentesque ultrices amet eget
          vitae.
        </p>

        {/* Social Icons */}
        <div className="flex flex-wrap items-center gap-3 mt-2">
          {[Facebook, Dribbble, Linkedin, Twitter, Instagram].map((Icon, index) => (
            <div
              key={index}
              className="h-10 w-10 flex items-center justify-center text-[#69778A] border border-[#E8E6E6] rounded-full hover:bg-[#00BBAE] hover:text-white transition"
            >
              <Icon className="h-5 w-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;

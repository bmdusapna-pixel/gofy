import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import {  ArrowLeft, ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

import brand1 from "../assets/brand-1.svg";
import brand2 from "../assets/brand-2.svg";
import brand3 from "../assets/brand-3.svg";
import brand4 from "../assets/brand-4.svg";
import brand5 from "../assets/brand-5.svg";
import brand6 from "../assets/brand-6.svg";

const brandData = [
  { img: brand1, name: "Party" },
  { img: brand2, name: "Crafty" },
  { img: brand3, name: "ToyzHub" },
  { img: brand4, name: "PlayNest" },
  { img: brand5, name: "JoyLab" },
  { img: brand6, name: "HappyHands" },
  { img: brand1, name: "Party" },
  { img: brand2, name: "Crafty" },
  { img: brand3, name: "ToyzHub" },
];

const Brands = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-[#001430]">Popular Brands</h2>
        <p className="text-[#69778A] mt-2 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet consectetur. Fermentum facilisi id at
          adipiscing fermentum amet bibendum quis vitae blandit.
        </p>
      </div>

      <div className="relative">
        {/* Left Button */}
      <div className="swiper-button-prev-custom hidden  hover:scale-110 transition shadow-md  md:block absolute text-[#00BBAE]  top-1/2 -left-10 z-10 -translate-y-1/2 cursor-pointer bg-white  py-1 px-1  text-center  rounded-full ">  
           <ArrowLeft className="text-[#00BBAE] w-6 h-6" />
        </div>

        {/* Right Button */}
        <div className="swiper-button-next-custom  hover:scale-110 transition shadow-md  hidden md:block text-[#00BBAE] absolute top-1/2 -right-10 z-10 -translate-y-1/2 cursor-pointer text-center py-1 px-1 bg-white rounded-full ">
          <ArrowRight className="text-[#00BBAE] w-6 h-6" />
        </div>

        <Swiper
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          loop={true}
        >
          {brandData.map((brand, index) => (
 <SwiperSlide key={index}>
  <div className="group bg-white p-6 rounded-2xl flex flex-col items-center transition-all duration-300 hover:shadow">
    <div className="relative w-[110px] h-[110px] p-1 shadow rounded-full bg-white overflow-hidden mb-4">

      {/* First Image (Visible by Default, Moves Up and Fades Out on Hover) */}
      <img
        src={brand.img}
        alt={brand.name}
        className="absolute inset-0 m-auto w-[80px] h-[80px] object-contain transition-all duration-500 ease-in-out group-hover:-translate-y-4 group-hover:opacity-0"
      />

      {/* Second Image (Hidden Initially, Slides In from Below on Hover) */}
      <img
        src={brand.img}
        alt={brand.name}
        className="absolute inset-0 m-auto w-[80px] h-[80px] object-contain translate-y-4 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
      />

    </div>
    <h3 className="text-lg text-[#001430] font-medium text-center">
      {brand.name}
    </h3>
  </div>
</SwiperSlide>




          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;

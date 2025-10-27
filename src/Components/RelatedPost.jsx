import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ArrowLeft, ArrowRight } from "lucide-react";

import BI1 from "../assets/blogimg/bi1.jpg";
import BI2 from "../assets/blogimg/bi2.jpg";
import BI3 from "../assets/blogimg/bi3.jpg";
import BI4 from "../assets/blogimg/bi4.jpg";
import BlogCard from "./BlogCard";

const RelatedPost = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="w-full px-4 py-4">
      {/* Header with Buttons (Mobile/Tablet only) */}
      <div className="flex items-center justify-between mb-6 lg:mb-10">
        {/* Left: Heading */}
        <div className="flex items-center gap-4">
          <h2 className="text-[26px] font-semibold">Related Post</h2>
          <div className="h-1 w-10 bg-[#00BBAE] rounded-lg"></div>
        </div>

        {/* Right: Buttons (only visible on mobile and tab) */}
        <div className="flex gap-2 lg:hidden">
          <button
            ref={prevRef}
            className="bg-white shadow-md border border-gray-300 rounded-full p-2 hover:bg-[#00BBAE] transition-all duration-200"
          >
            <ArrowLeft size={20} className="text-[#00BBAE] hover:text-white" />
          </button>
          <button
            ref={nextRef}
            className="bg-white shadow-md border border-gray-300 rounded-full p-2 hover:bg-[#00BBAE] transition-all duration-200"
          >
            <ArrowRight size={20} className="text-[#00BBAE] hover:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Swiper */}
      <div className="lg:hidden">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          className="!flex justify-center"
        >
          <SwiperSlide className="!flex justify-center">
            <div className="w-fit mx-auto">
              <BlogCard Image={BI1} Tag={"Top Toys"} />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!flex justify-center">
            <div className="w-fit mx-auto">
              <BlogCard Image={BI2} Tag={"Family Fun"} />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!flex justify-center">
            <div className="w-fit mx-auto">
              <BlogCard Image={BI3} Tag={"Learn and Inspire"} />
            </div>
          </SwiperSlide>
          <SwiperSlide className="!flex justify-center">
            <div className="w-fit mx-auto">
              <BlogCard Image={BI4} Tag={"Kids Activities"} />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid grid-cols-4 gap-7">
        <BlogCard Image={BI1} Tag={"Top Toys"} />
        <BlogCard Image={BI2} Tag={"Family Fun"} />
        <BlogCard Image={BI3} Tag={"Learn and Inspire"} />
        <BlogCard Image={BI4} Tag={"Kids Activities"} />
      </div>
    </div>
  );
};

export default RelatedPost;

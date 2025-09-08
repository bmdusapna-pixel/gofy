import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import banner1 from "../assets/banner1.png";
import banner2 from "../assets/banner2.png";
import banner3 from "../assets/banner3.png";
import { Link } from "react-router-dom";
import { slugify, sub_category_toys_clothes } from "../assets/helper";

const hero_slider_array = [
  {
    _id: 1,
    heading: "Girls Party Dresses White Lace Dress Bohemian Dress",
    sub_heading: "THE CREATIVE WORLD",
    image_url: banner1,
  },
  {
    _id: 2,
    heading: "Stylish Kids Wear For Every Occasion",
    sub_heading: "NEW COLLECTION",
    image_url: banner2,
  },
  {
    _id: 3,
    heading: "Flat 30% Off On All Dresses",
    sub_heading: "SUMMER SALE",
    image_url: banner3,
  },
];

const HeroSection = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  // const [categories, setCategories] = useState([]);
  const [collection, setCollection] = useState([]);
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  useEffect(() => {
    const fetchCollection = async () => {
      const res = await fetch(`${baseUrl}/collections`);
      const data = await res.json();
      setCollection(data.collections);
    };
    fetchCollection();
  }, [baseUrl]);

  // useEffect(() => {
  //   const getCategories = sub_category_toys_clothes;
  //   setCategories(getCategories);
  // }, []);

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="w-full bg-[#fce7ef] px-5 py-5 lg:py-0">
        <div className="w-full mx-auto flex items-center justify-center">
          <Slider {...settings} className="w-full">
            {hero_slider_array.map((item) => (
              <div key={item._id}>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-10 h-full lg:h-[550px] 2xl:h-[750px]">
                  <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img
                      src={item.image_url}
                      alt={item.heading}
                      className="w-auto h-full object-cover"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start justify-center gap-6">
                    <p className="text-[#dc3545] text-[18px] leading-[27px] font-semibold">
                      {item.sub_heading}
                    </p>
                    <p className="text-[#212529] text-[32px] md:text-[38px] lg:text-[54px] leading-[48px] sm:text-left text-center lg:leading-[57px] font-bold">
                      {item.heading}
                    </p>
                    <Link
                      to="/products"
                      className="transition-all duration-300 hover:bg-pink-600 hover:scale-105 cursor-pointer bg-[#ec407a] text-white text-[18px] leading-[27px] py-2 px-5 rounded-md"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex lg:px-12 mx-auto px-5 flex-col gap-2 w-full items-center justify-center">
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#212529] font-bold">
          Shop By Categories
        </p>
        <p className="text-[16px] leading-[24px] font-normal text-gray-500 w-full sm:w-sm text-center">
          Lorem ipsum dolor sit amet consectetur. Id fames there are many
          vulputate eget dolor.
        </p>
        <div
          className="flex max-w-[1200px] my-10 relative"
          style={{ width: collection.length * 300 }}
        >
          <div className="w-full bg-[#e9f9fc] rounded-full category-swiper">
            <Swiper
              slidesPerView="auto"
              key={collection.length}
              breakpoints={{
                320: { slidesPerView: Math.min(collection.length, 2) },
                640: { slidesPerView: Math.min(collection.length, 3) },
                768: { slidesPerView: Math.min(collection.length, 4) },
                1024: { slidesPerView: Math.min(collection.length, 4) },
                1536: { slidesPerView: Math.min(collection.length, 6) },
              }}
            >
              {collection.map((item) => {
                return (
                  <SwiperSlide key={item._id}>
                    <Link
                      to={`/products/${slugify(item.collectionName)}`}
                      className="flex cursor-pointer flex-col items-center justify-center gap-3 transition-transform duration-300 py-5 hover:-translate-y-1"
                    >
                      <div className="w-20 md:w-35 h-20 md:h-35 border-8 flex items-center justify-center rounded-full border-white bg-[#e9f9fc] shadow-md">
                        <img
                          src={item.imageUrl}
                          alt={item.collectionName}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </div>
                      <p className="text-[16px] leading-[24px] sm:text-[18px] sm:leading-[27px] text-[#000000] font-semibold text-center">
                        {item.collectionName}
                      </p>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

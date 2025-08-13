import React, { useContext, useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBasket,
  Star,
  ChevronsUp,
  ChevronsLeft,
} from "lucide-react";
import product_list from "../assets/product-list";
import product_slide_1 from "../assets/product_slide_1.png";
import product_slide_2 from "../assets/product_slide_2.png";
import { Countdown } from "./AnimatedDropdown";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { clothe_items } from "../assets/helper";

const sliding_section = [
  {
    _id: 1,
    title: "Unique & Awesome Toy Collection",
    sub_title: "5% Off on Kids' Toys and Gifts!",
    image_url: product_slide_1,
    bg: "#689f38",
  },
  {
    _id: 2,
    title: "Unique & Awesome Toy Collection",
    sub_title: "5% Off on Kids' Toys and Gifts!",
    image_url: product_slide_2,
    bg: "#7DB543",
  },
];

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

const Deals = () => {
  const [currentTrending, setCurrentTrending] = useState("all-items");
  const [buttonHovered, setButtonHovered] = useState(false);
  const [slidingSectionHovered, setSlidingSectionHovered] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);

  const addDealToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    addToCart(product);
  };

  const addFavouriteItemsWishList = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    addFavouriteItems(product);
  };

  const [bounce, setBounce] = useState(false);
  const chevronsRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !bounce) {
            setBounce(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (chevronsRef.current) {
      observer.observe(chevronsRef.current);
    }

    return () => {
      if (chevronsRef.current) {
        observer.unobserve(chevronsRef.current);
      }
      observer.disconnect();
    };
  }, [bounce]);
  return (
    <div className="mb-5">
      <div className="flex flex-col gap-10 w-full">
        {/* deal of the day */}
        <div className="lg:px-12 px-5 w-full mx-auto flex flex-col gap-10">
          <div className="flex md:flex-row flex-col justify-between w-full items-center">
            <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#212529] font-bold">
              Deal of the Day
            </p>
            <button
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              className="text-[#212529] hover:text-white relative overflow-hidden flex items-center gap-5 group border border-gray-200 rounded-full px-4 py-2 cursor-pointer transition-colors duration-500"
            >
              <span className="absolute top-0 left-0 w-0 h-full bg-[#00bbae] z-[-1] transition-all duration-500 group-hover:w-full" />
              <p className="leading-[24px] text-[16px] font-semibold z-10">
                Explore all
              </p>
              <ArrowRight
                className={`w-5 h-5 z-10 transition-transform duration-300 ${
                  buttonHovered ? "translate-x-1" : "translate-x-0"
                }`}
              />
            </button>
          </div>
          <div className="w-full relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{
                nextEl: ".swiper-button-next-1",
                prevEl: ".swiper-button-prev-1",
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 20 },
                480: { slidesPerView: 2, spaceBetween: 20 },
                800: { slidesPerView: 2, spaceBetween: 10 },
                1280: { slidesPerView: 3, spaceBetween: 10 },
                1536: { slidesPerView: 5, spaceBetween: 10 },
              }}
              loop={true}
              grabCursor={true}
            >
              {clothe_items.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="w-full border flex lg:flex-row flex-col gap-3 xl:gap-5 border-gray-200 rounded-md p-2">
                    <div className="w-full h-60 lg:w-1/2 bg-[#FFC0CB] rounded-md flex items-center justify-center relative">
                      <img
                        src={product.images[0]}
                        alt=""
                        className="object-contain"
                      />
                      {/* <div
                        onClick={(event) =>
                          addFavouriteItemsWishList(product, event)
                        }
                        className="absolute top-2 right-2 cursor-pointer w-10 border border-gray-200 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-gray-500 hover:text-white"
                      >
                        <Heart className="w-5 h-5" />
                      </div> */}
                      {/* <div className="absolute top-48 w-fit sm:w-40 lg:w-48">
                        <Countdown />
                      </div> */}
                      {/* <p className="absolute top-0 left-0 bg-[#dc3545] rounded-tl-md rounded-br-md text-white text-[14px] leading-[20px] px-3 py-0.5">
                        -23%
                      </p> */}
                    </div>
                    <div className="flex flex-col gap-1 py-5 w-full lg:w-1/2 lg:px-0 px-2">
                      {/* <p className="text-[#212529] text-[16px] leading-[24px] opacity-75">
                        {product.sub_category}
                      </p> */}
                      <p className="text-[22px] leading-[30px] text-[#212529] font-bold">
                        {product?.name}
                      </p>
                      {/* <div className="flex lg:flex-row md:flex-col flex-row w-full items-center">
                        <div className="flex gap-1 items-center">
                          {Array.from({
                            length: Math.floor(product.rating),
                          }).map((_, index) => (
                            <Star
                              key={index}
                              className="w-5 h-5 text-[white]"
                              fill="#f88e0f"
                            />
                          ))}
                        </div>
                        <p className="text-gray-500 text-base leading-[16px]">
                          ({product.review} Reviews)
                        </p>
                      </div> */}
                      <div className="flex gap-2 items-center">
                        <p className="text-pink-600 text-[22px] leading-[30px] font-semibold">
                          ₹ {product.price}
                        </p>
                        <p className="text-gray-800 text-[16px] line-through leading-[30px] font-semibold">
                          ₹ {product.price + 100}
                        </p>
                        <p className="text-red-600 text-[16px] leading-[30px] font-semibold">
                          30% OFF
                        </p>
                      </div>
                      <div className="max-w-[150px] mt-4">
                        <p className="text-red-600 text-[16px] leading-[16px] font-semibold">
                          Sale ends in:
                        </p>
                        <Countdown />
                      </div>
                      <div
                        onClick={(event) => addDealToCart(product, event)}
                        className="rounded-full transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-4 py-2 bg-[#00bbae] flex gap-3 items-center justify-center mt-auto"
                      >
                        <ShoppingBasket className="w-5 h-5 text-white" />
                        <p className="text-[16px] leading-[18px] font-semibold text-white">
                          Add to cart
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <ChevronLeft
              className="swiper-button-prev-1 absolute -left-5 top-32 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer opacity-25 hover:opacity-100"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            />
            <ChevronRight
              className="swiper-button-next-1 absolute -right-5 top-32 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer opacity-25 hover:opacity-100"
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
            />
          </div>
        </div>

        {/* trending deals */}
        <div className="w-full bg-[#e9f9fc] py-10">
          <div className="w-full mx-auto lg:px-12 px-5">
            <div className="flex lg:flex-row flex-col gap-6 w-full">
              <div className="w-full lg:w-3/4 flex flex-col gap-10">
                <div className="flex md:flex-row flex-col lg:gap-0 gap-5 justify-between w-full items-center">
                  <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#212529] font-bold">
                    Trending Deals
                  </p>
                  <div className="flex gap-5 items-center">
                    <p
                      onClick={() => setCurrentTrending("all-items")}
                      className={`text-[16px] sm:text-[18px] leading-[24px] sm:leading-[27px] ${
                        currentTrending === "all-items"
                          ? "text-[#06a096] font-semibold"
                          : "text-[#000000] font-medium"
                      } cursor-pointer `}
                    >
                      All Items (4)
                    </p>
                    <p
                      onClick={() => setCurrentTrending("indoor-play")}
                      className={`text-[16px] sm:text-[18px] leading-[24px] sm:leading-[27px] ${
                        currentTrending === "indoor-play"
                          ? "text-[#06a096] font-semibold"
                          : "text-[#000000] font-medium"
                      } cursor-pointer `}
                    >
                      Indoor Play (6)
                    </p>
                    <p
                      onClick={() => setCurrentTrending("kids-book")}
                      className={`text-[16px] sm:text-[18px] leading-[24px] sm:leading-[27px] ${
                        currentTrending === "kids-book"
                          ? "text-[#06a096] font-semibold"
                          : "text-[#000000] font-medium"
                      } cursor-pointer `}
                    >
                      Kids books (8)
                    </p>
                  </div>
                </div>
                <div className="w-full relative">
                  <Swiper
                    modules={[Autoplay, Navigation]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation={{
                      nextEl: ".swiper-button-next-2",
                      prevEl: ".swiper-button-prev-2",
                    }}
                    breakpoints={{
                      0: { slidesPerView: 1, spaceBetween: 20 },
                      480: { slidesPerView: 2, spaceBetween: 20 },
                      800: { slidesPerView: 2, spaceBetween: 10 },
                      1280: { slidesPerView: 2, spaceBetween: 10 },
                      1536: { slidesPerView: 4, spaceBetween: 10 },
                    }}
                    loop={true}
                    grabCursor={true}
                  >
                    {product_list.map((trending) => (
                      <SwiperSlide key={trending._id}>
                        <div className="w-full flex lg:flex-row flex-col gap-5 border border-gray-200 rounded-md p-3 bg-white">
                          <div className="w-full lg:w-1/2 bg-gray-200 flex items-center rounded-md justify-center relative">
                            <img
                              src={trending.images[0]}
                              alt=""
                              className="h-60 object-contain"
                            />
                            {/* <div className="absolute top-44 w-48">
                                                        <Countdown />
                                                    </div> */}
                            <div
                              onClick={(event) =>
                                addFavouriteItemsWishList(trending, event)
                              }
                              className="absolute top-2 right-2 w-10 h-10 border-[2px] text-gray-500 transition-colors duration-300 hover:text-white hover:bg-[#00bbae] cursor-pointer bg-white flex items-center justify-center border-gray-300 rounded-full"
                            >
                              <Heart className="w-4 h-4" />
                            </div>
                          </div>
                          <div className="lg:w-1/2 w-full flex flex-col gap-3">
                            <div className="flex w-full items-center">
                              {Array.from({
                                length: Math.floor(trending.rating),
                              }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="w-4 h-4 text-[#f88e0f]"
                                  fill="#f88e0f"
                                />
                              ))}
                              {Array.from({
                                length: 5 - Math.floor(trending.rating),
                              }).map((_, index) => (
                                <Star
                                  key={index}
                                  className="w-4 h-4 text-[#f88e0f]"
                                  fill="#f8f9fa"
                                />
                              ))}
                              {/* <p className="text-gray-500 text-base leading-[16px] ml-2">
                                ({trending.rating})
                              </p> */}
                            </div>
                            <p className="text-[22px] leading-[30px] text-[#212529] font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                              {trending.name}
                            </p>
                            <div className="flex sm:flex-row flex-col lg:flex-col sm:justify-between justify-start w-full">
                              <div className="flex gap-2 items-center">
                                <p className="text-pink-600 text-[22px] leading-[30px] font-semibold">
                                  ₹ {trending.price}
                                </p>
                                <p className="text-gray-900 text-[16px] leading-[27px] font-normal line-through">
                                  ₹ {trending.price + 100}
                                </p>
                                <p className="text-red-600 text-[18px] leading-[27px] font-normal">
                                  30% OFF
                                </p>
                              </div>
                            </div>
                            <div
                              onClick={(event) =>
                                addDealToCart(trending, event)
                              }
                              className="rounded-full transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 py-2 bg-[#00bbae] flex gap-3 items-center justify-center mt-auto mb-4"
                            >
                              <ShoppingBasket className="w-5 h-5 text-white" />
                              <p className="text-[16px] leading-[24px] font-semibold text-white">
                                Add to cart
                              </p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <ChevronLeft
                    className="swiper-button-prev-2 absolute -left-5 top-32 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] opacity-25 hover:opacity-100 cursor-pointer"
                    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                  />
                  <ChevronRight
                    className="swiper-button-next-2 absolute -right-5 top-32 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer opacity-25 hover:opacity-100"
                    style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                  />
                </div>
              </div>
              <div className="w-full lg:w-1/4 relative">
                <div className="flex md:flex-col flex-row gap-5 md:overflow-y-scroll overflow-x-scroll h-full sm:h-[50vh] hide-scrollbar">
                  {sliding_section.map((item) => (
                    <div
                      className="w-full rounded-2xl flex flex-col gap-5 px-8 py-5 md:min-w-full min-w-[300px] h-full md:h-auto"
                      style={{ backgroundColor: item.bg }}
                      key={item._id}
                    >
                      <p className="text-[27px] leading-[40px] font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-[16px] leading-[24px] font-semibold text-gray-200">
                        {item.title}
                      </p>
                      <div className="flex sm:flex-row flex-col justify-center sm:justify-between w-full items-center">
                        <button
                          onMouseEnter={() =>
                            setSlidingSectionHovered(item._id)
                          }
                          onMouseLeave={() => setSlidingSectionHovered(null)}
                          className="flex gap-1 items-center justify-center rounded-full px-5 py-2 bg-white"
                        >
                          <p className="text-[#689f38] text-[16px] leading-[22px] font-semibold cursor-pointer">
                            See Collection
                          </p>
                          <ArrowRight
                            className={`w-5 h-5 text-[#689f38] transition-transform duration-300 ${
                              slidingSectionHovered === item._id
                                ? "translate-x-1"
                                : "translate-x-0"
                            }`}
                          />
                        </button>
                        <div className="flex justify-end items-end w-28">
                          <img src={item.image_url} alt="" className="w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`absolute left-0 -bottom-10 w-full`}>
                  <div className="flex w-full justify-center" ref={chevronsRef}>
                    {isMobile ? (
                      <ChevronsLeft
                        className={`text-pink-600 w-20 h-20 ${
                          bounce ? "animate-bounce-x" : ""
                        }`}
                      />
                    ) : (
                      <ChevronsUp
                        className={`text-pink-600 w-20 h-20 ${
                          bounce ? "animate-bounce-y" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;

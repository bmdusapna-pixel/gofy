import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import product_list from "../assets/product-list.js";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext.jsx";
import { Countdown } from "./AnimatedDropdown.jsx";

const ProductsCollection = ({ color }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);

  const addProductToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    addToCart(product);
  };

  const addFavouriteItemsWishList = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    addFavouriteItems(product);
  };

  return (
    <div
      className="w-full bg-[#f8f9fa]"
      style={{ boxShadow: "inset 0 8px 8px -8px rgba(0, 0, 0, 0.5)" }}
    >
      <div className="w-full px-5 lg:px-12 mx-auto py-7">
        <p
          className="text-[18px] leading-[27px] font-semibold underline text-center mb-5"
          style={{ color }}
        >
          Best Selling Products
        </p>
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-bold text-center text-[#212529] mb-10">
          Browsing Our Trending Items
        </p>
        <div className="relative">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{
              nextEl: ".swiper-button-next-pc",
              prevEl: ".swiper-button-prev-pc",
            }}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20 },
              480: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 5, spaceBetween: 20 },
              1280: { slidesPerView: 5, spaceBetween: 20 },
              1536: { slidesPerView: 6, spaceBetween: 20 },
            }}
            loop={true}
            grabCursor={true}
          >
            {product_list.map((product) => {
              const isHovered = hoveredId === product._id;
              return (
                <SwiperSlide key={product._id}>
                  <Link
                    to={`/product-details/${product.url}`}
                    className="bg-white rounded-md p-3 flex flex-col w-full cursor-pointer relative"
                    onMouseEnter={() => setHoveredId(product._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="flex relative">
                      {/* <p className="absolute -top-3 -left-2 text-white bg-pink-600 px-1 py-1 rounded-sm text-[14px] leading-[21px] font-semibold">
                        80%
                      </p> */}
                      <div className="w-full h-72 sm:h-[280px] flex items-center justify-center">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className={`absolute top-0 left-0 w-72 h-full ease-in-out ${
                            isHovered
                              ? "opacity-0 scale-105 duration-300"
                              : "opacity-100 scale-100 duration-100"
                          }`}
                          draggable={false}
                        />
                        <img
                          src={product.images[1]}
                          alt={product.name + " hover"}
                          className={`absolute top-0 left-0 w-72 h-full ease-in-out ${
                            isHovered
                              ? "opacity-100 scale-100 duration-300"
                              : "opacity-0 scale-95 duration-100"
                          }`}
                          draggable={false}
                        />
                      </div>
                    </div>
                    {hoveredId === product._id && (
                      <div
                        className={`absolute right-4 top-4 transform transition-all duration-300 z-20 ${
                          isHovered
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }`}
                      >
                        <div className="flex flex-col gap-2 items-center">
                          <div
                            onClick={(event) =>
                              addFavouriteItemsWishList(product, event)
                            }
                            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                            className="md:w-10 w-8 md:h-10 h-8 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
                          >
                            <Heart className="w-4 md:w-5 h-4 md:h-5" />
                          </div>
                          {/* <div
                            onClick={(event) =>
                              addProductToCart(product, event)
                            }
                            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                            className="md:w-10 w-8 md:h-10 h-8 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
                          >
                            <ShoppingBag className="w-4 md:w-5 h-4 md:h-5" />
                          </div> */}
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-2 px-2">
                      {/* <div
                        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
                        className="w-60 mx-auto"
                      >
                        <Countdown />
                      </div> */}
                      <p className="text-[18px] leading-[30px] font-semibold text-[#212529] mt-4 whitespace-nowrap overflow-hidden text-ellipsis">
                        {product.name}
                      </p>
                      <div className="flex">
                        {Array.from({ length: Math.floor(product.rating) }).map(
                          (_, index) => (
                            <Star
                              key={index}
                              className="w-4 h-4 text-yellow-500"
                              fill="#f88e0f"
                            />
                          )
                        )}
                        <Star
                          className="w-4 h-4 text-yellow-500"
                          fill="#f8f9fa"
                        />
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-[18px] leading-[27px] font-semibold text-pink-600">
                          ₹{product.price}
                        </p>
                        <p className="text-[14px] leading-[24px] line-through font-semibold text-[#212529]">
                          ₹ 2000
                        </p>
                        <p className="text-[16px] leading-[24px] font-semibold text-[#f39924]">
                          30% OFF
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={(event) => addProductToCart(product, event)}
                          className="text-[16] leading-[24px] px-2 w-1/2 font-semibold cursor-pointer py-2 rounded-md hover:bg-[#00bbae] bg-[#e9ecef] hover:text-white transition duration-300"
                        >
                          Add To Cart
                        </button>
                        <button className="text-[16] leading-[24px] px-2 w-1/2 font-semibold cursor-pointer py-2 rounded-md bg-[#00bbae] text-white hover:text-black hover:bg-[#e9ecef] transition duration-300">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <ChevronLeft
            className="swiper-button-prev-pc absolute left-0 top-32 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer opacity-25 hover:opacity-100"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          />
          <ChevronRight
            className="swiper-button-next-pc absolute right-0 top-32 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer opacity-25 hover:opacity-100"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          />
        </div>
        <Link
          to="/products"
          className="flex justify-center items-center w-full ml-0 sm:ml-4"
        >
          <p className="mt-5 rounded-full py-2 px-8 font-semibold text-[16px] leading-[24px] transition-all duration-300 text-white hover:bg-amber-700 hover:scale-100 cursor-pointer bg-amber-500 flex items-center justify-center">
            VIEW ALL
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductsCollection;

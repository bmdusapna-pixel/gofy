import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  Star,
  ShoppingBasket,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import product_list from "../assets/product-list";

const RelatedItems = ({ heading }) => {
  const addProductToCart = (product, event) => {
    event.preventDefault();
    console.log("Added to cart:", product.name);
  };

  const addFavouriteItemsWishList = (product, event) => {
    event.preventDefault();
    console.log("Added to wishlist:", product.name);
  };
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex items-center justify-between">
        <p className="text-[30px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#212529] font-bold">
          {heading ? heading : "Related Products"}
        </p>
        <Link to="/products" className="md:text-[18px] text-red-600">
          See all Products
        </Link>
      </div>
      <div className="w-full relative">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next-rp",
            prevEl: ".swiper-button-prev-rp",
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 20 },
            480: { slidesPerView: 2, spaceBetween: 20 },
            800: { slidesPerView: 2, spaceBetween: 10 },
            1280: { slidesPerView: 3, spaceBetween: 10 },
            1536: { slidesPerView: 4, spaceBetween: 10 },
          }}
          loop={true}
          grabCursor={true}
        >
          {product_list.map((product) => (
            <SwiperSlide key={product._id}>
              <Link
                to={`/products/toys/${product.url}`}
                className="w-full border flex md:flex-row flex-col gap-3 xl:gap-5 border-gray-200 rounded-md p-2"
              >
                <div className="w-full h-60 lg:w-1/2 bg-[#FFC0CB] rounded-md flex items-center justify-center relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-contain"
                  />
                  {/* <p className="absolute top-0 left-0 bg-[#dc3545] rounded-tl-md rounded-br-md text-white text-[14px] leading-[20px] px-3 py-0.5">
                    -23%
                  </p> */}
                </div>
                <div className="flex flex-col gap-1 py-5 w-full lg:w-1/2 lg:px-0 px-2">
                  <p className="text-[#212529] text-[16px] leading-[24px] opacity-75">
                    {product.product_type}
                  </p>
                  <p className="text-[20px] leading-[30px] text-[#212529] font-bold">
                    {product?.name}
                  </p>
                  <div className="flex lg:flex-row md:flex-col flex-row w-full items-center">
                    <div className="flex gap-1 items-center">
                      {/* {Array.from({ length: Math.floor(product.rating) }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            className="w-5 h-5 text-[white]"
                            fill="#f88e0f"
                          />
                        )
                      )} */}
                      {Array.from({
                        length: Math.floor(product.rating),
                      }).map((_, index) => (
                        <Star
                          key={index}
                          className="w-4 h-4 text-[#f88e0f]"
                          fill="#f88e0f"
                        />
                      ))}
                      {Array.from({
                        length: 5 - Math.floor(product.rating),
                      }).map((_, index) => (
                        <Star
                          key={index}
                          className="w-4 h-4 text-[#f88e0f]"
                          fill="#f8f9fa"
                        />
                      ))}
                    </div>
                    {/* <p className="text-gray-500 text-base leading-[16px]">
                      ({product.review} Reviews)
                    </p> */}
                  </div>
                  <div className="flex gap-3 items-center">
                    <p className="text-pink-600 text-[20px] leading-[30px] font-semibold">
                      ₹ {product.price}
                    </p>
                    <p className="text-gray-500 line-through text-[16px] leading-[30px] font-semibold">
                      ₹ {product.price + 100}
                    </p>
                    <p className="text-red-600 text-[16px] leading-[30px] font-semibold">
                      {(
                        100 -
                        (product.price / (product.price + 100)) * 100
                      ).toFixed(0)}
                      % Off
                    </p>
                  </div>
                  <div className="flex md:flex-col lg:flex-row flex-row gap-5 md:gap-2 lg:gap-5 items-center mt-auto">
                    <div
                      onClick={(event) => addProductToCart(product, event)}
                      className="rounded-full transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-4 py-2 bg-[#00bbae] flex gap-3 items-center justify-center"
                    >
                      <ShoppingBasket className="w-5 h-5 text-white" />
                      <p className="text-[16px] leading-[18px] font-semibold text-white">
                        Add to cart
                      </p>
                    </div>
                    <div className="flex gap-5">
                      <div
                        onClick={(event) =>
                          addFavouriteItemsWishList(product, event)
                        }
                        className="cursor-pointer w-10 border border-gray-200 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-gray-500 hover:text-white"
                      >
                        <Heart className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <ChevronLeft
          className="swiper-button-prev-rp absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer h-10 w-10 opacity-25 hover:opacity-100 p-1"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
        />
        <ChevronRight
          className="swiper-button-next-rp absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer h-10 w-10 opacity-25 hover:opacity-100 p-1"
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
        />
      </div>
    </div>
  );
};

export default RelatedItems;

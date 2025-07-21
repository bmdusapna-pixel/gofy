import React, { useContext, useRef, useState } from "react";
import { Facebook, Heart, Linkedin, Loader, Minus, Plus, RefreshCcw, ShoppingBasket, Star, Twitter, User2Icon } from "lucide-react";
import { Countdown } from "../Components/AnimatedDropdown";
import { CartContext } from "../Context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import product_list from "../assets/product-list";

const product_reviews = [
  {
    _id: 1,
    name: "Alice Johnson",
    date: "2025-07-18",
    description: "Fantastic quality and fast delivery. Highly recommend!",
    rating: 5
  },
  {
    _id: 2,
    name: "Bob Smith",
    date: "2025-07-17",
    description: "The product is decent for the price, but packaging could be better.",
    rating: 4
  },
  {
    _id: 3,
    name: "Charlie Davis",
    date: "2025-07-16",
    description: "Not satisfied with the product. It didn’t match the description.",
    rating: 2
  }
];

const ProductDetails = () => {
  const swiperRef = useRef(null);
  const { url } = useParams();
  const { isMobileMenuOpen, setIsMobileMenuOpen, cartItems, openCart, setOpenCart, totalItems, formSubmit, addingProductToCart } = useContext(CartContext);
  const [currentMenu, setCurrentMenu] = useState("reviews");
  const [quantity, setQuantity] = useState(1);
  const [reviewData, setReviewData] = useState({
    name: "",
    description: "",
    email: "",
    starRating: 5,
  });

  const product = product_list.find((item) => item.url === url);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setReviewData((prev) => ({...prev, [name]: value }));
  };

  const handleThumbnailClick = (index) => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(index);
    }
  };

  const addProductToCart = (product) => {
    addingProductToCart(product, quantity);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => prev > 1 ? prev - 1 : prev);
  };

  const giveStarRating = (value) => {
    setReviewData((prev) => ({...prev, starRating: value}));
  };

  const submitReview = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full lg:px-12 px-5 mx-auto py-10 flex flex-col gap-20">
        <div className="flex lg:flex-row flex-col gap-10 w-full">
          <div className="lg:w-1/2 w-full flex lg:flex-row flex-col-reverse gap-5">
            <div className="flex lg:flex-col flex-row gap-2 w-full lg:w-24 h-full lg:h-24">
              {
                product.images.map((item, index) => (
                  <div onClick={() => handleThumbnailClick(index)} className="w-full cursor-pointer bg-white rounded-2xl border border-gray-200" key={index}>
                    <img src={item} className="w-full" alt={product.name} />
                  </div>
                ))
              }
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl w-full lg:w-4/5">
              <Swiper onSwiper={(swiper) => { swiperRef.current = swiper }} modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} slidesPerView={1}>
                {
                  product.images.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img src={item} className="w-full object-cover" alt={`Product image ${index + 1}`} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col gap-5">
            <div className="flex w-full items-center">
              {
                Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                  <Star key={index} className="w-6 h-6 text-white" fill="#f88e0f" />
                ))
              }
              <p className="text-gray-500 text-base leading-[16px]">({product.review} Customer Reviews)</p>
            </div>
            <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold">{product.name}</p>
            <div className="flex gap-2 items-center">
              <p className="text-black font-semibold text-[16px] leading-[24px]">Share:</p>
              <div className="flex items-center gap-2 w-full">
                <div className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center">
                  <Twitter className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </div>
              </div>
            </div>
            <p className="text-[#69778a] text-[16px] leading-[24px]">Lorem ipsum dolor sit amet consectetur. Nunc sit morbi turpis sed volutpat egestas. Mollis scelerisque a sem morbi sed donec eu. Dui platea scelerisque ut posuere. Sit posuere aliquet venenatis quam.</p>
            <div className="flex gap-2 items-center">
              <p className="text-[20px] leading-[30px] text-[#001430] line-through">₹56.00</p>
              <p className="text-[30px] leading-[40px]  text-[#001430] font-semibold">₹56.00</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[18px] leading-[24px] text-[#dc0000] font-semibold">Sales end in:</p>
              <div className="border-[1px] border-[#dc0000] px-4 py-1 rounded-full">
                <Countdown />
              </div>
            </div>
            <div className="flex flex-wrap gap-5 items-center">
              <div className="flex w-28 h-14 sm:h-16 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex flex-col items-center justify-between bg-white w-1/2 py-2 border-r border-gray-200">
                  <Plus onClick={increaseQuantity} className="sm:w-5 sm:h-5 w-4 h-4 text-black cursor-pointer" />
                  <div className="w-full bg-gray-200 h-[0.5px]"></div>
                  <Minus onClick={decreaseQuantity} className="sm:w-5 sm:h-5 w-4 h-4 text-black cursor-pointer" />
                </div>
                <div className="flex items-center justify-center w-1/2 bg-white">
                  <span className="text-[20px] leading-[30px] font-semibold text-black">{quantity}</span>
                </div>
              </div>
              <div onClick={()=>addProductToCart(product)} className="py-2 sm:py-4 w-40 md:w-48 rounded-2xl transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 bg-[#00bbae] flex gap-3 items-center justify-center">
                <ShoppingBasket className="w-6 h-6 text-white" />
                <p className="text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] font-semibold text-white">Add to cart</p>
              </div>
              <div className="cursor-pointer w-14 sm:w-16 h-14 sm:h-16 flex items-center justify-center rounded-2xl bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white">
                <Heart className="w-4 sm:w-6 h-4 sm:h-6" />
              </div>
              <div className="cursor-pointer w-16 h-16 flex items-center justify-center rounded-2xl bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white">
                <RefreshCcw className="w-4 sm:w-6 h-4 sm:h-6" />
              </div>
            </div>
              <div className="w-full flex rounded-2xl bg-white px-2 py-6">
                <div className="grid grid-cols-2 w-full gap-5 lg:px-10 px-5">
                  <div className="flex gap-1 items-center">
                    <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">SKU:</p>
                    <p className="text-[16px] leading-[24px] text-[#69778a]">BG-1018</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">SKU:</p>
                    <p className="text-[16px] leading-[24px] text-[#69778a]">BG-1018</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">SKU:</p>
                    <p className="text-[16px] leading-[24px] text-[#69778a]">BG-1018</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">SKU:</p>
                    <p className="text-[16px] leading-[24px] text-[#69778a]">BG-1018</p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded-2xl p-6 md:p-12 bg-white relative">
          <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 flex gap-4 items-center w-max">
            <p onClick={()=>setCurrentMenu("description")} style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} className={`px-4 lg:px-8 py-1.5 lg:py-2 rounded-full duration-300 transition-colors ${currentMenu === "description" ? "bg-[#00bbae]" : "bg-[#f9f9f9]"} text-black hover:bg-[#00bbae] bg-[#f9f9f9] cursor-pointer hover:text-white text-[20px] leading-[30px] md:text-[24px] md:leading-[37px] font-semibold`}>Description</p>
            <p onClick={()=>setCurrentMenu("reviews")} style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} className={`px-4 lg:px-8 py-1.5 lg:py-2 rounded-full duration-300 transition-colors ${currentMenu === "reviews" ? "bg-[#00bbae]" : "bg-[#f9f9f9]"} text-black hover:bg-[#00bbae] bg-[#f9f9f9] cursor-pointer hover:text-white text-[20px] leading-[30px] md:text-[24px] md:leading-[37px] font-semibold`}>Reviews</p>
          </div>
          {
            currentMenu === "description" ?
            (
              <p className="mt-5 lg:mt-0 text-[16px] leading-[24px] text-[#69778a]">Lorem ipsum dolor sit amet consectetur. Dui elit hac massa nulla nibh neque. Id risus feugiat turpis amet odio in. Tellus convallis et viverra mattis senectus urna risus velit. Maecenas augue viverra quam euismod convallis id aliquet et. Morbi a euismod non tellus mi auctor. Venenatis id pellentesque venenatis aliquet tortor morbi. Amet morbi feugiat volutpat neque amet id massa non. Sollicitudin maecenas turpis scelerisque orci vitae purus maecenas tempus consequat. Eu amet interdum venenatis egestas sed faucibus varius.Elementum massa ultrices a et libero etiam pulvinar. Diam quis tristique leo risus tellus in pellentesque proin. Viverra pellentesque pretium mauris ornare sed elementum praesent massa tristique. Ut magna at facilisi sed morbi sit arcu. Dignissim semper sed mattis risus ornare donec. Sem sed interdum arcu pellentesque pulvinar leo. Velit mattis blandit luctus sed massa tempor adipiscing pretium. Pellentesque dignissim massa sed ullamcorper ac nibh a. Odio neque molestie scelerisque ipsum aliquam. Mauris semper lorem est nisl scelerisque.Eget consequat nunc id sed ultrices. Sed dui id tincidunt lacus morbi nullam. Cras enim faucibus elit auctor purus amet. Gravida proin diam fermentum amet diam eget viverra. Netus dui nullam arcu duis amet sed adipiscing nisl nisi. Nulla auctor hac quisque bibendum suspendisse blandit enim pellentesque ornare. Ornare ac scelerisque.</p>
            ) 
            :
            (
              <div className="flex flex-col gap-5 w-full">
                <p className="text-[18px] leading-[27px] text-black font-semibold">3 review for Outdoor Swing Set</p>
                <div className="flex flex-col gap-3 w-full">
                  {
                    product_reviews.map((product) => (
                      <div className="flex sm:flex-row flex-col justify-between w-full sm:gap-0 gap-4 border-gray-200 rounded-md p-6 border-[1px]" key={product._id}>
                        <div className="flex gap-3 sm:gap-5 w-full">
                          <div className="w-11 sm:w-14 h-10 sm:h-14 flex items-center justify-center rounded-full bg-gray-300 p-2">
                            <User2Icon className="w-5 sm:w-8 h-5 sm:h-8 text-white" />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <div className="flex gap-1 items-center">
                              <p className="text-[16px] text-black leading-[24px] font-semibold">{product.name}</p>
                              <p className="text-[14px] text-gray-500 leading-[21px] font-medium"> - {product.date}</p>
                            </div>
                            <p className="text-[16px] text-gray-500 leading-[24px] font-medium w-full">{product.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {
                            Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
                              <Star key={index} className="w-4 h-4 text-yellow-500" fill="#f88e0f" />
                            ))
                          }
                          <Star className="w-4 h-4 text-yellow-500" fill="#f8f9fa" />
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-[18px] leading-[27px] text-black font-semibold">Add a review</p>
                  <p className="text-[16px] text-gray-500 leading-[24px] font-medium w-full">Your email address will not be published. Required fields are marked *</p>
                </div>
                <div className="flex gap-8 w-full">
                  <p className="text-[14px] leading-[21px] font-semibold text-black">Your Rating</p>
                  <div className="flex gap-0.5">
                    {
                      Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} onClick={() => giveStarRating(i + 1)} className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${i < reviewData.starRating ? "text-yellow-500" : "text-[#d1d5db]"}`} fill={i < reviewData.starRating ? "#f59e0b" : "#d1d5db"} />  
                      ))
                    }
                  </div>
                </div>
                <form onSubmit={submitReview} className="w-full flex-col flex gap-5">
                  <textarea required placeholder="Your Review *" rows="4" className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full border border-gray-200 focus:border-[#00bbae] outline-none p-4 rounded-md" name="description" onChange={inputChangeHandler} value={reviewData.description} id="">
                  </textarea>
                  <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 w-full items-center">
                    <input required placeholder="Your name *" name="name" value={reviewData.name} onChange={inputChangeHandler} type="text" className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                    <input required placeholder="Your email *" name="email" value={reviewData.email} onChange={inputChangeHandler} type="text" className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                  </div>
                  <button type="submit" className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">{formSubmit ? <Loader className="w-6 h-6 text-white animate-spin" /> : "Submit"}</button>
                </form>
              </div>
            )           
          }
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

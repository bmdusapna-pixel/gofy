import React, { useContext, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Copy, Facebook, Heart, IndianRupee, Linkedin, Loader, Minus, Plus, ShoppingBasket, Star, Tag, Twitter, User2Icon } from "lucide-react";
import { Countdown } from "../Components/AnimatedDropdown";
import { CartContext } from "../Context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Link, useParams } from "react-router-dom";
import { clothe_items } from "../assets/helper.js";
import SizeChart from "../Components/SizeChart.jsx";

const product_reviews = [
  {
    _id: 1,
    name: "Alice Johnson",
    date: "2025-07-18",
    description: "Fantastic quality and fast delivery. Highly recommend!",
    rating: 5,
  },
  {
    _id: 2,
    name: "Bob Smith",
    date: "2025-07-17",
    description:
      "The product is decent for the price, but packaging could be better.",
    rating: 4,
  },
  {
    _id: 3,
    name: "Charlie Davis",
    date: "2025-07-16",
    description:
      "Not satisfied with the product. It didn’t match the description.",
    rating: 2,
  },
];

const coupon_data = [
  {
    _id: 1,
    description: "Flat 10% Off on Orders Above ₹1999/-",
    code: "FLAT10",
  },
  {
    _id: 2,
    description: "Flat 15% Off on Orders Above ₹2999/-",
    code: "FLAT15",
  },
  {
    _id: 3,
    description: "Flat 20% Off on Orders Above ₹4599/-",
    code: "FLAT20",
  },
];

const product_details = [
  {
    _id: 1,
    title: "Product Description",
  },
  {
    _id: 2,
    title: "Product Specification",
  },
  {
    _id: 3,
    title: "Shipping & Returns",
  },
  {
    _id: 4,
    title: "Wash Care",
  },
];

const sizes = [
  { _id: 1, size: '0-3Months' },
  { _id: 2, size: '3-6 Months' },
  { _id: 3, size: '6-9 Months' },
  { _id: 4, size: '9-12 Months' },
  { _id: 5, size: '12-18 Months' },
  { _id: 6, size: '18-24 Months' },
  { _id: 7, size: '2-3 Years' },
  { _id: 8, size: '3-4 Years' },
  { _id: 9, size: '4-5 Years' },
  { _id: 10, size: '5-6 Years' },
  { _id: 11, size: '7-8 Years' },
  { _id: 12, size: '9-10 Years' },
  { _id: 13, size: '11-12 Years' },
  { _id: 14, size: '13-14 Years' }
]

const ClothesDetails = () => {
  const swiperRef = useRef(null);
  const { url } = useParams();
  const { isMobileMenuOpen, setIsMobileMenuOpen, cartItems, openCart, setOpenCart, totalItems, formSubmit, addingProductToCart, addFavouriteItems } = useContext(CartContext);
  const [currentMenu, setCurrentMenu] = useState("PRODUCT DESCRIPTION");
  const [quantity, setQuantity] = useState(1);
  const [isSizeSelected, setIsSizeSelected] = useState(null);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: "",
    description: "",
    email: "",
    starRating: 5,
  });

  const clothe = clothe_items.find((item) => item.url === url);

  const addFavouriteItemsWishList = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    addFavouriteItems(product);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setReviewData((prev) => ({...prev, [name]: value }));
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

  const handleThumbnailClick = (index) => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(index);
    }
  };

  const submitReview = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      {openSizeChart && (<div className="fixed inset-0 bg-black/50 z-40"></div>)}
      <div className="w-full lg:px-12 px-5 mx-auto py-10 flex flex-col gap-20">
        <div className="flex lg:flex-row flex-col gap-5 w-full">
          <div className="lg:w-1/2 w-full flex lg:flex-row flex-col-reverse gap-5">
            <div className="flex lg:flex-col flex-row gap-2 w-full lg:w-24 h-full lg:h-24">
              {
                clothe.images.map((item, index) => (
                  <div onClick={() => handleThumbnailClick(index)} className="w-full cursor-pointer bg-white rounded-2xl border border-gray-200" key={index}>
                    <img src={item} className="w-full" alt={item.name} />
                  </div>
                ))
              }
            </div>
            <div className="bg-[#e9f9fc] border border-gray-200 rounded-2xl w-full lg:w-4/5">
              <Swiper onSwiper={(swiper) => { swiperRef.current = swiper }} modules={[Autoplay]} autoplay={{ delay: 3000, disableOnInteraction: false }} slidesPerView={1}>
                {
                  clothe.images.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img src={item} className="w-full object-cover" alt={`Product image ${index + 1}`} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col gap-3 2xl:gap-8 ">
            <div className="flex w-full items-center">
              {
                Array.from({ length: Math.floor(clothe.rating) }).map((_, index) => (
                  <Star key={index} className="w-6 h-6 text-white" fill="#f88e0f" />
                ))
              }
              <p className="text-gray-500 text-base leading-[16px]">({clothe.review} Customer Reviews)</p>
            </div>
            <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold">{clothe.name}</p>
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
            <div className="flex gap-3 items-center w-full">
              <div className="flex gap-1 items-center">
                <p className="text-[20px] leading-[30px] text-[#001430] line-through">₹56.00</p>
                <p className="text-[30px] leading-[40px] text-[#001430] font-semibold">₹56.00</p>
              </div>
              <div className="flex w-28 h-12 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex flex-col items-center justify-between bg-white w-1/2 border-r border-gray-200">
                  <div className="flex justify-center items-center cursor-pointer w-5 h-5">
                    <Plus onClick={increaseQuantity} className="w-4 h-4 text-black cursor-pointer" />
                  </div>
                  <div className="w-full bg-gray-200 h-[0.5px]"></div>
                  <div className="flex justify-center items-center cursor-pointer w-5 h-5">
                    <Minus onClick={decreaseQuantity} className="w-4 h-4 text-black cursor-pointer" />
                  </div>
                </div>
                <div className="flex items-center justify-center w-1/2 bg-white">
                  <span className="text-[20px] leading-[30px] font-semibold text-black">{quantity}</span>
                </div>
              </div>
              <div onClick={()=>addProductToCart(clothe)} className="py-2 w-40 rounded-2xl transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 bg-[#00bbae] flex gap-3 items-center justify-center">
                <ShoppingBasket className="w-6 h-6 text-white" />
                <p className="text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] font-semibold text-white">Add to cart</p>
              </div>
              <div onClick={()=>addProductToCart(clothe)} className="py-2 w-40 rounded-2xl transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 bg-[#00bbae] flex gap-3 items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
                <p className="text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] font-semibold text-white">Buy Now</p>
              </div>
              <div onClick={()=>addFavouriteItems(clothe)} className="cursor-pointer w-12 h-12 border border-gray-200 flex items-center justify-center rounded-2xl bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white">
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col w-full gap-3 sm:gap-10">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-[16px] leading-[24px] text-blank font-medium mr-5">Sizes</p>
                  <p onClick={()=>setOpenSizeChart(true)} className="text-[16px] leading-[24px] text-[#dc3545] transition-colors duration-300 hover:text-[#00bbae] hover:font-semibold cursor-pointer font-medium mr-5">SIZE CHART</p>
                </div>
                <div className="w-full flex gap-2 flex-wrap">
                {
                  sizes.map((item) => (
                    <div onClick={()=>setIsSizeSelected(item.size)} key={item._id} className="py-1 px-2 rounded-sm gap-3 border border-gray-500 transition-colors duration-300 hover:text-white hover:bg-[#00BBAE] cursor-pointer flex items-center justify-center">
                      <p className="text-[14px] leading-[21px] font-medium">{item.size}</p>
                    </div>
                  ))
                }
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[20px] leading-[30px] font-semibold text-black">Offers Available</p>
              <div className="flex flex-col gap-1">
                {
                  coupon_data.map((coupon) => (
                    <div className="flex gap-5 sm:gap-20 items-center" key={coupon._id}>
                      <div className="flex gap-1 sm:gap-3 items-center">
                        <div className="w-5 h-5">
                          <Tag className="w-full h-full text-black" fill="#fff" />
                        </div>
                        <p className="text-[16px] leading-[24px] text-black font-medium">{coupon.description}</p>
                      </div>
                      <div className="border-[2px] border-dashed border-[#00BBAE] p-1 bg-[#e9f9fc] rounded-sm flex gap-3 items-center">
                        <p className="text-[14px] leading-[21px] text-black">{coupon.code}</p>
                        <Copy className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-1 items-start">
                <div className="flex gap-1 items-center">
                  <Clock className="w-4 h-4 text-black" />
                  <p className="text-[14px] leading-[21px] font-medium">Expected delivery time :</p>
                </div>
                <p className="text-[16px] leading-[24px] font-semibold">Monday 28 July - Tuesday 29 July.</p>
              </div>
              <div className="flex gap-2 items-center">
                <input type="text" className="transition-colors bg-white text-[18px] leading-[27px] duration-300 w-28 px-2 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="PIN Code" />
                <button className="rounded-md py-1.5 px-2 text-[16px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">Get Expected Delivery</button>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-[18px] leading-[24px] text-[#dc0000] font-semibold">Sales end in:</p>
              <div className="border-[1px] border-[#dc0000] rounded-md">
                <Countdown />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex gap-1 sm:gap-5 items-center border-b-[2px] border-gray-200">
            {
              product_details.map((item) => (
                <div onClick={()=>setCurrentMenu(item.title)} className={`cursor-pointer px-2 sm:px-4 py-2 transition-colors duration-300 ${currentMenu === item.title ? "bg-[#00bbae] text-white font-semibold" : "bg-gray-200 text-black hover:bg-[#00bbae] hover:text-white font-medium"}`} key={item._id}>
                  <p className="md:text-[18px] md:leading-[27px] text-[16px] leading-[24px]">{item.title}</p>
                </div>
              ))
            }
          </div>
          <div className="w-full border border-gray-200 rounded-2xl p-6 bg-white">
            { currentMenu === "Product Description" && <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Lorem ipsum dolor sit amet consectetur. Dui elit hac massa nulla nibh neque. Id risus feugiat turpis amet odio in. Tellus convallis et viverra mattis senectus urna risus velit. Maecenas augue viverra quam euismod convallis id aliquet et. Morbi a euismod non tellus mi auctor. Venenatis id pellentesque venenatis aliquet tortor morbi. Amet morbi feugiat volutpat neque amet id massa non. Sollicitudin maecenas turpis scelerisque orci vitae purus maecenas tempus consequat. Eu amet interdum venenatis egestas sed faucibus varius.Elementum massa ultrices a et libero etiam pulvinar. Diam quis tristique leo risus tellus in pellentesque proin. Viverra pellentesque pretium mauris ornare sed elementum praesent massa tristique. Ut magna at facilisi sed morbi sit arcu. Dignissim semper sed mattis risus ornare donec. Sem sed interdum arcu pellentesque pulvinar leo. Velit mattis blandit luctus sed massa tempor adipiscing pretium. Pellentesque dignissim massa sed ullamcorper ac nibh a. Odio neque molestie scelerisque ipsum aliquam. Mauris semper lorem est nisl scelerisque.Eget consequat nunc id sed ultrices. Sed dui id tincidunt lacus morbi nullam. Cras enim faucibus elit auctor purus amet. Gravida proin diam fermentum amet diam eget viverra. Netus dui nullam arcu duis amet sed adipiscing nisl nisi. Nulla auctor hac quisque bibendum suspendisse blandit enim pellentesque ornare. Ornare ac scelerisque.</p> }
            { 
              currentMenu === "Product Specification" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-2 lg:space-y-1 w-full">
                  <ToyDetailRow label="Items Included in the Package" value="1 Toy" />
                  <ToyDetailRow label="Country Of Origin" value="India" />
                  <ToyDetailRow label="Material" value={clothe.material} />
                  <ToyDetailRow label="Color" value={clothe.color} />
                  <ToyDetailRow label="Age Group" value={clothe.age_group} />
                  <ToyDetailRow label="Sub Category" value={clothe.sub_category} />
                </div>
              ) 
            }
            { 
              currentMenu === "Shipping & Returns" && (
                <div className="flex flex-col gap-2">
                  <ToyDetailRow label="Estimated Order Processing Time:" value="24 to 48 hours" />
                  <ToyDetailRow label="Estimated Delivery Time: Metros:" value="3 - 4 days, Rest of India: 5 -10 days" />
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Customers can return their order within 14 days after an order has been delivered. We have a reverse pick up facility for most pin codes. For pin codes that are non- serviceable by our courier partners against the reverse pick up policy, you will have to self ship the product(s).</p>
                </div>
              ) 
            }
            {
              currentMenu === "Wash Care" && (
                <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-2">
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Machine wash..</p>
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Wash in cold water, use mild detergent.</p>
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Dry in shade.</p>
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Do not iron directly or scrub on print.</p>
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Do not bleach.</p>
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Do not tumble dry.</p>
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">Dry on flat surface as hanging may cause measurement variations.</p>
                </div>
              )
            }
          </div>
        </div>
        <div className="w-full border border-gray-200 rounded-2xl p-6 bg-white relative">
          <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 flex gap-4 items-center w-max">
            <p style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} className="px-4 lg:px-8 py-1.5 lg:py-2 rounded-full text-black bg-[#f9f9f9] text-[20px] leading-[30px] md:text-[24px] md:leading-[37px] font-semibold">Reviews</p>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <p className="text-[18px] leading-[27px] text-black font-semibold">{clothe.review} review for Outdoor Swing Set</p>
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
        </div>

        {/* realated products */}
        <div className="flex flex-col gap-5 w-full">
          <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#212529] font-bold">Related Products</p>
          <div className="w-full overflow-x-hidden relative">
            <Swiper modules={[Autoplay, Navigation]} autoplay={{ delay: 3000, disableOnInteraction: false }} navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }} breakpoints={{ 0: { slidesPerView: 1, spaceBetween: 20 }, 480: { slidesPerView: 2, spaceBetween: 20 }, 800: { slidesPerView: 2, spaceBetween: 10 }, 1280: { slidesPerView: 3, spaceBetween: 10 }, 1536: { slidesPerView: 4, spaceBetween: 10 } }} loop={true} grabCursor={true}>
              {
                clothe_items.map((chlothe) => (
                  <SwiperSlide key={chlothe._id}>
                    <Link to={`/products/clothes/${chlothe.url}`} className="w-full border flex md:flex-row flex-col gap-3 xl:gap-5 border-gray-200 rounded-md p-2">
                      <div className="w-full h-60 lg:w-1/2 bg-[#FFC0CB] rounded-md flex items-center justify-center relative">
                        <img src={chlothe.images[0]} alt="" className="object-contain" />
                        <p className="absolute top-0 left-0 bg-[#dc3545] rounded-tl-md rounded-br-md text-white text-[14px] leading-[20px] px-3 py-0.5">-23%</p>
                      </div>
                      <div className="flex flex-col gap-1 py-5 w-full lg:w-1/2 lg:px-0 px-2">
                        <p className="text-[#212529] text-[16px] leading-[24px] opacity-75">{chlothe.sub_category}</p>
                        <p className="text-[20px] leading-[30px] text-[#212529] font-bold">{chlothe?.name}</p>
                        <div className="flex lg:flex-row md:flex-col flex-row w-full items-center">
                          <div className="flex gap-1 items-center">
                            {
                              Array.from({ length: Math.floor(chlothe.rating) }).map((_, index) => (
                                <Star key={index} className="w-5 h-5 text-[white]" fill="#f88e0f" />
                              ))
                            }
                          </div>
                          <p className="text-gray-500 text-base leading-[16px]">({chlothe.review} Reviews)</p>
                        </div>
                        <p className="text-black text-[20px] leading-[30px] font-semibold">₹ {chlothe.price}</p>
                        <div className="flex md:flex-col lg:flex-row flex-row gap-5 md:gap-2 lg:gap-5 items-center">
                          <div onClick={(event)=>addProductToCart(chlothe, event)} className="rounded-full transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-4 py-2 bg-[#00bbae] flex gap-3 items-center justify-center">
                            <ShoppingBasket className="w-5 h-5 text-white" />
                            <p className="text-[16px] leading-[18px] font-semibold text-white">Add to cart</p>
                          </div>
                          <div className="flex gap-5">
                            <div onClick={(event)=>addFavouriteItemsWishList(chlothe, event)} className="cursor-pointer w-10 border border-gray-200 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-gray-500 hover:text-white">
                              <Heart className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))
              }
            </Swiper>
            <ChevronLeft className="swiper-button-prev absolute left-0 top-40 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} />
            <ChevronRight className="swiper-button-next absolute right-0 top-40 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer" style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }} />
          </div>
        </div>
      </div>
      <SizeChart openSizeChart={openSizeChart} setOpenSizeChart={setOpenSizeChart} />
    </div>
  );
};

export default ClothesDetails;


const ToyDetailRow = ({ label, value }) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-semibold text-black">{label}:</p>
      <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">{value}</p>
    </div>
  );
};
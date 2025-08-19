import React, { useContext, useRef, useState } from "react";
import {
  Facebook,
  Heart,
  Linkedin,
  Loader,
  Minus,
  Plus,
  ShoppingBasket,
  Star,
  Twitter,
  User2Icon,
  Tag,
  Copy,
  IndianRupee,
  Clock,
  Truck,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { Countdown } from "../Components/AnimatedDropdown";
import { CartContext } from "../Context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "react-router-dom";
import product_list from "../assets/product-list";
import RelatedItems from "../Components/RelatedItems";
import SizeChart from "../Components/SizeChart.jsx";
import ProductReviews from "../Components/ProductReviews.jsx";
import ExpandableParagraph from "../Components/ExpandableParagraph.jsx";
import useScrollToSection from "../hooks/useScrollToSection.jsx";
import ShareCopyButton from "../Components/ShareCopyButton.jsx";
import TrustIndicators from "../Components/TrustIndicators.jsx";
import ColorFilter from "../Components/ColorFilter.jsx";

const sizes = [
  { _id: 1, size: "12-18 Months" },
  { _id: 2, size: "18-24 Months" },
  { _id: 3, size: "2-3 Years" },
  { _id: 4, size: "3-4 Years" },
  { _id: 5, size: "4-5 Years" },
  { _id: 6, size: "5-6 Years" },
  { _id: 7, size: "7-8 Years" },
  { _id: 8, size: "9-10 Years" },
  { _id: 9, size: "11-12 Years" },
  { _id: 10, size: "13-14 Years" },
];

const toysReview = {
  id: "some-id",
  name: "Remote Control Car",
  review: 3,
};
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

const ProductDetails = () => {
  const [refDis, slideToDis] = useScrollToSection();
  const swiperRef = useRef(null);
  const { url } = useParams();
  const FaIconsComp = {
    faFacebookF,
    faInstagram,
    faXTwitter,
    faWhatsapp,
  };
  const currentUrl = encodeURIComponent(window.location.href);
  const FaShareLink = [
    {
      _id: 1,
      icon: "faFacebookF",
      url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
    },
    {
      _id: 2,
      icon: "faInstagram",
      url: "https://www.instagram.com/",
    },
    {
      _id: 3,
      icon: "faXTwitter",
      url: `https://twitter.com/intent/tweet?url=${currentUrl}`,
    },
    {
      _id: 4,
      icon: "faWhatsapp",
      url: `https://wa.me/?text=${currentUrl}`,
    },
  ];
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    cartItems,
    openCart,
    setOpenCart,
    totalItems,
    formSubmit,
    addingProductToCart,
    addFavouriteItems,
  } = useContext(CartContext);
  const [currentMenu, setCurrentMenu] = useState("Product Description");
  const [quantity, setQuantity] = useState(1);
  const [reviewData, setReviewData] = useState({
    name: "",
    description: "",
    email: "",
    starRating: 5,
  });

  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code); // Set the code that was just copied
      setTimeout(() => setCopiedCode(null), 2000); // Clear "Copied!" message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers or if permission is denied
      alert(`Failed to copy "${code}". Please copy manually.`);
    }
  };

  const product = product_list.find((item) => item.url === url);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
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
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const giveStarRating = (value) => {
    setReviewData((prev) => ({ ...prev, starRating: value }));
  };

  const submitReview = (event) => {
    event.preventDefault();
  };
  const [isSizeSelected, setIsSizeSelected] = useState(null);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full lg:px-12 px-5 mx-auto py-10 flex flex-col gap-5">
        <div className="flex lg:flex-row flex-col gap-10 w-full">
          <div className="lg:w-1/2 w-full flex lg:flex-row flex-col-reverse gap-5 relative">
            {product.stocks === 0 && (
              <p className="absolute top-5 right-5 bg-red-400 ribbon-flip pl-5 pr-2 text-white">
                Sold Out
              </p>
            )}
            <div className="flex lg:flex-col flex-row gap-2 w-full lg:w-24 h-full lg:h-24">
              {product.images.map((item, index) => (
                <div
                  onClick={() => handleThumbnailClick(index)}
                  className="w-full cursor-pointer bg-white rounded-2xl border border-gray-200"
                  key={index}
                >
                  <img src={item} className="w-full" alt={product.name} />
                </div>
              ))}
            </div>
            <div className="w-full lg:w-4/5">
              <div className="bg-white border border-gray-200 rounded-2xl">
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                  }}
                  modules={[Autoplay]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  slidesPerView={1}
                >
                  {product.images.map((item, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={item}
                        className="w-full object-cover"
                        alt={`Product image ${index + 1}`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col gap-5">
            {/* <div className="flex w-full items-center">
              {Array.from({ length: Math.floor(product.rating) }).map(
                (_, index) => (
                  <Star
                    key={index}
                    className="w-6 h-6 text-white"
                    fill="#f88e0f"
                  />
                )
              )}
              <p className="text-gray-500 text-base leading-[16px]">
                ({product.review} Customer Reviews)
              </p>
            </div> */}
            <div>
              <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold">
                {product.name}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-black font-semibold text-[16px] leading-[24px]">
                Share:
              </p>
              <div className="flex items-center gap-2 w-full">
                {/* <div className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </div> */}
                {FaShareLink.map((item) => {
                  const Icon = FaIconsComp[item.icon];
                  return (
                    <a
                      href={item.url}
                      target="_blank"
                      key={item._id}
                      className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center"
                    >
                      <FontAwesomeIcon className="w-4 h-4" icon={Icon} />
                    </a>
                  );
                })}
                <ShareCopyButton />
              </div>
            </div>
            <div className="flex gap-3">
              <p className="text-[#69778a] text-[16px] leading-[24px]">
                Lorem ipsum dolor sit amet consectetur. Dui elit hac massa nulla
                nibh neque.
                <span
                  className="whitespace-nowrap ml-3 text-blue-500"
                  onClick={slideToDis}
                >
                  See more
                </span>
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-[30px] leading-[40px]  text-pink-600 font-semibold">
                ₹56.00
              </p>
              <p className="text-[20px] leading-[30px] text-[#001430] line-through">
                ₹56.00
              </p>
              <p className="text-[22px] leading-[30px] text-red-600">30% OFF</p>
            </div>
            {/* <div className="flex gap-2 items-center">
              <p className="text-[18px] leading-[24px] text-[#dc0000] font-semibold">
                Sales end in:
              </p>
              <div className="border-[1px] border-[#dc0000] px-4 py-1 rounded-full">
                <Countdown />
              </div>
            </div> */}
            <div className="flex sm:flex-row flex-col w-full gap-3 sm:gap-10">
              <div className="flex flex-col gap-2 w-full">
                <div className="flex justify-between items-center">
                  <p className="text-[16px] leading-[24px] text-blank font-medium mr-5">
                    Sizes
                  </p>
                  <p
                    onClick={() => setOpenSizeChart(true)}
                    className="text-[16px] leading-[24px] text-[#dc3545] transition-colors duration-300 hover:text-[#00bbae] hover:font-semibold cursor-pointer font-medium mr-5"
                  >
                    SIZE CHART
                  </p>
                </div>
                <div className="w-full flex gap-2 flex-wrap">
                  {sizes.map((item) => (
                    <div
                      onClick={() => setIsSizeSelected(item.size)}
                      key={item._id}
                      className="py-1 px-2 rounded-sm gap-3 bg-[#e9ecef] transition-colors duration-300 hover:text-white hover:bg-[#00BBAE] cursor-pointer flex items-center justify-center"
                    >
                      <p className="text-[14px] leading-[21px] font-medium">
                        {item.size}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ColorFilter />
            <div className="flex flex-wrap gap-5 items-center">
              <div className="flex w-28 h-12 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex flex-col items-center justify-between bg-white w-1/2 border-r border-gray-200">
                  <div className="flex justify-center items-center cursor-pointer w-5 h-5">
                    <Plus
                      onClick={increaseQuantity}
                      className="w-4 h-4 text-black cursor-pointer"
                    />
                  </div>
                  <div className="w-full bg-gray-200 h-[0.5px]"></div>
                  <div className="flex justify-center items-center cursor-pointer w-5 h-5">
                    <Minus
                      onClick={decreaseQuantity}
                      className="w-4 h-4 text-black cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center w-1/2 bg-white">
                  <span className="text-[20px] leading-[30px] font-semibold text-black">
                    {quantity}
                  </span>
                </div>
              </div>
              <div
                onClick={() => addProductToCart(product)}
                className="py-2 w-40 rounded-2xl transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 bg-[#00bbae] flex gap-3 items-center justify-center"
              >
                <ShoppingBasket className="w-6 h-6 text-white" />
                <p className="text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] font-semibold text-white">
                  Add to cart
                </p>
              </div>
              <div className="py-2 w-40 rounded-2xl transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 bg-[#00bbae] flex gap-3 items-center justify-center">
                <IndianRupee className="w-6 h-6 text-white" />
                <p className="text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] font-semibold text-white">
                  Buy Now
                </p>
              </div>
              <div
                onClick={() => addFavouriteItems(product)}
                className="cursor-pointer w-12 h-12 border border-gray-200 flex items-center justify-center rounded-2xl bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
              >
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 py-3">
              {" "}
              <p className="text-xl leading-8 font-bold text-gray-800 border-b pb-3 mb-1">
                {" "}
                Offers Available
              </p>
              <div className="flex flex-col gap-0 md:max-w-[500px]">
                {" "}
                {coupon_data.map((coupon) => (
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                       px-3 pb-2 rounded-lg transition-all duration-200 ease-in-out
                       hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                    key={coupon._id}
                  >
                    <div className="flex items-center gap-3 mb-2 sm:mb-0">
                      {" "}
                      <div className="w-5 h-5 flex-shrink-0 text-green-600">
                        {" "}
                        <Tag className="w-full h-full" strokeWidth={2} />{" "}
                      </div>
                      <p className="text-base leading-relaxed text-gray-700 font-medium">
                        {" "}
                        {coupon.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(coupon.code)}
                      className="group relative flex items-center justify-center gap-2
                         px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold
                         rounded-full transition-all duration-200 ease-in-out
                         hover:bg-blue-100 hover:shadow-md active:scale-95
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                         min-w-[120px] h-9" // Ensures consistent width/height
                    >
                      <span
                        className={`transition-opacity duration-200 ${
                          copiedCode === coupon.code
                            ? "opacity-0 absolute"
                            : "opacity-100"
                        }`}
                      >
                        {coupon.code}
                      </span>
                      <span
                        className={`absolute transition-opacity duration-200 flex items-center gap-1
                                ${
                                  copiedCode === coupon.code
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                      >
                        Copied!{" "}
                        <Copy
                          className="w-4 h-4 text-blue-700"
                          strokeWidth={2}
                        />
                      </span>
                      {!copiedCode && (
                        <Copy
                          className="w-4 h-4 text-blue-700 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                          strokeWidth={2}
                        />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-1 items-start">
                <div className="flex gap-1 items-center">
                  <Clock className="w-4 h-4 text-black" />
                  <p className="text-[14px] leading-[21px] font-medium">
                    Expected delivery time :
                  </p>
                </div>
                <p className="text-[16px] leading-[24px] font-semibold">
                  Monday 28 July - Tuesday 29 July.
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="transition-colors bg-white text-[18px] leading-[27px] duration-300 w-28 px-2 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  placeholder="PIN Code"
                />
                <button className="rounded-md py-1.5 px-2 text-[16px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">
                  Get Expected Delivery
                </button>
              </div>
            </div>
            <TrustIndicators />
            {/* <div className="w-full flex rounded-2xl bg-white px-2 py-6">
              <div className="grid grid-cols-2 w-full gap-5 lg:px-10 px-5">
                <div className="flex gap-1 items-center">
                  <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                    SKU:
                  </p>
                  <p className="text-[16px] leading-[24px] text-[#69778a]">
                    BG-1018
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                    SKU:
                  </p>
                  <p className="text-[16px] leading-[24px] text-[#69778a]">
                    BG-1018
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                    SKU:
                  </p>
                  <p className="text-[16px] leading-[24px] text-[#69778a]">
                    BG-1018
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                    SKU:
                  </p>
                  <p className="text-[16px] leading-[24px] text-[#69778a]">
                    BG-1018
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="w-full border border-gray-200 rounded-2xl p-6 md:p-12 bg-white relative">
          <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 flex gap-4 items-center w-max">
            <p
              onClick={() => setCurrentMenu("description")}
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
              className={`px-4 lg:px-8 py-1.5 lg:py-2 rounded-full duration-300 transition-colors ${
                currentMenu === "description" ? "bg-[#00bbae]" : "bg-[#f9f9f9]"
              } text-black hover:bg-[#00bbae] bg-[#f9f9f9] cursor-pointer hover:text-white text-[20px] leading-[30px] md:text-[24px] md:leading-[37px] font-semibold`}
            >
              Description
            </p>
            <p
              onClick={() => setCurrentMenu("reviews")}
              style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
              className={`px-4 lg:px-8 py-1.5 lg:py-2 rounded-full duration-300 transition-colors ${
                currentMenu === "reviews" ? "bg-[#00bbae]" : "bg-[#f9f9f9]"
              } text-black hover:bg-[#00bbae] bg-[#f9f9f9] cursor-pointer hover:text-white text-[20px] leading-[30px] md:text-[24px] md:leading-[37px] font-semibold`}
            >
              Reviews
            </p>
          </div>
          {currentMenu === "description" ? (
            <p className="mt-5 lg:mt-0 text-[16px] leading-[24px] text-[#69778a]">
              Lorem ipsum dolor sit amet consectetur. Dui elit hac massa nulla
              nibh neque. Id risus feugiat turpis amet odio in. Tellus convallis
              et viverra mattis senectus urna risus velit. Maecenas augue
              viverra quam euismod convallis id aliquet et. Morbi a euismod non
              tellus mi auctor. Venenatis id pellentesque venenatis aliquet
              tortor morbi. Amet morbi feugiat volutpat neque amet id massa non.
              Sollicitudin maecenas turpis scelerisque orci vitae purus maecenas
              tempus consequat. Eu amet interdum venenatis egestas sed faucibus
              varius.Elementum massa ultrices a et libero etiam pulvinar. Diam
              quis tristique leo risus tellus in pellentesque proin. Viverra
              pellentesque pretium mauris ornare sed elementum praesent massa
              tristique. Ut magna at facilisi sed morbi sit arcu. Dignissim
              semper sed mattis risus ornare donec. Sem sed interdum arcu
              pellentesque pulvinar leo. Velit mattis blandit luctus sed massa
              tempor adipiscing pretium. Pellentesque dignissim massa sed
              ullamcorper ac nibh a. Odio neque molestie scelerisque ipsum
              aliquam. Mauris semper lorem est nisl scelerisque.Eget consequat
              nunc id sed ultrices. Sed dui id tincidunt lacus morbi nullam.
              Cras enim faucibus elit auctor purus amet. Gravida proin diam
              fermentum amet diam eget viverra. Netus dui nullam arcu duis amet
              sed adipiscing nisl nisi. Nulla auctor hac quisque bibendum
              suspendisse blandit enim pellentesque ornare. Ornare ac
              scelerisque.
            </p>
          ) : (
            <div className="flex flex-col gap-5 w-full">
              <p className="text-[18px] leading-[27px] text-black font-semibold">
                3 review for Outdoor Swing Set
              </p>
              <div className="flex flex-col gap-3 w-full">
                {product_reviews.map((product) => (
                  <div
                    className="flex sm:flex-row flex-col justify-between w-full sm:gap-0 gap-4 border-gray-200 rounded-md p-6 border-[1px]"
                    key={product._id}
                  >
                    <div className="flex gap-3 sm:gap-5 w-full">
                      <div className="w-11 sm:w-14 h-10 sm:h-14 flex items-center justify-center rounded-full bg-gray-300 p-2">
                        <User2Icon className="w-5 sm:w-8 h-5 sm:h-8 text-white" />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex gap-1 items-center">
                          <p className="text-[16px] text-black leading-[24px] font-semibold">
                            {product.name}
                          </p>
                          <p className="text-[14px] text-gray-500 leading-[21px] font-medium">
                            {" "}
                            - {product.date}
                          </p>
                        </div>
                        <p className="text-[16px] text-gray-500 leading-[24px] font-medium w-full">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
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
                  </div>
                ))}
              </div>
              <div className="flex flex-col w-full">
                <p className="text-[18px] leading-[27px] text-black font-semibold">
                  Add a review
                </p>
                <p className="text-[16px] text-gray-500 leading-[24px] font-medium w-full">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
              </div>
              <div className="flex gap-8 w-full">
                <p className="text-[14px] leading-[21px] font-semibold text-black">
                  Your Rating
                </p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      onClick={() => giveStarRating(i + 1)}
                      className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                        i < reviewData.starRating
                          ? "text-yellow-500"
                          : "text-[#d1d5db]"
                      }`}
                      fill={i < reviewData.starRating ? "#f59e0b" : "#d1d5db"}
                    />
                  ))}
                </div>
              </div>
              <form
                onSubmit={submitReview}
                className="w-full flex-col flex gap-5"
              >
                <textarea
                  required
                  placeholder="Your Review *"
                  rows="4"
                  className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full border border-gray-200 focus:border-[#00bbae] outline-none p-4 rounded-md"
                  name="description"
                  onChange={inputChangeHandler}
                  value={reviewData.description}
                  id=""
                ></textarea>
                <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 w-full items-center">
                  <input
                    required
                    placeholder="Your name *"
                    name="name"
                    value={reviewData.name}
                    onChange={inputChangeHandler}
                    type="text"
                    className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  />
                  <input
                    required
                    placeholder="Your email *"
                    name="email"
                    value={reviewData.email}
                    onChange={inputChangeHandler}
                    type="text"
                    className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
                >
                  {formSubmit ? (
                    <Loader className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          )}
        </div> */}
        <div className="w-full">
          <RelatedItems />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex gap-1 sm:gap-5 items-center border-b-[2px] border-gray-200">
            {product_details.map((item) => (
              <div
                onClick={() => setCurrentMenu(item.title)}
                className={`cursor-pointer px-2 sm:px-4 py-2 transition-colors duration-300 ${
                  currentMenu === item.title
                    ? "bg-[#00bbae] text-white font-semibold"
                    : "bg-gray-200 text-black hover:bg-[#00bbae] hover:text-white font-medium"
                }`}
                key={item._id}
              >
                <p className="md:text-[18px] md:leading-[27px] text-[16px] leading-[24px]">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full border border-gray-200 rounded-2xl p-6 bg-white">
            {currentMenu === "Product Description" && (
              <ExpandableParagraph
                ref={refDis}
                text="Lorem ipsum dolor sit amet consectetur. Dui elit hac massa nulla
                nibh neque. Id risus feugiat turpis amet odio in. Tellus
                convallis et viverra mattis senectus urna risus velit. Maecenas
                augue viverra quam euismod convallis id aliquet et. Morbi a
                euismod non tellus mi auctor. Venenatis id pellentesque
                venenatis aliquet tortor morbi. Amet morbi feugiat volutpat
                neque amet id massa non. Sollicitudin maecenas turpis
                scelerisque orci vitae purus maecenas tempus consequat. Eu amet
                interdum venenatis egestas sed faucibus varius.Elementum massa
                ultrices a et libero etiam pulvinar. Diam quis tristique leo
                risus tellus in pellentesque proin. Viverra pellentesque pretium
                mauris ornare sed elementum praesent massa tristique. Ut magna
                at facilisi sed morbi sit arcu. Dignissim semper sed mattis
                risus ornare donec. Sem sed interdum arcu pellentesque pulvinar
                leo. Velit mattis blandit luctus sed massa tempor adipiscing
                pretium. Pellentesque dignissim massa sed ullamcorper ac nibh a.
                Odio neque molestie scelerisque ipsum aliquam. Mauris semper
                lorem est nisl scelerisque.Eget consequat nunc id sed ultrices.
                Sed dui id tincidunt lacus morbi nullam. Cras enim faucibus elit
                auctor purus amet. Gravida proin diam fermentum amet diam eget
                viverra. Netus dui nullam arcu duis amet sed adipiscing nisl
                nisi. Nulla auctor hac quisque bibendum suspendisse blandit enim
                pellentesque ornare. Ornare ac scelerisque."
              />
            )}
            {currentMenu === "Product Specification" && (
              <div className="space-y-2 lg:space-y-1 w-full">
                <ToyDetailRow
                  label="Items Included in the Package"
                  value="1 Toy"
                />
                <ToyDetailRow label="Country Of Origin" value="India" />
                <ToyDetailRow label="Material" value="Cotton" />
                <ToyDetailRow label="Color" value="Red" />
                <ToyDetailRow label="Age Group" value="2-4 years" />
                <ToyDetailRow label="Sub Category" value="Soft Toys" />
              </div>
            )}
            {currentMenu === "Shipping & Returns" && (
              <div className="flex flex-col gap-2">
                <p className="flex gap-1 items-center">
                  <Clock className="w-5 h-5 text-[#00bbae]" />
                  <ToyDetailRow
                    label="Estimated Order Processing Time:"
                    value="24 to 48 hours"
                  />
                </p>
                <p className="flex gap-1 items-center">
                  <Truck className="w-5 h-5 text-[#00bbae]" />
                  <ToyDetailRow
                    label="Estimated Delivery Time: Metros:"
                    value="3 - 4 days, Rest of India: 5 -10 days"
                  />
                </p>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Customers can return their order within 14 days after an order
                  has been delivered. We have a reverse pick up facility for
                  most pin codes. For pin codes that are non- serviceable by our
                  courier partners against the reverse pick up policy, you will
                  have to self ship the product(s).
                </p>
              </div>
            )}
            {currentMenu === "Wash Care" && (
              <div>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Machine wash..
                </p>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Wash in cold water, use mild detergent.
                </p>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Dry in shade.
                </p>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Do not iron directly or scrub on print.
                </p>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Do not bleach.
                </p>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Do not tumble dry.
                </p>
                <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                  Dry on flat surface as hanging may cause measurement
                  variations.
                </p>
              </div>
            )}
          </div>
        </div>
        <ProductReviews items={toysReview} />
      </div>
      <SizeChart
        openSizeChart={openSizeChart}
        setOpenSizeChart={setOpenSizeChart}
      />
    </div>
  );
};

export default ProductDetails;

const ToyDetailRow = ({ label, value }) => {
  return (
    <div className="flex gap-2 items-center">
      <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-semibold text-black">
        {label}:
      </p>
      <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
        {value}
      </p>
    </div>
  );
};

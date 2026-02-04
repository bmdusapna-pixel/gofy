import React, { useContext, useRef, useState, useEffect } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBasket,
  Tag,
  Copy,
  IndianRupee,
  Save,
  Clock,
  Truck,
  Bell,
  Star,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams, useNavigate } from "react-router-dom";
import RelatedItems from "../Components/RelatedItems";
import SizeChart from "../Components/SizeChart.jsx";
import ProductReviews from "../Components/ProductReviews.jsx";
import ExpandableParagraph from "../Components/ExpandableParagraph.jsx";
import useScrollToSection from "../hooks/useScrollToSection.jsx";
import ShareCopyButton from "../Components/ShareCopyButton.jsx";
import TrustIndicators from "../Components/TrustIndicators.jsx";
import ColorFilter from "../Components/ColorFilter.jsx";
import ImageGallery from "../Components/ImageGallery.jsx";
import api from "../api/axios.js";
// const coupon_data = [
//   {
//     _id: 1,
//     description: "Flat 10% Off on Orders Above ₹1999/-",
//     code: "FLAT10",
//   },
//   {
//     _id: 2,
//     description: "Flat 15% Off on Orders Above ₹2999/-",
//     code: "FLAT15",
//   },
//   {
//     _id: 3,
//     description: "Flat 20% Off on Orders Above ₹4599/-",
//     code: "FLAT20",
//   },
// ];

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
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [productData, setProductData] = useState(null);
  const [variant, setVariant] = useState(null);
  const [ages, setAges] = useState([]);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [sizechart, setsizechart] = useState(null);
  const [couponData, setCouponData] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${baseUrl}/products/${url}`);
        const result = await response.json();
        console.log("result", result.data);
        setProductData(result.data);

        if (result.data.variants && result.data.variants.length > 0) {
          const firstVariant = result.data.variants[0];
          setVariant(firstVariant);
          if (firstVariant.ageGroups && firstVariant.ageGroups.length > 0) {
            // Select first available age group (with stock > 0) or fallback to first one
            const availableAgeGroup = firstVariant.ageGroups.find(ag => ag.stock > 0) || firstVariant.ageGroups[0];
            setSelectedAgeGroup(availableAgeGroup);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    const fetchAges = async () => {
      try {
        const response = await fetch(`${baseUrl}/ages`);
        const result = await response.json();
        setAges(result);
      } catch (error) {
        console.error("Error fetching age groups:", error);
      }
    };
    fetchAges();
    fetchProduct();
  }, [baseUrl, url]);

  useEffect(() => {
    if (!selectedAgeGroup?.price) return;

    const fetchApplicableCoupons = async () => {
      try {
        const res = await api.post(
          "user/coupons/applicable",
          { totalPrice: selectedAgeGroup.price }
        );
        console.log(res.data.applicableCoupons)
        setCouponData(res.data.applicableCoupons); // or res.data
      } catch (error) {
        console.log(error);
      }
    };

    fetchApplicableCoupons();
  }, [selectedAgeGroup]);


  useEffect(() => {
    // Reset quantity when variant or ageGroup changes
    if (selectedAgeGroup) {
      const availableStock = selectedAgeGroup.stock ?? 0;
      setQuantity((prev) => Math.min(prev, Math.max(1, availableStock)));
    }
  }, [selectedAgeGroup]);
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
  const [pinSelected, setPinSelected] = useState(false);
  const { addingProductToCart, addFavouriteItems, saveForLater } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentMenu, setCurrentMenu] = useState("Product Description");
  const [quantity, setQuantity] = useState(1);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert(`Failed to copy "${code}". Please copy manually.`);
    }
  };

  const addProductToCart = () => {
    console.log("i am called")
    // Check if product is out of stock
    if (selectedAgeGroup.stock === 0) {
      handleSaveForLater();
      return;
    }

    // Ensure quantity doesn't exceed available stock
    const availableStock = selectedAgeGroup.stock ?? 0;
    const finalQuantity = Math.min(quantity, availableStock);

    if (finalQuantity <= 0) {
      alert(`Only ${availableStock} items available in stock.`);
      return;
    }

    const cartProduct = {
      _id: productData._id,
      name: productData.name,
      price: selectedAgeGroup.price,
      cutPrice: selectedAgeGroup.cutPrice,
      discount: selectedAgeGroup.discount,
      stock: selectedAgeGroup.stock,
      product_type: productData.brand || "",
      images: variant.images || [],
      colorId: variant.color?._id || variant.color,
      ageGroupId: selectedAgeGroup.ageGroup?._id || selectedAgeGroup.ageGroup,
    };
    console.log("cartproduct", cartProduct)
    if (productData && variant && selectedAgeGroup) {
      console.log(productData);
      console.log(variant);
      console.log(selectedAgeGroup)
      addingProductToCart(cartProduct, finalQuantity);
    }
  };

  const handleSaveForLater = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Store the product info in localStorage to save after login
      localStorage.setItem("pendingSaveForLater", JSON.stringify({
        productId: productData._id,
        name: productData.name,
        price: selectedAgeGroup.price,
        images: variant.images,
        colorId: variant.color._id,
        ageGroupId: selectedAgeGroup.ageGroup._id,
        quantity: quantity,
      }));
      // Redirect to login page
      navigate("/sign-in", { state: { from: "saveForLater" } });
      return;
    }

    // User is authenticated, save to wishlist
    const wishProduct = {
      _id: productData._id,
      name: productData.name,
      price: selectedAgeGroup.price,
      cutPrice: selectedAgeGroup.cutPrice,
      discount: selectedAgeGroup.discount,
      product_type: productData.brand || "",
      images: variant.images || [],
      colorId: variant.color?._id || variant.color,
      ageGroupId: selectedAgeGroup.ageGroup?._id || selectedAgeGroup.ageGroup,
      stock: selectedAgeGroup.stock,
    };
    if (productData && variant && selectedAgeGroup) {
      addFavouriteItems(wishProduct);
      // Show success message or notification
      alert("Product saved for later!");
    }
  };

  const addProductToWishlist = () => {
    const wishProduct = {
      _id: productData._id,
      name: productData.name,
      price: selectedAgeGroup.price,
      cutPrice: selectedAgeGroup.cutPrice,
      discount: selectedAgeGroup.discount,
      product_type: productData.brand || "",
      images: variant.images || [],
      colorId: variant.color?._id || variant.color,
      ageGroupId: selectedAgeGroup.ageGroup?._id || selectedAgeGroup.ageGroup,
      stock: selectedAgeGroup.stock,
    };
    if (productData && variant && selectedAgeGroup) {
      addFavouriteItems(wishProduct);
    }
  };

  const increaseQuantity = () => {
    const availableStock = selectedAgeGroup?.stock ?? 0;
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      if (newQuantity > availableStock) {
        alert(`Only ${availableStock} items available in stock.`);
        return prev;
      }
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };



  const [openSizeChart, setOpenSizeChart] = useState(false);

  if (!productData || !variant || !selectedAgeGroup) {
    return <div>Loading...</div>;
  }

  const discountPercentage = selectedAgeGroup.discount;

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full lg:px-12 px-5 mx-auto py-10 flex flex-col gap-5">
        <div className="flex lg:flex-row flex-col gap-10 w-full">
          <div className="lg:w-1/2 w-full flex lg:flex-row flex-col-reverse gap-5 relative">
            {productData.status !== "In Stock" && (
              <p className="absolute top-5 right-5 bg-red-400 ribbon-flip pl-5 pr-2 text-white">
                Sold Out
              </p>
            )}
            {variant && variant.images && (
              <ImageGallery images={variant.images} />
            )}
          </div>
          <div className="lg:w-1/2 flex flex-col gap-5">
            <div>
              <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold">
                {productData.name}
              </p>
              {selectedAgeGroup.stock > 0 && selectedAgeGroup.stock < 5 && (
                <p
                  className="text-[14px] text-red-600 font-semibold"
                  style={{
                    animation: "blink 1s step-end infinite",
                  }}
                >
                  ⚠️ Only {selectedAgeGroup.stock} items left!
                </p>
              )}
              <div className="flex gap-1 items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${index < productData.rating
                      ? "text-yellow-500"
                      : "text-gray-300"
                      }`}
                    fill={
                      index < productData.rating ? "#f88e0f" : "transparent"
                    }
                    stroke={index < productData.rating ? "#f88e0f" : "#d1d5db"}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  ({productData.review} reviews)
                </span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-black font-semibold text-[16px] leading-[24px]">
                Share:
              </p>
              <div className="flex items-center gap-2 w-full">
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
                {productData.description}
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
                ₹{selectedAgeGroup.price}
              </p>
              <p className="text-[20px] leading-[30px] text-gray-500 line-through">
                ₹{selectedAgeGroup.cutPrice}
              </p>
              {discountPercentage > 0 && (
                <p className="text-[22px] leading-[30px] text-red-600">
                  {discountPercentage}% OFF
                </p>
              )}
            </div>
            {/* Size Selection */}
            {variant.ageGroups && variant.ageGroups.length > 0 && (
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center">
                  <p className="text-[16px] leading-[24px] text-black font-semibold">
                    Size
                  </p>
                  {productData.sizeChart &&
                    (<p
                      onClick={() => { setOpenSizeChart(true); setsizechart(productData.sizeChart) }}
                      className="text-[14px] leading-[21px] text-[#dc3545] transition-colors duration-300 hover:text-[#00bbae] hover:font-semibold cursor-pointer font-medium"
                    >
                      SIZE CHART
                    </p>)
                  }

                </div>
                <div className="w-full grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {variant.ageGroups.map((age) => {
                    const isSelected =
                      selectedAgeGroup?.ageGroup?._id === age.ageGroup._id;
                    const isOutOfStock = age.stock === 0;
                    const isLowStock = age.stock > 0 && age.stock < 5;
                    const isAvailable = age.stock > 0;

                    return (
                      <div
                        key={age.ageGroup._id}
                        className="flex flex-col gap-1"
                      >
                        <button
                          disabled={isOutOfStock}
                          onClick={() => {
                            if (isAvailable) {
                              setSelectedAgeGroup(age);
                            }
                          }}
                          className={`relative py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200 ${isOutOfStock
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-300 opacity-60"
                            : isSelected
                              ? "bg-black text-white border-2 border-black"
                              : "bg-white text-black border border-gray-300 hover:border-black hover:bg-gray-50"
                            }`}
                          style={
                            isOutOfStock
                              ? {
                                backgroundImage:
                                  "linear-gradient(to bottom right, transparent calc(50% - 1px), #9ca3af calc(50% - 1px), #9ca3af calc(50% + 1px), transparent calc(50% + 1px))",
                                backgroundSize: "100% 100%",
                              }
                              : {}
                          }
                        >
                          <span className="text-[13px] leading-[18px] font-semibold">
                            {age.ageGroup.ageRange}
                          </span>
                        </button>
                        {/* Stock Indicator */}
                        {isOutOfStock ? (
                          <p className="text-[10px] text-gray-400 text-center">
                            Out of Stock
                          </p>
                        ) : isLowStock ? (
                          <p
                            className="text-[10px] text-red-600 text-center font-semibold"
                            style={{
                              animation: "blink 1s step-end infinite",
                            }}
                          >
                            ⚠️ Only {age.stock} left!
                          </p>
                        ) : (
                          <p className="text-[10px] text-gray-500 text-center">
                            {age.stock} in stock
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {productData.variants && productData.variants.length > 1 && (
              <div className="flex flex-col gap-3 w-full">
                <p className="text-[16px] leading-[24px] text-black font-semibold">
                  Color
                </p>
                <ColorFilter
                  selectedColor={variant.color}
                  setVariant={setVariant}
                  variants={productData.variants}
                  setSelectedAgeGroup={setSelectedAgeGroup}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-5 items-center">
              <div className="flex w-28 h-12 rounded-2xl border border-gray-200 overflow-hidden">
                <div className="flex flex-col items-center justify-between bg-white w-1/2 border-r border-gray-200">
                  <div
                    onClick={increaseQuantity}
                    className={`flex justify-center items-center w-5 h-5 ${quantity >= (selectedAgeGroup?.stock ?? 0)
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                      }`}
                    title={
                      quantity >= (selectedAgeGroup?.stock ?? 0)
                        ? `Only ${selectedAgeGroup?.stock ?? 0} items available in stock`
                        : "Increase quantity"
                    }
                  >
                    <Plus
                      className={`w-4 h-4 ${quantity >= (selectedAgeGroup?.stock ?? 0)
                        ? "text-gray-400"
                        : "text-black"
                        }`}
                    />
                  </div>
                  <div className="w-full bg-gray-200 h-[0.5px]"></div>
                  <div
                    onClick={decreaseQuantity}
                    className="flex justify-center items-center cursor-pointer w-5 h-5"
                  >
                    <Minus
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
                onClick={selectedAgeGroup.stock === 0 ? handleSaveForLater : addProductToCart}
                className="py-2 w-45 rounded-2xl transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 bg-[#00bbae] flex gap-3 items-center justify-center"
              >
                {selectedAgeGroup.stock > 0 ? (
                  <ShoppingBasket className="w-6 h-6 text-white" />
                ) : (
                  <Save className="w-6 h-6 text-white" />
                )}
                <p className="text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] font-semibold text-white">
                  {selectedAgeGroup.stock === 0
                    ? "Save for later"
                    : "Add to cart"}
                </p>
              </div>
              <div
                onClick={() => navigate("/checkout")}
                className="py-2 w-40 rounded-2xl transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 bg-[#00bbae] flex gap-3 items-center justify-center">
                {selectedAgeGroup.stock > 0 ? (
                  <IndianRupee className="w-6 h-6 text-white" />
                ) : (
                  <Bell className="w-6 h-6 text-white" />
                )}
                <p className="text-[18px] leading-[27px] md:text-[20px] md:leading-[30px] font-semibold text-white">
                  {selectedAgeGroup.stock === 0 ? "Notify Me" : "Buy Now"}
                </p>
              </div>
              <div
                onClick={addProductToWishlist}
                className="cursor-pointer w-12 h-12 border border-gray-200 flex items-center justify-center rounded-2xl bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
              >
                <Heart className="w-5 h-5" />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-4 py-3 ">
              <p className="text-xl font-bold text-gray-800 border-b pb-3">
                Offers Available
              </p>

              <div className="flex flex-col gap-3 md:max-w-[500px]">
                {couponData && couponData.length > 0 ? (
                  couponData.map((coupon) => (
                    <div
                      key={coupon._id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between
          gap-3 px-4 py-3 rounded-xl border border-gray-100
          bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                    >
                      {/* Left content */}
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Tag className="w-5 h-5 text-green-600" />
                          <p className="text-sm font-semibold text-gray-800">
                            {coupon.title}
                          </p>
                        </div>

                        <p className="text-sm text-gray-600">
                          Save up to{" "}
                          <span className="font-semibold text-green-700">
                            ₹{coupon.effectiveDiscount}
                          </span>{" "}
                          on orders above{" "}
                          <span className="font-semibold">
                            ₹{coupon.minOrderValue}
                          </span>
                        </p>
                      </div>

                      {/* Coupon code */}
                      <button
                        onClick={() => handleCopy(coupon.code)}
                        className="group relative flex items-center justify-center gap-2
            px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold
            rounded-full hover:bg-blue-100 active:scale-95
            transition-all min-w-[120px]"
                      >
                        <span
                          className={`transition-opacity duration-200 ${copiedCode === coupon.code
                              ? "opacity-0 absolute"
                              : "opacity-100"
                            }`}
                        >
                          {coupon.code}
                        </span>

                        <span
                          className={`absolute flex items-center gap-1 transition-opacity duration-200 ${copiedCode === coupon.code
                              ? "opacity-100"
                              : "opacity-0"
                            }`}
                        >
                          Copied <Copy className="w-4 h-4" />
                        </span>

                        {copiedCode !== coupon.code && (
                          <Copy className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 py-3">
                    No offers available for this product.
                  </p>
                )}
              </div>
            </div>


            <div className="flex gap-10 items-center">
              <div className="flex flex-col gap-1 items-start">
                <div className="flex gap-1 items-center">
                  <Clock className="w-4 h-4 text-black" />
                  <p
                    className={`${pinSelected ? "text-[14px]" : "text-[18px]"
                      } leading-[21px] font-medium`}
                  >
                    Expected delivery time :
                  </p>
                </div>
                {pinSelected && (
                  <p className="text-[16px] leading-[24px] font-semibold">
                    Monday 28 July - Tuesday 29 July.
                  </p>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="transition-colors bg-white text-[18px] leading-[27px] duration-300 w-28 px-2 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  placeholder="PIN Code"
                />
                <button
                  className="rounded-md py-1.5 px-2 text-[16px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
                  onClick={() => setPinSelected(true)}
                >
                  Get Expected Delivery
                </button>
              </div>
            </div>
            <TrustIndicators />
          </div>
        </div>
        <div className="w-full">
          <RelatedItems />
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex gap-1 sm:gap-5 items-center border-b-[2px] border-gray-200">
            {product_details.map((item) => {
              if (item.title === "Wash Care" && productData.washCare[0] === "")
                return;
              return (
                <div
                  onClick={() => setCurrentMenu(item.title)}
                  className={`cursor-pointer px-2 sm:px-4 py-2 transition-colors duration-300 ${currentMenu === item.title
                    ? "bg-[#00bbae] text-white font-semibold"
                    : "bg-gray-200 text-black hover:bg-[#00bbae] hover:text-white font-medium"
                    }`}
                  key={item._id}
                >
                  <p className="md:text-[18px] md:leading-[27px] text-[16px] leading-[24px]">
                    {item.title}
                  </p>
                </div>
              );
            })}
            {productData?.keyFeatures.map((item) => (
              <div
                onClick={() => setCurrentMenu(item.key)}
                className={`cursor-pointer px-2 sm:px-4 py-2 transition-colors duration-300 ${currentMenu === item.key
                  ? "bg-[#00bbae] text-white font-semibold"
                  : "bg-gray-200 text-black hover:bg-[#00bbae] hover:text-white font-medium"
                  }`}
                key={item._id}
              >
                <p className="md:text-[18px] md:leading-[27px] text-[16px] leading-[24px]">
                  {item.key}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full border border-gray-200 rounded-2xl p-6 bg-white">
            {productData.keyFeatures.some((f) => f.key === currentMenu) && (
              <ul>
                {productData.keyFeatures
                  .find((f) => f.key === currentMenu)
                  .value.split(",")
                  .map((v) => (
                    <li>{v}</li>
                  ))}
              </ul>
            )}
            {currentMenu === "Product Description" && (
              <ExpandableParagraph
                ref={refDis}
                text={productData.description}
              />
            )}
            {currentMenu === "Product Specification" && (
              <div className="space-y-3 w-full">
                {variant?.specifications?.map((spec, index) => {
                  const [label, value] = Object.entries(spec)[0];
                  return (
                    <div key={index} className="flex gap-4">
                      <span className="font-semibold">{label}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  );
                })}

                {productData?.specifications?.map((spec) => (
                  <div key={spec._id} className="flex gap-4">
                    <span className="font-semibold">{spec.key}:</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
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
                {productData.shippingPolicy && (
                  <p className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black">
                    {productData.shippingPolicy}
                  </p>
                )}
              </div>
            )}
            {currentMenu === "Wash Care" && (
              <div>
                {productData.washCare.map((care, index) => (
                  <p
                    key={index}
                    className="sm:text-[16px] sm:leading-[24px] text-[14px] leading-[21px] font-medium text-black"
                  >
                    {care}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <ProductReviews
          items={{
            id: productData._id,
            name: productData.name,
            review: productData.review,
          }}
        />
      </div>
      <SizeChart
        openSizeChart={openSizeChart}
        setOpenSizeChart={setOpenSizeChart}
        sizechart={sizechart}
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

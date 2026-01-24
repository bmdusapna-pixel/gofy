import React, { useContext, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Star,
  Save,
  Bell,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext.jsx";
import { AuthContext } from "../Context/AuthContext.jsx";
import { Countdown } from "./AnimatedDropdown.jsx";

const ProductsCollection = ({ color }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const { addToCart, addFavouriteItems, saveForLater } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [products, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseUrl}/products`);
        const result = await response.json();
        console.log(result)
        setProductList(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [baseUrl]);

  const addProductToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product?.variants?.[0]?.ageGroups?.[0]?.price,
      images: product?.variants?.[0]?.images,
      colorId: product?.variants?.[0].color._id,
      ageGroupId: product?.variants[0]?.ageGroups[0]?.ageGroup._id,
    };
    addToCart(cartProduct);
  };

  const handleSaveForLater = async (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Store product info and redirect to login
      const productsave = {
        _id: product._id,
        name: product.name,
        price: product?.variants?.[0]?.ageGroups?.[0]?.price,
        images: product?.variants?.[0]?.images,
        colorId: product?.variants?.[0].color._id,
        ageGroupId: product?.variants[0]?.ageGroups[0]?.ageGroup._id,
      };
      localStorage.setItem("pendingSaveForLater", JSON.stringify({
        productId: product._id,
        name: product.name,
        price: productsave.price,
        images: productsave.images,
        colorId: productsave.colorId,
        ageGroupId: productsave.ageGroupId,
      }));
      navigate("/sign-in", { state: { from: "saveForLater" } });
      return;
    }

    // User is authenticated, save to wishlist
    const productsave = {
      _id: product._id,
      name: product.name,
      price: product?.variants?.[0]?.ageGroups?.[0]?.price,
      images: product?.variants?.[0]?.images,
      colorId: product?.variants?.[0].color._id,
      ageGroupId: product?.variants[0]?.ageGroups[0]?.ageGroup._id,
    };
    await saveForLater(productsave);
    alert("Product saved for later!");
  };

  const handleNotifyMe = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    
    // For now, notify me also saves to wishlist (can be changed to a separate notification system later)
    handleSaveForLater(product, event);
  };

  const addFavouriteItemsWishList = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    const favProduct = {
      _id: product._id,
      name: product.name,
      price: product?.variants?.[0]?.ageGroups?.[0]?.price,
      images: product?.variants?.[0]?.images,
      colorId: product?.variants?.[0].color._id,
      ageGroupId: product?.variants[0]?.ageGroups[0]?.ageGroup._id,
    };
    addFavouriteItems(favProduct);
  };

  const getProductStockStatus = (product) => {
    return product.variants?.some(variant =>
      variant.ageGroups?.some(ag => ag.stock > 0)
    )
      ? "In Stock"
      : "Out of Stock";
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
          New Arrivals
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
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
              1536: { slidesPerView: 5, spaceBetween: 20 },
            }}
            loop={true}
            grabCursor={true}
          >
            {products.map((product) => {
              const isHovered = hoveredId === product._id;
              // Access the first variant and the first age group to get the images and pricing
              const firstVariant = product.variants[0];
              if (!firstVariant) {
                return null;
              }
              const firstAgeGroup = firstVariant.ageGroups[0];
              if (!firstAgeGroup) {
                return null;
              }

              const stockStatus = getProductStockStatus(product);


              const images = firstVariant.images;
              const price = firstAgeGroup.price;
              const cutPrice = firstAgeGroup.cutPrice;
              const discount = firstAgeGroup.discount;

              return (
                <SwiperSlide key={product._id}>
                  <Link
                    to={`/product-details/${product.url}`}
                    className="bg-white rounded-md p-3 flex flex-col w-full cursor-pointer relative"
                    onMouseEnter={() => setHoveredId(product._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="flex relative">
                      {stockStatus === "Out of Stock" && (
                        <p className="absolute top-0 -left-3 bg-red-400 ribbon pl-2 pr-5 text-white z-[3]">
                          Sold Out
                        </p>
                      )}
                      <div className="w-full h-72 sm:h-[280px] flex items-center justify-center">
                        {images.length > 0 && (
                          <>
                            <img
                              src={images[0]}
                              alt={product.name}
                              className={`absolute top-0 left-0 w-72 h-full ease-in-out ${isHovered
                                  ? "opacity-0 scale-105 duration-300"
                                  : "opacity-100 scale-100 duration-100"
                                }`}
                              draggable={false}
                            />
                            {images.length > 1 && (
                              <img
                                src={images[1]}
                                alt={product.name + " hover"}
                                className={`absolute top-0 left-0 w-72 h-full ease-in-out ${isHovered
                                    ? "opacity-100 scale-100 duration-300"
                                    : "opacity-0 scale-95 duration-100"
                                  }`}
                                draggable={false}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    {hoveredId === product._id && (
                      <div
                        className={`absolute right-4 top-4 transform transition-all duration-300 z-20 ${isHovered
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
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col gap-2 px-2">
                      <p className="text-[20px] leading-[30px] font-semibold text-[#212529] mt-4 whitespace-nowrap overflow-hidden text-ellipsis">
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
                        {Array.from({
                          length: 5 - Math.floor(product.rating),
                        }).map((_, index) => (
                          <Star
                            key={index}
                            className="w-4 h-4 text-yellow-500"
                            fill="#f8f9fa"
                          />
                        ))}
                      </div>
                      <div className="flex gap-2 items-center">
                        <p className="text-[24px] leading-[27px] font-semibold text-pink-600">
                          ₹{price}
                        </p>
                        {cutPrice && (
                          <p className="text-[14px] leading-[24px] line-through font-semibold text-gray-500">
                            ₹{cutPrice}
                          </p>
                        )}
                        {discount > 0 && (
                          <p className="text-[16px] leading-[24px] font-semibold text-red-600">
                            {discount}% OFF
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={(event) =>
                            stockStatus === "Out of Stock"
                              ? handleSaveForLater(product, event)
                              : addProductToCart(product, event)
                          }
                          className="text-[14px] leading-[24px] px-2 w-1/2 font-semibold cursor-pointer py-2 rounded-md hover:bg-[#00bbae] bg-[#e9ecef] hover:text-white transition duration-300 flex items-center justify-center gap-1"
                        >
                          {stockStatus === "Out of Stock" ? (
                            <>
                              <Save className="w-4 h-4" />
                              Save for later
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-4 h-4" />
                              Add To Cart
                            </>
                          )}
                        </button>
                        <button
                          onClick={(event) =>
                            stockStatus === "Out of Stock"
                              ? handleNotifyMe(product, event)
                              : null
                          }
                          className="text-[14px] leading-[24px] px-2 w-1/2 font-semibold cursor-pointer py-2 rounded-md bg-[#00bbae] text-white hover:text-black hover:bg-[#e9ecef] transition duration-300 flex items-center justify-center gap-1"
                        >
                          {stockStatus === "Out of Stock" ? (
                            <>
                              <Bell className="w-4 h-4" />
                              Notify Me
                            </>
                          ) : (
                            "Buy Now"
                          )}
                        </button>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <ChevronLeft
            className="swiper-button-prev-pc absolute -left-5 top-60 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer opacity-25 hover:opacity-100"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          />
          <ChevronRight
            className="swiper-button-next-pc absolute -right-5 top-60 p-1 w-10 h-10 transform -translate-y-1/2 z-10 bg-[#e9f9fc] text-black rounded-full hover:bg-[#f8f9fa] cursor-pointer opacity-25 hover:opacity-100"
            style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          />
        </div>
        <Link
          to="/products"
          className="flex justify-center items-center w-full ml-0 sm:ml-4"
        >
          <p
            className="
              mt-5
              rounded-full
              py-1
              px-8
              font-semibold
              text-[16px]
              leading-[24px]
              transition-all
              duration-300
              cursor-pointer
              flex items-center justify-center
              shadow-lg
              shadow-amber-500/30
              bg-[#f39924]
              hover:scale-105
              text-white
              hover:text-white
              transform
              backdrop-blur-sm
            "
          >
            VIEW ALL
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ProductsCollection;

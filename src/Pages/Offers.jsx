import React, { useContext, useState, useEffect } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import SuperBanner from "../assets/Deal.jpg";

const baseUrl = import.meta.env.VITE_BASE_URL;

const SuperDeals = () => {
  const [products, setProducts] = useState([]);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products`);
        const result = await res.json();
        if (result.data) {
          setProducts(
            result.data.filter((p) => p.promotions.includes("offers"))
          );
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const addProductToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product?.variants?.[0]?.ageGroups?.[0]?.price,
      images: product?.variants?.[0]?.images,
    };
    addToCart(cartProduct);
  };

  const addFavouriteItemsWishList = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    const favProduct = {
      _id: product._id,
      name: product.name,
      price: product?.variants?.[0]?.ageGroups?.[0]?.price,
      images: product?.variants?.[0]?.images,
    };
    addFavouriteItems(favProduct);
  };

  const renderProductCard = (product, index) => {
    // safely grab variant info (fallback to first one)
    const firstVariant = product.variants?.[0];
    const firstAgeGroup = firstVariant?.ageGroups?.[0];

    const price = firstAgeGroup?.price || 0;
    const cutPrice = firstAgeGroup?.cutPrice || 0;
    const discount =
      firstAgeGroup?.discount && firstAgeGroup.discount > 0
        ? firstAgeGroup.discount
        : cutPrice > 0
        ? Math.round(((cutPrice - price) / cutPrice) * 100)
        : 0;

    return (
      <Link
        to={`/products/${product.url}`}
        key={product._id || index}
        onMouseEnter={() => setProductHoverd(product._id)}
        onMouseLeave={() => setProductHoverd(null)}
        className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group"
      >
        {/* Product Image + Discount Ribbon */}
        <div className="w-full bg-[#f9f9f9] rounded-md relative h-52">
          {discount > 0 && (
            <div
              className="absolute -top-3 -right-3 ribbon-flip pl-5 pr-3 
              bg-gradient-to-br from-red-400 to-red-700 
              text-white font-bold text-sm 
              shadow-lg border border-red-800 z-[3]"
            >
              <div style={{ animation: "blink 0.5s step-end infinite" }}>
                {discount}% OFF
              </div>
            </div>
          )}
          <img
            src={product?.variants?.[0]?.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {productHovered === product._id && (
            <div className="absolute inset-0 bg-black/10 z-10 rounded-md"></div>
          )}
          {productHovered === product._id && (
            <div className="absolute sm:block hidden bottom-3 left-1/2 -translate-x-1/2 transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20">
              <div className="flex gap-2 items-center">
                <div
                  onClick={(event) => addFavouriteItemsWishList(product, event)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
                >
                  <Heart className="w-5 h-4" />
                </div>
                <div
                  onClick={(event) => addProductToCart(product, event)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
                >
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-2 w-full px-2">
          {/* Rating Stars */}
          <div className="flex gap-2 items-center">
            <div className="flex items-center">
              {Array.from({ length: Math.floor(product.rating || 0) }).map(
                (_, i) => (
                  <Star
                    key={`filled-${i}`}
                    className="w-3 h-3 text-yellow-500"
                    fill="#f88e0f"
                  />
                )
              )}
              {Array.from({ length: 5 - Math.floor(product.rating || 0) }).map(
                (_, i) => (
                  <Star
                    key={`empty-${i}`}
                    className="w-3 h-3 text-yellow-500"
                    fill="white"
                  />
                )
              )}
            </div>
          </div>

          {/* Name + Price */}
          <div className="flex sm:flex-col flex-row justify-between w-full gap-2">
            <p className="text-black text-[20px] leading-[30px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
              {product.name}
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-pink-600 text-[20px] leading-[30px] font-semibold">
                ₹ {price}
              </p>
              {cutPrice > 0 && (
                <p className="text-gray-500 text-[14px] leading-[30px] line-through font-semibold">
                  ₹ {cutPrice}
                </p>
              )}
              {discount > 0 && (
                <span className="text-green-600 text-[14px] font-semibold">
                  {discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons (mobile) */}
          <div className="flex sm:hidden gap-2 items-center">
            <div
              onClick={(event) => addFavouriteItemsWishList(product, event)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#00bbae] text-white"
            >
              <Heart className="w-4 h-4" />
            </div>
            <div
              onClick={(event) => addProductToCart(product, event)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#00bbae] text-white"
            >
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full h-[350px]">
        <img
          src={SuperBanner}
          alt="super banner"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-full lg:px-12 px-5 mx-auto py-10">
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
          {products.map(renderProductCard)}
        </div>
      </div>
    </div>
  );
};

export default SuperDeals;

import React, { useContext, useState, useEffect } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import SuperBanner from "../assets/superBanner.png";

const SuperDeals = () => {
  const { category, slug } = useParams();
  const [products, setProducts] = useState([]);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products`);
        const result = await res.json();

        if (!result?.data || !Array.isArray(result.data)) {
          console.error("API response is not an array:", result);
          return;
        }

        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category, slug]);

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
    addFavouriteItems(product);
  };

  const renderProductCard = (product) => (
    <Link
      to={`/products/details/${product.url}`}
      key={product._id}
      onMouseEnter={() => setProductHoverd(product._id)}
      onMouseLeave={() => setProductHoverd(null)}
      className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group"
    >
      {/* Product Image */}
      <div className="w-full bg-[#f9f9f9] rounded-md relative h-52">
        <img
          src={product.variants?.[0].images?.[0] || "/placeholder.png"}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {productHovered === product._id && (
          <>
            <div className="absolute inset-0 bg-black/10 z-10 rounded-md"></div>
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
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 w-full px-2">
        {/* Rating */}
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            {Array.from({ length: Math.floor(product.rating || 0) }).map(
              (_, i) => (
                <Star
                  key={`filled-${product._id}-${i}`}
                  className="w-3 h-3 text-yellow-500"
                  fill="#f88e0f"
                />
              )
            )}
            {Array.from({
              length: 5 - Math.floor(product.rating || 0),
            }).map((_, i) => (
              <Star
                key={`empty-${product._id}-${i}`}
                className="w-3 h-3 text-yellow-500"
                fill="white"
              />
            ))}
          </div>
        </div>

        {/* Name + Price */}
        <div className="flex sm:flex-col flex-row justify-between w-full gap-2">
          <p className="text-black text-[20px] leading-[30px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
            {product.name}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-pink-600 text-[20px] leading-[30px] font-semibold">
              ₹ {product.variants?.[0]?.ageGroups?.[0]?.price || "—"}
            </p>
            <p className="text-gray-500 text-[14px] leading-[30px] line-through font-semibold">
              ₹ {product.variants?.[0]?.ageGroups?.[0]?.cutPrice || "—"}
            </p>
            <p className="text-red-600 text-[18px] leading-[30px] font-semibold">
              {product.variants?.[0]?.ageGroups?.[0]?.discount || "—"}% OFF
            </p>
          </div>
        </div>

        {/* Mobile Wishlist/Cart */}
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
        {/* Toys Section (just heading + all products) */}
        <h2 className="text-2xl font-bold mb-5">Toys</h2>
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {products.map(renderProductCard)}
        </div>

        {/* Clothes Section (just heading + all products again) */}
        <h2 className="text-2xl font-bold mb-5">Clothes</h2>
        <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
          {products.map(renderProductCard)}
        </div>
      </div>
    </div>
  );
};

export default SuperDeals;

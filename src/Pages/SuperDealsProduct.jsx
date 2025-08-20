import React, { useContext, useState, useEffect } from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import {
  clothe_items,
  slugToAgeGroup,
  toys_items,
  unslugify,
} from "../assets/helper";
import SuperBanner from "../assets/superBanner.png";

const SuperDeals = () => {
  const { category, slug } = useParams();
  const [toysList, setToysList] = useState([]);
  const [clothesList, setClothesList] = useState([]);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);

  useEffect(() => {
    let filteredClothes = [];
    let filteredToys = [];

    if (category === "age" && slugToAgeGroup[slug]) {
      const ageGroup = slugToAgeGroup[slug];
      filteredClothes = clothe_items
        .filter((item) => item.age_group === ageGroup)
        .map((item) => ({ ...item, category: "clothes" }));
      filteredToys = toys_items
        .filter((item) => item.age_group === ageGroup)
        .map((item) => ({ ...item, category: "toys" }));
    } else if (!category && !slug) {
      filteredClothes = clothe_items.map((item) => ({
        ...item,
        category: "clothes",
      }));
      filteredToys = toys_items.map((item) => ({
        ...item,
        category: "toys",
      }));
    } else if (category === "toys") {
      filteredToys = slug
        ? toys_items.filter((item) => unslugify(slug) === item.sub_category)
        : toys_items.map((item) => ({ ...item, category: "toys" }));
    } else if (category === "clothes") {
      filteredClothes = slug
        ? clothe_items.filter((item) => unslugify(slug) === item.sub_category)
        : clothe_items.map((item) => ({ ...item, category: "clothes" }));
    }

    setToysList(filteredToys.slice(0, 5)); // Only first 5 toys
    setClothesList(filteredClothes.slice(0, 5)); // Only first 5 clothes
  }, [category, slug]);

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

  const renderProductCard = (product, index) => (
    <Link
      to={
        product.category === "clothes"
          ? `/products/clothes/${product.url}`
          : `/products/toys/${product.url}`
      }
      key={index}
      onMouseEnter={() => setProductHoverd(product._id)}
      onMouseLeave={() => setProductHoverd(null)}
      className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group"
    >
      <div className="w-full bg-[#f9f9f9] rounded-md relative h-52">
        <img
          src={product.images[0]}
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
      <div className="flex flex-col gap-2 w-full px-2">
        <div className="flex gap-2 items-center">
          <div className="flex items-center">
            {Array.from({ length: Math.floor(product.rating) }).map((_, i) => (
              <Star
                key={`filled-${i}`}
                className="w-3 h-3 text-yellow-500"
                fill="#f88e0f"
              />
            ))}
            {Array.from({ length: 5 - Math.floor(product.rating) }).map(
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
        <div className="flex sm:flex-col flex-row justify-between w-full gap-2">
          <p className="text-black text-[20px] leading-[30px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
            {product.name}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-pink-600 text-[20px] leading-[30px] font-semibold">
              ₹ {product.price}
            </p>
            <p className="text-gray-500 text-[14px] leading-[30px] line-through font-semibold">
              ₹ {product.price + 100}
            </p>
            <p className="text-red-600 text-[18px] leading-[30px] font-semibold">
              30% OFF
            </p>
          </div>
        </div>
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
        {/* Toys Section */}
        {toysList.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-5">Toys</h2>
            <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {toysList.map(renderProductCard)}
            </div>
          </>
        )}

        {/* Clothes Section */}
        {clothesList.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-5">Clothes</h2>
            <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
              {clothesList.map(renderProductCard)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuperDeals;

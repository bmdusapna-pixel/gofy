import React, { useContext, useState, useEffect } from "react";
import {
  ChevronDown,
  Heart,
  Menu,
  MoveRight,
  Star,
  ShoppingBag,
  X,
} from "lucide-react";
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
  const [productItems, setProductItems] = useState([]);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);

  useEffect(() => {
    let items = [];
    if (category === "age" && slugToAgeGroup[slug]) {
      const ageGroup = slugToAgeGroup[slug];
      const filteredClothes = clothe_items
        .filter((item) => item.age_group === ageGroup)
        .map((item) => ({ ...item, category: "clothes" }));
      const filteredToys = toys_items
        .filter((item) => item.age_group === ageGroup)
        .map((item) => ({ ...item, category: "toys" }));
      items = [...filteredClothes, ...filteredToys];
      setProductItems(items);
    } else if (!category && !slug) {
      setProductItems([...clothe_items, ...toys_items]);
    } else if (category === "toys") {
      if (slug) {
        items = toys_items.filter(
          (item) => unslugify(slug) === item.sub_category
        );
        setProductItems(items);
      } else {
        items = toys_items.map((item) => ({ ...item, category: "toys" }));
        console.log(items);
        setProductItems(items);
      }
    } else if (category === "clothes") {
      if (slug) {
        items = clothe_items.filter(
          (item) => unslugify(slug) === item.sub_category
        );
        setProductItems(items);
      } else {
        items = clothe_items.map((item) => ({ ...item, category: "clothes" }));
        setProductItems(items);
      }
    }
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
        <div className="flex gap-5 w-full">
          <div className="w-full flex flex-col gap-5">
            <div className="flex justify-between w-full items-center bg-white rounded-xl p-4">
              <p className="text-[#69778a] text-[18px] leading-[24px] font-semibold lg:block hidden">
                Showing all {productItems.length} result
                {productItems.length !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-5 items-center">
                <select
                  className="border border-[#69778a] rounded-md p-2 text-[#69778a] text-[16px] leading-[24px] font-semibold appearance-none bg-white cursor-pointer"
                  defaultValue=""
                >
                  <option value="">Filter</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            <div className="w-full grid lg:grid-cols-5 md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
              {productItems?.map((product, index) => (
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
                            onClick={(event) =>
                              addFavouriteItemsWishList(product, event)
                            }
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
                          >
                            <Heart className="w-5 h-4" />
                          </div>
                          <div
                            onClick={(event) =>
                              addProductToCart(product, event)
                            }
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
                        {Array.from({
                          length: Math.floor(product.rating),
                        }).map(() => (
                          <Star
                            className="w-3 h-3 text-yellow-500"
                            fill="#f88e0f"
                          />
                        ))}
                        {Array.from({
                          length: 5 - Math.floor(product.rating),
                        }).map(() => (
                          <Star
                            className="w-3 h-3 text-yellow-500"
                            fill="white"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex sm:flex-col flex-row justify-between w-full gap-2">
                      <p className="text-black text-[20px] leading-[30px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
                        {product.name}
                      </p>
                      <div className="flex gap-2 items-center">
                        <p className="text-[#00bbae] text-[20px] leading-[30px] font-semibold">
                          ₹ {product.price}
                        </p>
                        <p className="text-gray-700 text-[14px] leading-[30px] line-through font-semibold">
                          ₹ {product.price + 100}
                        </p>
                        <p className="text-yellow-500 text-[18px] leading-[30px] line-through font-semibold">
                          30% OFF
                        </p>
                      </div>
                    </div>
                    <div className="flex sm:hidden gap-2 items-center">
                      <div
                        onClick={(event) =>
                          addFavouriteItemsWishList(product, event)
                        }
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperDeals;

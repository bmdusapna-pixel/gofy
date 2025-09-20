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
import FilterActiveComponent from "../Components/FilterActiveComponent.jsx";
const baseUrl = import.meta.env.VITE_BASE_URL;

const product_categories = [
  { _id: 1, sub_category: "Dolls" },
  { _id: 2, sub_category: "Educational Toy" },
  { _id: 3, sub_category: "Games and puzzle" },
  { _id: 4, sub_category: "Indoor Play" },
  { _id: 5, sub_category: "Kids Books" },
  { _id: 6, sub_category: "Outdoor Toy" },
  { _id: 7, sub_category: "Rockers & Rides" },
  { _id: 8, sub_category: "Toy Figures" },
  { _id: 9, sub_category: "Uncategorized" },
  { _id: 10, sub_category: "Vehicles Toys" },
];

const Products = () => {
  const { category, slug } = useParams();
  const [productItems, setProductItems] = useState([]);
  const [hoveredProductCategory, setHoveredProductCategory] = useState(null);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);
  const [openFilter, setOpenFilter] = useState(false);

  // 🔥 Fetch from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products`);
        const data = await res.json();

        if (data?.data) {
          let items = data.data.filter((p) =>
            p.promotions.includes("new_arrival")
          );

          setProductItems(items);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
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
    const favProduct = {
      _id: product._id,
      name: product.name,
      price: product?.variants?.[0]?.ageGroups?.[0]?.price,
      images: product?.variants?.[0]?.images,
    };
    addFavouriteItems(favProduct);
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full lg:px-12 px-5 mx-auto py-10">
        <div className="flex gap-5 w-full">
          {/* Sidebar */}
          <div className="lg:w-1/5 lg:flex hidden flex-col gap-5">
            <FilterActiveComponent
              items={product_categories}
              headingTitle="Category"
              hoveredItem={hoveredProductCategory}
              setHoveredItem={setHoveredProductCategory}
              selectedItem={""}
              setSelectedItem={""}
            />
            <div className="border-gray-200 border bg-white rounded-xl p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">
                  Products
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {productItems.slice(0, 5).map((product) => (
                  <div
                    className="flex gap-5 w-full items-center cursor-pointer"
                    key={product._id}
                  >
                    <div className="w-40 bg-[#f9f9f9] rounded-md">
                      <img
                        src={product?.variants?.[0]?.images[0]}
                        alt={product.name}
                        className="w-20 object-cover"
                      />
                    </div>
                    <div className="w-full flex flex-col">
                      <p className="text-sm text-gray-500">
                        {product.product_type}
                      </p>
                      <p className="text-black text-[16px] leading-[24px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
                        {product.name}
                      </p>
                      <p className="text-pink-600 text-[16px] leading-[24px] font-semibold">
                        ₹ {product.variants?.[0]?.ageGroups?.[0]?.price || "—"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Drawer Mobile */}
          <div
            className={`fixed left-0 p-5 overflow-y-auto top-0 sm:w-96 w-[80%] bg-white flex flex-col gap-2 lg:hidden h-full z-50 transition-transform duration-300 ${
              openFilter ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              onClick={() => setOpenFilter(false)}
              className="w-10 cursor-pointer hover:bg-gray-100 bg-transparent lg:hidden flex items-center justify-center h-10 border border-[#69778a] p-1 rounded-md"
            >
              <X className="w-6 h-6 text-[#69778a]" />
            </div>
            <FilterActiveComponent
              items={product_categories}
              headingTitle="Category"
              hoveredItem={hoveredProductCategory}
              setHoveredItem={setHoveredProductCategory}
              selectedItem={""}
              setSelectedItem={""}
            />
          </div>

          {/* Main Product Grid */}
          <div className="lg:w-4/5 w-full flex flex-col gap-5">
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
                  <option value="best-seller">Best Seller</option>
                  <option value="newest">Newest</option>
                </select>
                <div
                  onClick={() => setOpenFilter((prev) => !prev)}
                  className="w-10 cursor-pointer hover:bg-gray-100 bg-transparent lg:hidden flex items-center justify-center h-10 border border-[#69778a] p-1 rounded-md"
                >
                  <Menu className="w-6 h-6 text-[#69778a]" />
                </div>
              </div>
            </div>

            <div className="w-full grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
              {productItems?.map((product) => (
                <Link
                  to={`/product-details/${product.url}`}
                  key={product._id}
                  onMouseEnter={() => setProductHoverd(product._id)}
                  onMouseLeave={() => setProductHoverd(null)}
                  className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group"
                >
                  <div className="w-full bg-[#f9f9f9] rounded-md relative h-52">
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
                          length: Math.floor(product.rating || 0),
                        }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 text-yellow-500"
                            fill="#f88e0f"
                          />
                        ))}
                        {Array.from({
                          length: 5 - Math.floor(product.rating || 0),
                        }).map((_, i) => (
                          <Star
                            key={i}
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
                        <p className="text-pink-600 text-[20px] leading-[30px] font-semibold">
                          ₹{" "}
                          {product.variants?.[0]?.ageGroups?.[0]?.price || "—"}
                        </p>
                        <p className="text-gray-500 text-[14px] leading-[30px] line-through font-semibold">
                          ₹{" "}
                          {product.variants?.[0]?.ageGroups?.[0]?.cutPrice ||
                            "—"}
                        </p>
                        <p className="text-red-600 text-[18px] leading-[30px] font-semibold">
                          {product.variants?.[0]?.ageGroups?.[0]?.discount ||
                            "—"}
                          % OFF
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

export default Products;

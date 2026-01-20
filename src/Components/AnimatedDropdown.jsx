import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Baby,
  BookOpenCheck,
  Puzzle,
  Home,
  Book,
  Sun,
  Bike,
  User,
  Car,
  MoveRight,
  MoveLeft,
  ChevronDown,
  Search,
  X,
} from "lucide-react";
import product_list from "../assets/product-list";
import { slugify } from "../assets/helper";
import api from "../api/axios";

// const IconComponents = {
//   Baby,
//   BookOpenCheck,
//   Puzzle,
//   Home,
//   Book,
//   Sun,
//   Bike,
//   Car,
//   User,
// };

const getCategories = async () => {
  const response = await api.get("/categories");
  console.log("response",response.data)
  return response.data.categories
};

// const categories_items = [
//   { _id: 1, title: "Dolls", icon: "Baby" },
//   { _id: 2, title: "Educational Toy", icon: "BookOpenCheck" },
//   { _id: 3, title: "Games and puzzle", icon: "Puzzle" },
//   { _id: 4, title: "Indoor Play", icon: "Home" },
//   { _id: 5, title: "Kids Books", icon: "Book" },
//   { _id: 6, title: "Outdoor Toy", icon: "Sun" },
//   { _id: 7, title: "Rockers & Rides", icon: "Bike" },
//   { _id: 8, title: "Toy Figures", icon: "User" },
//   { _id: 9, title: "Vehicles Toys", icon: "Car" },
// ];

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedDropdown = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 6, opacity: 0 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        className="absolute top-7 left-0 border border-gray-400 bg-white rounded-md z-50 flex"
      >
        {/* Left column: headings */}
        <div className="flex flex-col min-w-[250px] border-r border-gray-300">
          {items?.map((item, index) => (
            <div
              key={index}
              className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                to={item.url}
                className="text-[18px] leading-[27px] text-[#DC3545] font-bold block"
              >
                {item.label}
              </Link>

              {/* Right-hand submenu */}
              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 10, opacity: 0 }}
                    transition={{
                      type: "tween",
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="absolute top-0 left-full border border-gray-300 bg-white rounded-md shadow-lg min-w-[250px] p-3"
                  >
                    <div className="flex flex-col gap-1">
                      {item?.items?.map((product) => (
                        <Link
                          to={`${item.url}/${slugify(product.name)}`}
                          className="relative overflow-hidden group cursor-pointer px-3 py-1 rounded-md text-[#001430] hover:text-green-700 transition-colors duration-500"
                          key={product._id}
                        >
                          <p className="text-[16px] leading-[24px] font-semibold whitespace-nowrap flex items-center">
                            <span className="translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                              {product.name}
                            </span>
                            <MoveRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1" />
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const FlipUnit = ({ value }) => {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
    }
  }, [value]);

  return (
    <div className="relative h-[30px] mx-auto w-[30px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.p
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute w-full text-[#dc3545] font-semibold text-[16px] leading-[33px]"
        >
          {value.toString().padStart(2, "0")}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const Countdown = ({ hour = 40 }) => {
  const [timeLeft, setTimeLeft] = useState(hour * 3600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTimeParts = () => {
    const days = Math.floor(timeLeft / (24 * 3600));
    const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeParts();

  return (
    <div className="bg-white rounded-md flex gap-1 items-center">
      <FlipUnit value={days} />
      <span className="text-[#dc3545] font-semibold text-[18px] leading-[27px]">
        :
      </span>
      <FlipUnit value={hours} />
      <span className="text-[#dc3545] font-semibold text-[18px] leading-[27px]">
        :
      </span>
      <FlipUnit value={minutes} />
      <span className="text-[#dc3545] font-semibold text-[18px] leading-[27px]">
        :
      </span>
      <FlipUnit value={seconds} />
    </div>
  );
};

// const DropDownMobileTablet = ({ items }) => {
//   return (
//     <div className="w-full h-full bg-white p-2 border border-gray-200 rounded-xl">
//       {items.map((item) => (
//         <div
//           key={item._id}
//           className="flex gap-5 flex-col w-full cursor-pointer items-start justify-center p-2"
//         >
//           <p className="text-[16px] px-2 leading-[20px] text-[#001430] transition-colors duration-300 hover:text-[#06a096] font-semibold">
//             {item.name}
//           </p>
//           <div className="flex flex-col gap-0.5 w-full items-start">
//             {item?.items?.map((product) => (
//               <p
//                 key={product._id}
//                 className="text-[16px] px-2 leading-[20px] font-semibold text-[#001430] transition-colors duration-300 hover:text-[#06a096]"
//               >
//                 {product.name}
//               </p>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
const DropDownMobileTablet = ({ items }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (id) => {
    setOpenItems((prevOpenItems) =>
      prevOpenItems.includes(id)
        ? prevOpenItems.filter((item) => item !== id)
        : [...prevOpenItems, id]
    );
  };

  return (
    <div className="w-full bg-white p-2 border border-gray-200 rounded-xl">
      {items.map((item) => {
        const isOpen = openItems.includes(item._id);
        return (
          <div key={item._id} className="flex flex-col w-full">
            <div
              onClick={() => toggleItem(item._id)}
              className="flex items-center justify-between py-2 px-4 cursor-pointer w-full transition-colors duration-300 hover:bg-gray-100 rounded-md"
            >
              <p className="text-[16px] leading-[20px] text-[#001430] font-semibold">
                {item.label}
              </p>
              <ChevronDown
                className={`w-4 h-4 text-[#001430] transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              <div className="flex flex-col gap-1 w-full items-start pl-6 py-1">
                {item?.items?.map((product) => (
                  <p
                    key={product._id}
                    className="text-[16px] px-2 py-1 leading-[20px] font-semibold text-[#001430] transition-colors duration-300 hover:text-[#06a096]"
                  >
                    {product.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AllCategories = () => {
  const [categories_items, setCategoriesItems] = useState([]);
  useEffect(() => {
    getCategories().then((categories) => {
      console.log("categories",categories)
      setCategoriesItems(categories);
    });
  }, []);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 6, opacity: 0 }}
        transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
        className="absolute left-0 top-12 h-96 hide-scrollbar w-60 overflow-y-auto bg-white z-50 shadow-2xl"
      >
        <div className="flex flex-col border-[2px] border-gray-300">
          {categories_items.map((item) => {
            // const Icon = IconComponents[item.icon];
            return (
              <div
                key={item.categoryId}
                className="group flex gap-3 justify-start text-black hover:text-white relative overflow-hidden transition-colors duration-300 items-center w-full px-3 py-2 border-b-[2px] border-gray-300"
              >
                <span className="absolute top-0 left-0 w-0 h-full bg-[#00bbae] z-[-1] transition-all duration-700 group-hover:w-full" />
                <div className="w-8 h-8 flex items-center justify-center">
                  {/* <Icon className="w-5 h-5" /> */}
                </div>
                <p className="text-[16px] leading-[24px] font-semibold">
                  {item.categoryName}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const SearchProducts = ({ searchProduct, debouncedSearch, onSearch }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [productList, setProductList] = useState([]);
  const isTyping = searchProduct !== debouncedSearch;

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  const fetchProducts = async () => {
    const response = await api.get("/products");
    console.log("response",response.data)
    setProductList(response.data.products)
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!debouncedSearch || !Array.isArray(productList)) {
      setFilteredProducts([]);
      return;
    }
  
    const query = debouncedSearch.toLowerCase().trim();
  
    const results = productList.filter((product) => {
      return (
        product?.name?.toLowerCase().includes(query) ||
        product?.categories?.some((category) =>
          category?.categoryName?.toLowerCase().includes(query)
        )
      );
    });
  
    setFilteredProducts(results);
  
    if (!recentSearches.includes(debouncedSearch) && query.length > 1) {
      const updatedSearches = [debouncedSearch, ...recentSearches].slice(0, 6);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  }, [debouncedSearch, productList]);
  

  const deleteSearch = (search) => {
    const updated = recentSearches.filter((s) => s !== search);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="absolute top-12 left-0 w-full bg-white shadow-xl z-40">
      <div className="grid grid-cols-2">
        {isTyping ? (
          <p className="p-4 text-gray-500 text-base">Searching...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="flex bg-white gap-5 w-full items-center cursor-pointer p-3"
            >
              <div className="w-18 h-18 bg-gray-100 p-1 rounded-md flex items-center justify-center">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-black font-semibold transition-colors duration-300 text-[16px] leading-[24px] hover:text-[#00bbae]">
                  {product.name}
                </p>
              </div>
            </div>
          ))
        ) : debouncedSearch === "" ? null : (
          <p className="p-4 text-gray-500 text-base">No products found</p>
        )}
      </div>

      {recentSearches.length > 0 && (
        <div className="border-t border-gray-200 mt-2 bg-gray-50">
          <p className="px-4 py-2 text-gray-700 text-sm font-semibold">
            Recent Searches
          </p>
          <div className="flex flex-col divide-y divide-gray-200">
            {recentSearches.map((search, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 transition"
              >
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => onSearch && onSearch(search)}
                >
                  <Search className="w-4 h-4 text-gray-600" />
                  <span className="text-[15px] text-[#001430] font-medium">
                    {search}
                  </span>
                </div>
                <button
                  onClick={() => deleteSearch(search)}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export {
  AnimatedDropdown,
  Countdown,
  ScrollToTop,
  DropDownMobileTablet,
  AllCategories,
  SearchProducts,
};

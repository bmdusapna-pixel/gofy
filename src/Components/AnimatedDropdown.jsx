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
} from "lucide-react";
import product_list from "../assets/product-list";
import { slugify } from "../assets/helper";

const IconComponents = {
  Baby,
  BookOpenCheck,
  Puzzle,
  Home,
  Book,
  Sun,
  Bike,
  Car,
  User,
};

const categories_items = [
  { _id: 1, title: "Dolls", icon: "Baby" },
  { _id: 2, title: "Educational Toy", icon: "BookOpenCheck" },
  { _id: 3, title: "Games and puzzle", icon: "Puzzle" },
  { _id: 4, title: "Indoor Play", icon: "Home" },
  { _id: 5, title: "Kids Books", icon: "Book" },
  { _id: 6, title: "Outdoor Toy", icon: "Sun" },
  { _id: 7, title: "Rockers & Rides", icon: "Bike" },
  { _id: 8, title: "Toy Figures", icon: "User" },
  { _id: 9, title: "Vehicles Toys", icon: "Car" },
];

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedDropdown = ({ items }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 6, opacity: 0 }}
        transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
        className="absolute top-7 left-0 border-[1px] border-gray-400 bg-white w-6xl rounded-md z-50 grid grid-cols-7 custom-grid-5"
      >
        {items?.map((item, index) => (
          <div key={index} className="flex gap-3 flex-col w-full p-1.5">
            <Link
              to={`/products/${item.url}`}
              className="text-[18px] px-2 leading-[27px] text-[#DC3545] font-bold"
            >
              {item.label}
            </Link>
            <div className="flex flex-col gap-0.5 w-full items-center justify-center">
              {item?.items?.map((product) => (
                <Link
                  to={
                    product.category === "toy"
                      ? `/products/toys/item/${slugify(product.name)}`
                      : `/products/clothes/item/${slugify(product.name)}`
                  }
                  className="relative overflow-hidden group cursor-pointer w-full px-3 py-1 rounded-md text-[#001430] hover:text-white transition-colors duration-500 items-start justify-center"
                  key={product._id}
                >
                  <span className="absolute top-0 left-0 w-full h-0 bg-[#00bbae] z-[-1] transition-all duration-500 group-hover:h-full" />
                  <p className="text-[16px] leading-[24px] font-semibold">
                    {product.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}
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

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(
    40 * 24 * 60 * 60 + 13 * 3600 + 56 * 60
  );

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

const DropDownMobileTablet = ({ items }) => {
  return (
    <div className="w-full h-full bg-white grid grid-cols-2 p-2 border border-gray-200 rounded-xl md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item._id}
          className="flex gap-5 flex-col w-full cursor-pointer items-start justify-center p-2"
        >
          <p className="text-[16px] px-2 leading-[20px] text-[#001430] transition-colors duration-300 hover:text-[#06a096] font-semibold">
            {item.name}
          </p>
          <div className="flex flex-col gap-0.5 w-full items-start">
            {item.items.map((product) => (
              <p
                key={product._id}
                className="text-[16px] px-2 leading-[20px] font-semibold text-[#001430] transition-colors duration-300 hover:text-[#06a096]"
              >
                {product.name}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const AllCategories = () => {
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
            const Icon = IconComponents[item.icon];
            return (
              <div
                key={item._id}
                className="group flex gap-3 justify-start text-black hover:text-white relative overflow-hidden transition-colors duration-300 items-center w-full px-3 py-2 border-b-[2px] border-gray-300"
              >
                <span className="absolute top-0 left-0 w-0 h-full bg-[#00bbae] z-[-1] transition-all duration-700 group-hover:w-full" />
                <div className="w-8 h-8 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-[16px] leading-[24px] font-semibold">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const SearchProducts = ({ searchProduct, debouncedSearch }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const isTyping = searchProduct !== debouncedSearch;

  useEffect(() => {
    const query = debouncedSearch.toLowerCase().trim();
    if (query === "") {
      setFilteredProducts([]);
      return;
    }
    const results = product_list.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.product_type.toLowerCase().includes(query)
    );
    setFilteredProducts(results);
  }, [debouncedSearch]);

  return (
    <div className="absolute top-12 left-0 w-full bg-white shadow-xl z-40">
      <div className="grid grid-cols-2">
        {isTyping ? (
          <p className="p-4 text-gray-500 text-base">Searching...</p>
        ) : (
          filteredProducts.length > 0 &&
          filteredProducts.map((product, index) => (
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
                <p className="text-gray-600 font-semibold text-[16px] leading-[24px]">
                  ₹ {product.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
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

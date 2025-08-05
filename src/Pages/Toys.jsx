import React, { useContext, useEffect, useMemo, useState } from "react";
import { Heart, Menu, MoveRight, ShoppingBag, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import FilterCategory from "../Components/FilterCategory";
import FilterColorCategory from "../Components/FilterColorCategory.jsx";
import { toys_items } from "../assets/helper.js";

const Toys = () => {
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);
  const [hoveredToyCategory, sethoveredToyCategory] = useState(null);
  const [currentToyCategory, setCurrentToyCategory] = useState("");
  const [toyCategory, setToyCategory] = useState([]);
  const [ageCategory, setAgeCategory] = useState([]);
  const [hoveredAgeCategory, setHoveredAgeCategory] = useState(null);
  const [currentAgeCategory, setCurrentAgeCategory] = useState([]);
  const [materialCategory, setMaterialCategory] = useState([]);
  const [hoveredMaterialCategory, setHoveredMaterialCategory] = useState(null);
  const [currentMaterialCategory, setCurrentMaterialCategory] = useState([]);
  const [colorCategory, setColorCategory] = useState([]);
  const [hoveredColorCategory, setHoveredColorCategory] = useState(null);
  const [currentColorCategory, setCurrenColorCategory] = useState([]);
  const [sizeCategory, setSizeCategory] = useState([]);
  const [hoveredSizeCategory, setHoveredSizeCategory] = useState(null);
  const [currentSizeCategory, setCurrentSizeCategory] = useState([]);
  const [hoveredPriceCategory, setHoveredPriceCategory] = useState(null);
  const [currentPriceCategory, setCurrentPriceCategory] = useState([]);
  const [genderCategory, setGenderCategory] = useState([]);
  const [hoveredGenderCategory, setHoveredGenderCategory] = useState(null);
  const [currentGenderCategory, setCurrentGenderCategory] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const clearAllFilters = () => {
    setCurrentToyCategory("");
    setCurrentAgeCategory([]);
    setCurrentMaterialCategory([]);
    setCurrenColorCategory([]);
    setCurrentSizeCategory([]);
    setCurrentPriceCategory([]);
  };

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

  useEffect(() => {
    const extractUnique = (items, key, label = key) => {
      const seen = new Set();
      return items.reduce((acc, item) => {
        const value = item[key];
        if (value && !seen.has(value)) {
          seen.add(value);
          acc.push({
            _id: item._id,
            title: value,
            sub_category: item.sub_category,
          });
        }
        return acc;
      }, []);
    };

    const genderOptions = [
      { _id: 1, title: "Girls", sub_category: "Girls" },
      { _id: 2, title: "Boys", sub_category: "Boys" },
    ];

    const sizeOptions = [
      { _id: 1, title: "6 inches" },
      { _id: 2, title: "10 inches" },
      { _id: 3, title: "12 inches" },
      { _id: 4, title: "18 inches" },
      { _id: 5, title: "24 inches" },
      { _id: 6, title: "Jumbo (36+ inch)" },
    ];

    setToyCategory(extractUnique(toys_items, "sub_category"));
    setGenderCategory(genderOptions);
    setAgeCategory(extractUnique(toys_items, "age_group"));
    setMaterialCategory(extractUnique(toys_items, "material"));
    setColorCategory(extractUnique(toys_items, "color"));
    setSizeCategory(sizeOptions);
  }, []);

  const filteredToys = useMemo(() => {
    return toys_items.filter((item) => {
      const categoryMatch =
        !currentToyCategory || item.sub_category === currentToyCategory;
      const ageMatch =
        currentAgeCategory.length === 0 ||
        currentAgeCategory.includes(item.age_group);
      const materialMatch =
        currentMaterialCategory.length === 0 ||
        currentMaterialCategory.includes(item.material);
      const colorMatch =
        currentColorCategory.length === 0 ||
        currentColorCategory.includes(item.color);
      const priceMatch =
        currentPriceCategory.length === 0 ||
        currentPriceCategory.some((range) => {
          const price = item.price;
          if (range === "200 to 600") return price >= 200 && price < 600;
          if (range === "600 to 1500") return price >= 600 && price < 1500;
          if (range === "1500 to 2000") return price >= 1500 && price < 2000;
          if (range === "2000 to 3000") return price >= 2000 && price < 3000;
          if (range === "3000 above") return price >= 3000;
          return false;
        });
      return (
        categoryMatch && ageMatch && materialMatch && colorMatch && priceMatch
      );
    });
  }, [
    toys_items,
    currentToyCategory,
    currentAgeCategory,
    currentMaterialCategory,
    currentColorCategory,
    currentPriceCategory,
  ]);

  const isAnyFilterApplied =
    currentToyCategory !== "" ||
    currentAgeCategory.length > 0 ||
    currentMaterialCategory.length > 0 ||
    currentColorCategory.length > 0 ||
    currentPriceCategory.length > 0;

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full lg:px-12 px-5 mx-auto py-10 flex flex-col gap-14">
        <div className="flex gap-5 w-full">
          <div className="lg:w-1/5 lg:flex hidden flex-col gap-5">
            <div
              onMouseLeave={() => sethoveredToyCategory(null)}
              className="border-gray-200 border-[2px] bg-white rounded-2xl p-4 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">
                  Category
                </p>
                <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {toyCategory.map((item) => {
                  const isActive =
                    hoveredToyCategory === item._id ||
                    currentToyCategory === item.sub_category;
                  return (
                    <div
                      key={item._id}
                      className={`flex w-full items-center cursor-pointer transition-colors duration-300 ${
                        isActive ? "text-[#00bbae]" : "text-[#69778a]"
                      }`}
                      onMouseEnter={() => sethoveredToyCategory(item._id)}
                      onClick={() => setCurrentToyCategory(item.sub_category)}
                    >
                      <MoveRight
                        className={`w-5 h-5 ${isActive ? "block" : "hidden"}`}
                      />
                      <p
                        className={`text-[16px] leading-[24px] font-semibold transition-transform duration-500 ${
                          isActive ? "translate-x-1" : "translate-x-0"
                        }`}
                      >
                        {item.sub_category}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <FilterCategory
              headingTitile={"Age Group"}
              items={ageCategory}
              hoveredItem={hoveredAgeCategory}
              setHoveredItem={setHoveredAgeCategory}
              selectedItems={currentAgeCategory}
              setSelectedItems={setCurrentAgeCategory}
            />
            <FilterCategory
              headingTitile={"Gender"}
              items={genderCategory}
              hoveredItem={hoveredGenderCategory}
              setHoveredItem={setHoveredGenderCategory}
              selectedItems={currentGenderCategory}
              setSelectedItems={setCurrentGenderCategory}
            />
            <FilterCategory
              headingTitile={"Material Used"}
              items={materialCategory}
              hoveredItem={hoveredMaterialCategory}
              setHoveredItem={setHoveredMaterialCategory}
              selectedItems={currentMaterialCategory}
              setSelectedItems={setCurrentMaterialCategory}
            />
            <FilterColorCategory
              headingTitile={"Colors"}
              items={colorCategory}
              hoveredItem={hoveredColorCategory}
              setHoveredItem={setHoveredColorCategory}
              selectedItems={currentColorCategory}
              setSelectedItems={setCurrenColorCategory}
            />
            <FilterCategory
              headingTitile={"Size"}
              items={sizeCategory}
              hoveredItem={hoveredSizeCategory}
              setHoveredItem={setHoveredSizeCategory}
              selectedItems={currentSizeCategory}
              setSelectedItems={setCurrentSizeCategory}
            />
            <FilterCategory
              headingTitile={"Price"}
              items={priceRanges}
              hoveredItem={hoveredPriceCategory}
              setHoveredItem={setHoveredPriceCategory}
              selectedItems={currentPriceCategory}
              setSelectedItems={setCurrentPriceCategory}
            />
          </div>
          <div
            className={`fixed left-0 p-5 overflow-y-auto top-0 w-96 bg-white flex flex-col gap-2 lg:hidden h-full z-50 transition-transform duration-300 ${
              openFilter ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              onClick={() => setOpenFilter(false)}
              className="w-10 cursor-pointer hover:bg-gray-100 bg-transparent lg:hidden flex items-center justify-center h-10 border border-[#69778a] p-1 rounded-md"
            >
              <X className="w-6 h-6 text-[#69778a]" />
            </div>
            <div
              onMouseLeave={() => sethoveredToyCategory(null)}
              className="bg-white p-4 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">
                  Category
                </p>
                <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {toyCategory.map((item) => {
                  const isActive =
                    hoveredToyCategory === item._id ||
                    currentToyCategory === item.sub_category;
                  return (
                    <div
                      key={item._id}
                      className={`flex w-full items-center cursor-pointer transition-colors duration-300 ${
                        isActive ? "text-[#00bbae]" : "text-[#69778a]"
                      }`}
                      onMouseEnter={() => sethoveredToyCategory(item._id)}
                      onClick={() => setCurrentToyCategory(item.sub_category)}
                    >
                      <MoveRight
                        className={`w-5 h-5 ${isActive ? "block" : "hidden"}`}
                      />
                      <p
                        className={`text-[16px] leading-[24px] font-semibold transition-transform duration-500 ${
                          isActive ? "translate-x-1" : "translate-x-0"
                        }`}
                      >
                        {item.sub_category}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Age Group"}
              items={ageCategory}
              hoveredItem={hoveredAgeCategory}
              setHoveredItem={setHoveredAgeCategory}
              selectedItems={currentAgeCategory}
              setSelectedItems={setCurrentAgeCategory}
            />
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Gender"}
              items={genderCategory}
              hoveredItem={hoveredGenderCategory}
              setHoveredItem={setHoveredGenderCategory}
              selectedItems={currentGenderCategory}
              setSelectedItems={setCurrentGenderCategory}
            />
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Material Used"}
              items={materialCategory}
              hoveredItem={hoveredMaterialCategory}
              setHoveredItem={setHoveredMaterialCategory}
              selectedItems={currentMaterialCategory}
              setSelectedItems={setCurrentMaterialCategory}
            />
            <FilterColorCategory
              openFilter={openFilter}
              headingTitile={"Colors"}
              items={colorCategory}
              hoveredItem={hoveredColorCategory}
              setHoveredItem={setHoveredColorCategory}
              selectedItems={currentColorCategory}
              setSelectedItems={setCurrenColorCategory}
            />
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Size"}
              items={sizeCategory}
              hoveredItem={hoveredSizeCategory}
              setHoveredItem={setHoveredSizeCategory}
              selectedItems={currentSizeCategory}
              setSelectedItems={setCurrentSizeCategory}
            />
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Price"}
              items={priceRanges}
              hoveredItem={hoveredPriceCategory}
              setHoveredItem={setHoveredPriceCategory}
              selectedItems={currentPriceCategory}
              setSelectedItems={setCurrentPriceCategory}
            />
          </div>
          <div className="lg:w-4/5 w-full flex flex-col gap-5">
            <div className="flex justify-between w-full items-center bg-white rounded-xl p-4">
              <p className="text-[#69778a] text-[18px] leading-[24px] font-semibold lg:block hidden">
                Showing all{" "}
                {filteredToys.length > 0 ? filteredToys.length : null} of{" "}
                {toys_items.length} results
              </p>
              <div className="flex gap-5 lg:justify-start justify-between lg:w-auto w-full items-center">
                <p
                  onClick={clearAllFilters}
                  className="text-[18px] leading-[27px] text-black font-semibold transition-colors duration-300 hover:text-[#00bbae] cursor-pointer"
                >
                  Clear All Filters
                </p>
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
                <div
                  onClick={() => setOpenFilter((prev) => !prev)}
                  className="w-10 cursor-pointer hover:bg-gray-100 bg-transparent lg:hidden flex items-center justify-center h-10 border border-[#69778a] p-1 rounded-md"
                >
                  <Menu className="w-6 h-6 text-[#69778a]" />
                </div>
              </div>
            </div>
            <div className="w-full my-grid">
              {(isAnyFilterApplied ? filteredToys : toys_items).map((toy) => (
                <Link
                  to={`/products/toys/${toy.url}`}
                  key={toy._id}
                  onMouseEnter={() => setProductHoverd(toy._id)}
                  onMouseLeave={() => setProductHoverd(null)}
                  className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group"
                >
                  <div className="w-full bg-[#f9f9f9] rounded-md relative h-48 overflow-hidden group">
                    <img
                      src={toy.images[0]}
                      alt={toy.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {productHovered === toy._id && (
                      <div className="absolute inset-0 bg-black/10 z-10 rounded-md"></div>
                    )}
                    {productHovered === toy._id && (
                      <div className="absolute sm:block hidden bottom-3 left-1/2 -translate-x-1/2 transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                        <div className="flex gap-2 items-center">
                          <div
                            onClick={(event) =>
                              addFavouriteItemsWishList(toy, event)
                            }
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
                          >
                            <Heart className="w-5 h-4" />
                          </div>
                          <div
                            onClick={(event) => addProductToCart(toy, event)}
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
                      <div className="flex gap-2 items-center py-0.5 px-1.5 rounded-bl-lg rounded-tr-lg bg-[#f88e0f]">
                        <Star className="w-3 h-3 text-white" fill="white" />
                        <p className="text-white">({toy.rating})</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {toy.review} Review
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">{toy.sub_category}</p>
                    <div className="flex sm:flex-col flex-row justify-between w-full gap-2">
                      <p className="text-black text-[20px] leading-[30px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
                        {toy.name}
                      </p>
                      <p className="text-[#00bbae] text-[20px] leading-[30px] font-semibold">
                        ₹ {toy.price}
                      </p>
                    </div>
                    <div className="flex sm:hidden gap-2 items-center">
                      <div
                        onClick={(event) =>
                          addFavouriteItemsWishList(toy, event)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-[#00bbae] text-white"
                      >
                        <Heart className="w-4 h-4" />
                      </div>
                      <div
                        onClick={(event) => addProductToCart(toy, event)}
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

export default Toys;

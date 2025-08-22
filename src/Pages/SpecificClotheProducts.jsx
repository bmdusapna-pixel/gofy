import React, { useContext, useEffect, useMemo, useState } from "react";
import { Heart, Menu, MoveRight, ShoppingBag, Star, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { clothe_items, priceRanges, unslugify } from "../assets/helper.js";
import FilterCategory from "../Components/FilterCategory";
import FilterColorCategory from "../Components/FilterColorCategory.jsx";
import FilterActiveComponent from "../Components/FilterActiveComponent.jsx";
import PriceRangeSlider from "../Components/PriceRangeSlider.jsx";
import RatingFilter from "../Components/RatingFilter.jsx";

import SuperBanner from "../assets/superBanner.png";

const SpecificClotheProducts = () => {
  const { url } = useParams();
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);
  const [hoveredClotheCategory, setHoveredClotheCategory] = useState(null);
  const [currentClotheCategory, setCurrentClotheCategory] = useState("");
  const [clotheCategory, setClotheCategory] = useState([]);
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
  const [sleevesCategory, setSleevesCategory] = useState([]);
  const [hoveredSleevesCategory, setHoveredSleevesCategory] = useState(null);
  const [currentSleevesCategory, setCurrentSleevesCategory] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [filterBrands, setFilterBrands] = useState([]);
  const [hoveredBrand, setHoveredBrand] = useState("");
  const [currentBrand, setCurrentBrand] = useState("");

  const clotheList = clothe_items;

  const clearAllFilters = () => {
    setCurrentClotheCategory(""); // Add this line to clear clothe category
    setCurrentAgeCategory([]);
    setCurrentMaterialCategory([]);
    setCurrenColorCategory([]);
    setCurrentSizeCategory([]);
    setCurrentPriceCategory([]);
    setCurrentGenderCategory(""); // Add this line
    setCurrentSleevesCategory(""); // Add this line
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
    setCurrentClotheCategory(unslugify(url));
  }, [url]);

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

    const extractUniqueSizes = (items) => {
      const seen = new Set();
      const sizeArray = [];
      let idCounter = 1;
      items.forEach((item) => {
        if (item.size && Array.isArray(item.size)) {
          item.size.forEach((sizeValue) => {
            if (!seen.has(sizeValue)) {
              seen.add(sizeValue);
              sizeArray.push({ _id: idCounter++, title: sizeValue });
            }
          });
        }
      });
      return sizeArray;
    };

    const genderOptions = [
      { _id: 1, title: "Girls", sub_category: "Girls" },
      { _id: 2, title: "Boys", sub_category: "Boys" },
    ];
    const Brands = [
      { _id: 1, title: "H&M", sub_category: "H&M" },
      { _id: 2, title: "Addiidas", sub_category: "Addiidas" },
    ];

    const sleevesOptions = [
      { _id: 1, title: "Half Sleeves" },
      { _id: 2, title: "Full Sleeves" },
      { _id: 3, title: "Without Sleeves" },
    ];
    setClotheCategory(extractUnique(clothe_items, "sub_category"));
    setGenderCategory(genderOptions);
    setFilterBrands(Brands);
    setSleevesCategory(sleevesOptions);
    setAgeCategory(extractUnique(clothe_items, "age_group"));
    setMaterialCategory(extractUnique(clothe_items, "material"));
    setColorCategory(extractUnique(clothe_items, "color"));
    setSizeCategory(extractUniqueSizes(clothe_items));
  }, []);
  const [selectedRating, setSelectedRating] = useState("All");
  const filteredClothes = useMemo(() => {
    return clotheList.filter((item) => {
      const categoryMatch =
        !currentClotheCategory || item.sub_category === currentClotheCategory;
      const ageMatch =
        currentAgeCategory.length === 0 ||
        currentAgeCategory.includes(item.age_group);
      const materialMatch =
        currentMaterialCategory.length === 0 ||
        currentMaterialCategory.includes(item.material);
      const colorMatch =
        currentColorCategory.length === 0 ||
        currentColorCategory.includes(item.color);
      const sizeMatch =
        currentSizeCategory.length === 0 ||
        currentSizeCategory.includes(item.size);
      return (
        categoryMatch && ageMatch && materialMatch && colorMatch && sizeMatch
      );
    });
  }, [
    clothe_items,
    currentClotheCategory,
    currentAgeCategory,
    currentMaterialCategory,
    currentColorCategory,
    currentSizeCategory,
    currentPriceCategory,
    clotheList,
  ]);

  const isAnyFilterApplied =
    currentClotheCategory !== "" ||
    currentAgeCategory.length > 0 ||
    currentMaterialCategory.length > 0 ||
    currentColorCategory.length > 0 ||
    currentSizeCategory.length > 0 ||
    currentPriceCategory.length > 0;

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full h-[350px]">
        <img
          src={SuperBanner}
          alt="super banner"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="w-full lg:px-12 px-5 mx-auto py-10 flex flex-col gap-14">
        <div className="flex gap-5 w-full">
          <div className="lg:w-1/5 lg:flex hidden flex-col gap-5">
            {/* <div
              onMouseLeave={() => setHoveredClotheCategory(null)}
              className="border-gray-200 border-[2px] bg-white rounded-2xl p-4 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">
                  Category
                </p>
                <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {clotheCategory.map((item) => {
                  const isActive =
                    hoveredClotheCategory === item._id ||
                    currentClotheCategory === item.sub_category;
                  return (
                    <div
                      key={item._id}
                      className={`flex w-full items-center cursor-pointer transition-colors duration-300 ${
                        isActive ? "text-[#00bbae]" : "text-[#69778a]"
                      }`}
                      onMouseEnter={() => setHoveredClotheCategory(item._id)}
                      onClick={() =>
                        setCurrentClotheCategory(item.sub_category)
                      }
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
            </div> */}
            <FilterActiveComponent
              items={clotheCategory}
              headingTitle="Category"
              hoveredItem={hoveredClotheCategory}
              setHoveredItem={setHoveredClotheCategory}
              selectedItem={currentClotheCategory}
              setSelectedItem={setCurrentClotheCategory}
            />
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Brands"}
              items={filterBrands}
              hoveredItem={hoveredBrand}
              setHoveredItem={setHoveredBrand}
              selectedItems={currentBrand}
              setSelectedItems={setCurrentBrand}
            />
            <FilterCategory
              headingTitile={"Age Group"}
              items={ageCategory}
              hoveredItem={hoveredAgeCategory}
              setHoveredItem={setHoveredAgeCategory}
              selectedItems={currentAgeCategory}
              setSelectedItems={setCurrentAgeCategory}
            />
            <FilterCategory
              headingTitile={"Material Used"}
              items={materialCategory}
              hoveredItem={hoveredMaterialCategory}
              setHoveredItem={setHoveredMaterialCategory}
              selectedItems={currentMaterialCategory}
              setSelectedItems={setCurrentMaterialCategory}
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
              headingTitile={"Sleeves"}
              items={sleevesCategory}
              hoveredItem={hoveredSleevesCategory}
              setHoveredItem={setHoveredSleevesCategory}
              selectedItems={currentSleevesCategory}
              setSelectedItems={setCurrentSleevesCategory}
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
            <PriceRangeSlider headingTitle="Price" min={0} max={500} />
            <RatingFilter
              headingTitle="Rating"
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              groupName="rating"
            />
          </div>
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
            {/* <div
              onMouseLeave={() => setHoveredClotheCategory(null)}
              className="border-gray-200 border-[2px] bg-white rounded-2xl p-4 flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">
                  Category
                </p>
                <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {clotheCategory.map((item) => {
                  const isActive =
                    hoveredClotheCategory === item._id ||
                    currentClotheCategory === item.sub_category;
                  return (
                    <div
                      key={item._id}
                      className={`flex w-full items-center cursor-pointer transition-colors duration-300 ${
                        isActive ? "text-[#00bbae]" : "text-[#69778a]"
                      }`}
                      onMouseEnter={() => setHoveredClotheCategory(item._id)}
                      onClick={() =>
                        setCurrentClotheCategory(item.sub_category)
                      }
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
            </div> */}
            <FilterActiveComponent
              items={clotheCategory}
              headingTitle="Category"
              hoveredItem={hoveredClotheCategory}
              setHoveredItem={setHoveredClotheCategory}
              selectedItem={currentClotheCategory}
              setSelectedItem={setCurrentClotheCategory}
            />
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Brands"}
              items={filterBrands}
              hoveredItem={hoveredBrand}
              setHoveredItem={setHoveredBrand}
              selectedItems={currentBrand}
              setSelectedItems={setCurrentBrand}
            />
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
            <FilterCategory
              openFilter={openFilter}
              headingTitile={"Sleeves"}
              items={sleevesCategory}
              hoveredItem={hoveredSleevesCategory}
              setHoveredItem={setHoveredSleevesCategory}
              selectedItems={currentSleevesCategory}
              setSelectedItems={setCurrentSleevesCategory}
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
            <PriceRangeSlider headingTitle="Price" min={0} max={500} />
            <RatingFilter
              headingTitle="Rating"
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              groupName="ratingDesktop"
            />
          </div>
          <div className="lg:w-4/5 w-full flex flex-col gap-5">
            <div className="flex justify-between w-full items-center bg-white rounded-xl p-4">
              <p className="text-[#69778a] text-[18px] leading-[24px] font-semibold lg:block hidden">
                Showing all{" "}
                {filteredClothes.length > 0 ? filteredClothes.length : null} of{" "}
                {clotheList.length} results
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
            <div className="w-full my-grid">
              {(isAnyFilterApplied ? filteredClothes : clotheList).map(
                (clothe) => (
                  <Link
                    to={`/products/clothes/${clothe.url}`}
                    key={clothe._id}
                    onMouseEnter={() => setProductHoverd(clothe._id)}
                    onMouseLeave={() => setProductHoverd(null)}
                    className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group"
                  >
                    <div className="w-full bg-[#f9f9f9] rounded-md relative h-48 overflow-hidden group">
                      <img
                        src={clothe.images[0]}
                        alt={clothe.name}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {productHovered === clothe._id && (
                        <div className="absolute inset-0 bg-black/10 z-10 rounded-md"></div>
                      )}
                      {productHovered === clothe._id && (
                        <div className="absolute sm:block hidden bottom-3 left-1/2 -translate-x-1/2 transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                          <div className="flex gap-2 items-center">
                            <div
                              onClick={(event) =>
                                addFavouriteItemsWishList(clothe, event)
                              }
                              className="w-10 h-10 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white"
                            >
                              <Heart className="w-5 h-4" />
                            </div>
                            <div
                              onClick={(event) =>
                                addProductToCart(clothe, event)
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
                        {/* <div className="flex gap-2 items-center py-0.5 px-1.5 rounded-bl-lg rounded-tr-lg bg-[#f88e0f]">
                          <Star className="w-3 h-3 text-white" fill="white" />
                          <p className="text-white">({clothe.rating})</p>
                        </div> */}
                        <div className="flex items-center">
                          {Array.from({
                            length: Math.floor(clothe.rating),
                          }).map(() => (
                            <Star
                              className="w-3 h-3 text-yellow-500"
                              fill="#f88e0f"
                            />
                          ))}
                          {Array.from({
                            length: 5 - Math.floor(clothe.rating),
                          }).map(() => (
                            <Star
                              className="w-3 h-3 text-yellow-500"
                              fill="white"
                            />
                          ))}
                        </div>
                        {/* <p className="text-sm text-gray-500">
                          {clothe.review} Review
                        </p> */}
                      </div>
                      {/* <p className="text-sm text-gray-500">
                        {clothe.sub_category}
                      </p> */}
                      <div className="flex sm:flex-col flex-row justify-between w-full gap-2">
                        <p className="text-black text-[20px] leading-[30px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
                          {clothe.name}
                        </p>
                        <div className="flex gap-2 items-center">
                          <p className="text-pink-600 text-[20px] leading-[30px] font-semibold">
                            ₹ {clothe.price}
                          </p>
                          <p className="text-gray-500 text-[14px] leading-[30px] line-through font-semibold">
                            ₹ {clothe.price + 100}
                          </p>
                          <p className="text-red-600 text-[18px] leading-[30px] font-semibold">
                            30% OFF
                          </p>
                        </div>
                      </div>
                      <div className="flex sm:hidden gap-2 items-center">
                        <div
                          onClick={(event) =>
                            addFavouriteItemsWishList(clothe, event)
                          }
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#00bbae] text-white"
                        >
                          <Heart className="w-4 h-4" />
                        </div>
                        <div
                          onClick={(event) => addProductToCart(clothe, event)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#00bbae] text-white"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificClotheProducts;

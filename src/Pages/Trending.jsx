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
import PriceRangeSlider from "../Components/PriceRangeSlider.jsx";
import FilterActiveComponent from "../Components/FilterActiveComponent.jsx";
import FilterCategory from "../Components/FilterCategory";
import FilterColorCategory from "../Components/FilterColorCategory.jsx";

const SuperDeals = () => {
  const { category, slug } = useParams();
  const [productItems, setProductItems] = useState([]);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);
  const [openFilter, setOpenFilter] = useState(false);
  const [hoveredClotheCategory, setHoveredClotheCategory] = useState(null);
  const [currentClotheCategory, setCurrentClotheCategory] = useState("");
  const [clotheCategory, setClotheCategory] = useState([]);
  const [genderCategory, setGenderCategory] = useState([]);
  const [sleevesCategory, setSleevesCategory] = useState([]);
  const [ageCategory, setAgeCategory] = useState([]);
  const [materialCategory, setMaterialCategory] = useState([]);
  const [colorCategory, setColorCategory] = useState([]);
  const [sizeCategory, setSizeCategory] = useState([]);
  const [hoveredAgeCategory, setHoveredAgeCategory] = useState(null);
  const [currentAgeCategory, setCurrentAgeCategory] = useState([]);
  const [hoveredMaterialCategory, setHoveredMaterialCategory] = useState(null);
  const [currentMaterialCategory, setCurrentMaterialCategory] = useState([]);
  const [hoveredGenderCategory, setHoveredGenderCategory] = useState(null);
  const [currentGenderCategory, setCurrentGenderCategory] = useState("");
  const [hoveredSleevesCategory, setHoveredSleevesCategory] = useState(null);
  const [currentSleevesCategory, setCurrentSleevesCategory] = useState("");
  const [hoveredColorCategory, setHoveredColorCategory] = useState(null);
  const [currentColorCategory, setCurrenColorCategory] = useState([]);
  const [hoveredSizeCategory, setHoveredSizeCategory] = useState(null);
  const [currentSizeCategory, setCurrentSizeCategory] = useState([]);
  const [currentPriceCategory, setCurrentPriceCategory] = useState([]);

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

    const sleevesOptions = [
      { _id: 1, title: "Half Sleeves" },
      { _id: 2, title: "Full Sleeves" },
      { _id: 3, title: "Without Sleeves" },
    ];
    setClotheCategory(extractUnique(clothe_items, "sub_category"));
    setGenderCategory(genderOptions);
    setSleevesCategory(sleevesOptions);
    setAgeCategory(extractUnique(clothe_items, "age_group"));
    setMaterialCategory(extractUnique(clothe_items, "material"));
    setColorCategory(extractUnique(clothe_items, "color"));
    setSizeCategory(extractUniqueSizes(clothe_items));
  }, []);

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

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full h-[350px]">
        <img
          src={SuperBanner}
          alt="super banner"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex gap-5 w-full lg:px-12 px-5 mx-auto py-10">
        <div className="lg:w-1/5 lg:flex hidden flex-col gap-5">
          <FilterActiveComponent
            items={clotheCategory}
            headingTitle="Category"
            hoveredItem={hoveredClotheCategory}
            setHoveredItem={setHoveredClotheCategory}
            selectedItem={currentClotheCategory}
            setSelectedItem={setCurrentClotheCategory}
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
          <FilterActiveComponent
            items={clotheCategory}
            headingTitle="Category"
            hoveredItem={hoveredClotheCategory}
            setHoveredItem={setHoveredClotheCategory}
            selectedItem={currentClotheCategory}
            setSelectedItem={setCurrentClotheCategory}
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
        </div>
        <div className="lg:w-4/5 w-full">
          <div className="flex gap-5 w-full">
            <div className="w-full flex flex-col gap-5">
              <div className="flex justify-between w-full items-center bg-white rounded-xl p-4">
                <p className="text-[#69778a] text-[18px] leading-[24px] font-semibold lg:block hidden">
                  Showing all {productItems.length} result
                  {productItems.length !== 1 ? "s" : ""}
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
              <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-3">
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
                          <p className="text-pink-600 text-[20px] leading-[30px] font-semibold">
                            ₹ {product.price}
                          </p>
                          <p className="text-gray-700 text-[14px] leading-[30px] line-through font-semibold">
                            ₹ {product.price + 100}
                          </p>
                          <p className="text-red-600 text-[18px] leading-[30px] font-semibold">
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
    </div>
  );
};

export default SuperDeals;

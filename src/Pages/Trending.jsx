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
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import SuperBanner from "../assets/superBanner.png";
import PriceRangeSlider from "../Components/PriceRangeSlider.jsx";
import FilterActiveComponent from "../Components/FilterActiveComponent.jsx";
import FilterCategory from "../Components/FilterCategory";
import FilterColorCategory from "../Components/FilterColorCategory.jsx";

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

const SuperDeals = () => {
  const [productItems, setProductItems] = useState([]);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);
  const [openFilter, setOpenFilter] = useState(false);

  // Filter states
  const [clotheCategory, setClotheCategory] = useState([]);
  const [genderCategory, setGenderCategory] = useState([]);
  const [sleevesCategory, setSleevesCategory] = useState([]);
  const [ageCategory, setAgeCategory] = useState([]);
  const [materialCategory, setMaterialCategory] = useState([]);
  const [colorCategory, setColorCategory] = useState([]);
  const [sizeCategory, setSizeCategory] = useState([]);

  // Selected filters
  const [currentClotheCategory, setCurrentClotheCategory] = useState("");
  const [currentAgeCategory, setCurrentAgeCategory] = useState([]);
  const [currentMaterialCategory, setCurrentMaterialCategory] = useState([]);
  const [currentGenderCategory, setCurrentGenderCategory] = useState("");
  const [currentSleevesCategory, setCurrentSleevesCategory] = useState("");
  const [currentColorCategory, setCurrenColorCategory] = useState([]);
  const [currentSizeCategory, setCurrentSizeCategory] = useState([]);
  const [currentPriceCategory, setCurrentPriceCategory] = useState([]);

  // Hovered (for UI highlight)
  const [hoveredClotheCategory, setHoveredClotheCategory] = useState(null);
  const [hoveredAgeCategory, setHoveredAgeCategory] = useState(null);
  const [hoveredMaterialCategory, setHoveredMaterialCategory] = useState(null);
  const [hoveredGenderCategory, setHoveredGenderCategory] = useState(null);
  const [hoveredSleevesCategory, setHoveredSleevesCategory] = useState(null);
  const [hoveredColorCategory, setHoveredColorCategory] = useState(null);
  const [hoveredSizeCategory, setHoveredSizeCategory] = useState(null);
  const [hoveredProductCategory, setHoveredProductCategory] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products`);
        const data = await res.json();
        setProductItems(data.data || []);

        // Extract filter options from API response
        const unique = (arr, key) => {
          const seen = new Set();
          return arr.reduce((acc, item) => {
            const value = item[key];
            if (value && !seen.has(value)) {
              seen.add(value);
              acc.push({ _id: item._id, title: value });
            }
            return acc;
          }, []);
        };

        // Extract categories from nested array
        const categories = [];
        // Extract colors from variants
        const colors = [];

        // Extract sizes (if available in future data)
        const sizes = [];

        // Extract age groups
        const ages = [];

        // Set state
        setClotheCategory(categories);
        setMaterialCategory(unique({}, "material"));
        setGenderCategory(unique({}, "gender"));
        setColorCategory(colors);
        setAgeCategory(ages);
        setSizeCategory(sizes);

        // Hardcode sleeves since API doesn’t provide
        setSleevesCategory([
          { _id: 1, title: "Half Sleeves" },
          { _id: 2, title: "Full Sleeves" },
          { _id: 3, title: "Without Sleeves" },
        ]);
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
    addFavouriteItems(product);
  };

  const clearAllFilters = () => {
    setCurrentClotheCategory("");
    setCurrentAgeCategory([]);
    setCurrentMaterialCategory([]);
    setCurrenColorCategory([]);
    setCurrentSizeCategory([]);
    setCurrentPriceCategory([]);
    setCurrentGenderCategory("");
    setCurrentSleevesCategory("");
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      {/* Banner */}
      <div className="w-full h-[350px]">
        <img
          src={SuperBanner}
          alt="super banner"
          className="object-cover h-full w-full"
        />
      </div>

      <div className="flex gap-5 w-full lg:px-12 px-5 mx-auto py-10">
        {/* Sidebar filters */}
        <div className="lg:w-1/5 lg:flex hidden flex-col gap-5">
          <FilterActiveComponent
            items={product_categories}
            headingTitle="Category"
            hoveredItem={hoveredProductCategory}
            setHoveredItem={setHoveredProductCategory}
            selectedItem={""}
            setSelectedItem={""}
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
          <PriceRangeSlider headingTitle="Price" min={0} max={20000} />
        </div>

        {/* Product Grid */}
        <div className="lg:w-4/5 w-full bo">
          <div className="flex justify-between w-full items-center bg-white rounded-xl p-4 mb-5">
            <p className="text-[#69778a] text-[18px] font-semibold hidden lg:block">
              Showing all {productItems.length} result
              {productItems.length !== 1 ? "s" : ""}
            </p>
            <div className="flex gap-5 items-center">
              <p
                onClick={clearAllFilters}
                className="text-[18px] font-semibold cursor-pointer hover:text-[#00bbae]"
              >
                Clear All Filters
              </p>
              <select className="border rounded-md p-2 cursor-pointer">
                <option value="">Filter</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="best-seller">Best Seller</option>
                <option value="newest">Newest</option>
              </select>
              <div
                onClick={() => setOpenFilter((prev) => !prev)}
                className="w-10 cursor-pointer lg:hidden flex items-center justify-center h-10 border rounded-md"
              >
                <Menu className="w-6 h-6 text-[#69778a]" />
              </div>
            </div>
          </div>

          <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3">
            {productItems.map((product, index) => (
              <Link
                key={index}
                to={`/product-details/${product.url}`}
                onMouseEnter={() => setProductHoverd(product._id)}
                onMouseLeave={() => setProductHoverd(null)}
                className="w-full cursor-pointer border rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 transition-shadow duration-300 group border-gray-200"
              >
                <div className="w-full bg-[#f9f9f9] rounded-md relative h-52">
                  <img
                    src={product?.variants?.[0].images?.[0]}
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
                          onClick={(e) => addFavouriteItemsWishList(product, e)}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#00bbae] text-black hover:text-white"
                        >
                          <Heart className="w-5 h-4" />
                        </div>
                        <div
                          onClick={(e) => addProductToCart(product, e)}
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-[#00bbae] text-black hover:text-white"
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 w-full px-2">
                  <p className="text-black text-[20px] font-semibold hover:text-[#00bbae]">
                    {product.name}
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-pink-600 text-[20px] font-semibold">
                      ₹ {product.variants?.[0]?.ageGroups?.[0]?.price || "—"}
                    </p>
                    <p className="text-gray-500 text-[14px] line-through font-semibold">
                      ₹ {product.variants?.[0]?.ageGroups?.[0]?.cutPrice || "—"}
                    </p>
                    <p className="text-red-600 text-[18px] font-semibold">
                      {product.variants?.[0]?.ageGroups?.[0]?.discount || "—"}%
                      OFF
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperDeals;

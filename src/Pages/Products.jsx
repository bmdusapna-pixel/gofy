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
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import FilterActiveComponent from "../Components/FilterActiveComponent.jsx";
import FilterCategory from "../Components/FilterCategory";
import FilterColorCategory from "../Components/FilterColorCategory.jsx";
import PriceRangeSlider from "../Components/PriceRangeSlider.jsx";
import RatingFilter from "../Components/RatingFilter.jsx";
import Breadcrumbs from "../Components/Breadcrumbs.jsx";
import {
  clothe_items,
  slugToAgeGroup,
  toys_items,
  unslugify,
  slugify,
  classifySlug,
} from "../assets/helper";

import SuperBanner from "../assets/superBanner.png";
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
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [productItems, setProductItems] = useState([]);
  const [hoveredProductCategory, setHoveredProductCategory] = useState(null);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart, addFavouriteItems } = useContext(CartContext);
  const [openFilter, setOpenFilter] = useState(false);
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
  const [filterBrands, setFilterBrands] = useState([]);
  const [hoveredBrand, setHoveredBrand] = useState("");
  const [currentBrand, setCurrentBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [filterCategory, setFilterCategory] = useState([]);
  const [allCollections, setAllCollections] = useState([]);
  const [categories, setCategories] = useState([]);

  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    clearAllFilters();
    if (slug || category) {
      const { age, collection } = classifySlug(slug);
      setSelectedCollection(collection);
      ageCategory.map((a) => {
        if (slugify(a.title) === age) {
          setCurrentAgeCategory(a.title);
        }
      });
    }
  }, [slug, category, ageCategory]);

  useEffect(() => {
    if (selectedCollection) {
      const relatedCollection = allCollections.find(
        (a) => slugify(a.collectionName) === selectedCollection
      );
      const relatedCategories = categories.filter(
        (c) => c.collectionId._id === relatedCollection._id
      );
      setFilterCategory(relatedCategories);
    }
  }, [selectedCollection, allCollections, categories]);

  useEffect(() => {
    const fetchCollection = async () => {
      const result = await fetch(`${baseUrl}/collections`);
      const res = await result.json();
      setAllCollections(res.collections);
    };
    const fetchCategories = async () => {
      const result = await fetch(`${baseUrl}/categories`);
      const res = await result.json();
      setCategories(res.categories);
    };
    fetchCategories();
    fetchCollection();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchQuery && searchQuery.trim()) {
          // Use search API if search query exists
          const res = await fetch(`${baseUrl}/product-search/query?query=${encodeURIComponent(searchQuery)}`);
          const results = await res.json();
          if (results.success) {
            // Convert search results to match product format
            const formattedProducts = results.products.map((product) => ({
              _id: product.productId,
              name: product.name,
              url: product.url,
              images: product.image ? [product.image] : [],
              price: product.price,
              cutPrice: product.cutPrice,
              discount: product.discount,
            }));
            setAllProducts(formattedProducts);
            setProductItems(formattedProducts);
          } else {
            setAllProducts([]);
            setProductItems([]);
          }
        } else {
          // Normal product fetch
          const res = await fetch(`${baseUrl}/products`);
          const results = await res.json();
          setAllProducts(results.data);
          setProductItems(results.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    const extractUnique = (items, key) => {
      const seen = new Set();
      return items.reduce((acc, item) => {
        const value = item[key];
        if (value && !seen.has(value)) {
          seen.add(value);
          acc.push({
            _id: item._id,
            title: value,
          });
        }
        return acc;
      }, []);
    };

    const genderOptions = [
      { _id: 1, title: "Girls", sub_category: "Girls" },
      { _id: 2, title: "Boys", sub_category: "Boys" },
    ];

    const Brands = [
      { _id: 1, title: "H&M", sub_category: "H&M" },
      { _id: 2, title: "Addiidas", sub_category: "Addiidas" },
    ];

    const sizeOptions = [
      { _id: 1, title: "6 inches" },
      { _id: 2, title: "10 inches" },
      { _id: 3, title: "12 inches" },
      { _id: 4, title: "18 inches" },
      { _id: 5, title: "24 inches" },
      { _id: 6, title: "Jumbo (36+ inch)" },
    ];

    setGenderCategory(genderOptions);
    setFilterBrands(extractUnique(productItems, "brand"));
    const fetchAges = async () => {
      const result = await fetch(`${baseUrl}/ages`);
      const res = await result.json();
      setAgeCategory(res.map((r) => ({ _id: r._id, title: r.ageRange })));
    };
    fetchAges();
    // setAgeCategory(extractUnique(toys_items, "age_group"));
    const fetchMaterial = async () => {
      const result = await fetch(`${baseUrl}/material`);
      const res = await result.json();
      setMaterialCategory(
        res.materials.map((r) => ({ _id: r._id, title: r.name }))
      );
    };
    fetchMaterial();
    // setMaterialCategory(extractUnique(toys_items, "material"));
    const fetchColor = async () => {
      const result = await fetch(`${baseUrl}/color/colors`);
      const res = await result.json();
      setColorCategory(
        res.map((r) => ({ _id: r._id, title: r.name, hexCode: r.hexCode }))
      );
    };
    fetchColor();
    // setColorCategory(extractUnique(toys_items, "color"));
    setSizeCategory(sizeOptions);
  }, [productItems]);

  const clearAllFilters = () => {
    setCurrentAgeCategory([]);
    setCurrentMaterialCategory([]);
    setCurrenColorCategory([]);
    setCurrentSizeCategory([]);
    setCurrentPriceCategory([]);
    setSelectedCategory("");
  };

  useEffect(() => {
    const filters = {
      filterCategory,
      selectedCategory,
      currentAgeCategory,
      currentColorCategory,
      currentMaterialCategory,
      currentBrand,
      currentGenderCategory,
    };
    let filteredProducts = productItems;
    if (filters.filterCategory?.length) {
      filteredProducts = filteredProducts.filter((product) =>
        product.categories?.some((c) =>
          filters.filterCategory.some(
            (fc) => fc.categoryName === c.categoryName
          )
        )
      );
    }
    filteredProducts = filteredProducts.filter((product) => {
      const matchSelectedCategory =
        !filters.selectedCategory ||
        product.categories?.some(
          (c) => c.categoryName === filters.selectedCategory
        );

      const matchAge =
        !filters.currentAgeCategory?.length ||
        product.variants?.some((variant) =>
          variant.ageGroups?.some((ag) =>
            filters.currentAgeCategory.includes(ag.ageGroup.ageRange)
          )
        );

      const matchColor =
        !filters.currentColorCategory?.length ||
        product.variants?.some((variant) =>
          filters.currentColorCategory.includes(variant.color?.name)
        );

      const matchMaterial =
        !filters.currentMaterialCategory?.length ||
        (product.material &&
          filters.currentMaterialCategory.includes(product.material.name));

      const matchBrand =
        !filters.currentBrand?.length ||
        (product.brand && filters.currentBrand.includes(product.brand));

      const matchGender =
        !filters.currentGenderCategory?.length ||
        (product.gender &&
          filters.currentGenderCategory.includes(product.gender));

      return (
        matchSelectedCategory &&
        matchAge &&
        matchColor &&
        matchMaterial &&
        matchBrand &&
        matchGender
      );
    });
    setAllProducts(filteredProducts);
  }, [
    filterCategory,
    selectedCategory,
    currentAgeCategory,
    currentColorCategory,
    currentMaterialCategory,
    currentBrand,
    currentGenderCategory,
    selectedRating,
    productItems,
  ]);

  // useEffect(() => {
  //   let items = [];
  //   if (category === "age" && slugToAgeGroup[slug]) {
  //     const ageGroup = slugToAgeGroup[slug];
  //     const filteredClothes = clothe_items
  //       .filter((item) => item.age_group === ageGroup)
  //       .map((item) => ({ ...item, category: "clothes" }));
  //     const filteredToys = toys_items
  //       .filter((item) => item.age_group === ageGroup)
  //       .map((item) => ({ ...item, category: "toys" }));
  //     items = [...filteredClothes, ...filteredToys];
  //     setProductItems(items);
  //   } else if (!category && !slug) {
  //     setProductItems([...clothe_items, ...toys_items]);
  //   } else if (category === "toys") {
  //     if (slug) {
  //       items = toys_items.filter(
  //         (item) => unslugify(slug) === item.sub_category
  //       );
  //       setProductItems(items);
  //     } else {
  //       items = toys_items.map((item) => ({ ...item, category: "toys" }));
  //       console.log(items);
  //       setProductItems(items);
  //     }
  //   } else if (category === "clothes") {
  //     if (slug) {
  //       items = clothe_items.filter(
  //         (item) => unslugify(slug) === item.sub_category
  //       );
  //       setProductItems(items);
  //     } else {
  //       items = clothe_items.map((item) => ({ ...item, category: "clothes" }));
  //       setProductItems(items);
  //     }
  //   }
  // }, [category, slug]);

  const addProductToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    const cartProduct = {
      _id: product._id,
      name: product.name,
      price: product?.variants?.[0]?.ageGroups?.[0]?.price,
      images: product?.variants?.[0]?.images,
      colorId: product?.variants?.[0].color._id,
      ageGroupId: product?.variants[0]?.ageGroups[0]?.ageGroup._id,
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
      colorId: product?.variants?.[0].color._id,
      ageGroupId: product?.variants[0]?.ageGroups[0]?.ageGroup._id,
    };
    addFavouriteItems(favProduct);
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
      <div className="lg:px-12 px-5 pt-4">
        <Breadcrumbs />
      </div>
      <div className="w-full lg:px-12 px-5 mx-auto py-5 flex flex-col gap-14">
        <div className="flex gap-5 w-full">
          <div className="lg:w-1/5 lg:flex hidden flex-col gap-5">
            {/* <div
              onMouseLeave={() => setHoveredProductCategory(null)}
              className="border-gray-200 border-[2px] bg-white rounded-2xl p-6 flex flex-col gap-8"
            >
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">
                  Product Categories
                </p>
                <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {product_categories.map((item) => (
                  <div
                    className="flex w-full items-center cursor-pointer text-[#69778a] hover:text-[#00bbae] transition-colors duration-300"
                    key={item._id}
                    onMouseEnter={() => setHoveredProductCategory(item._id)}
                  >
                    <MoveRight
                      className={`w-5 h-5 ${
                        hoveredProductCategory === item._id ? "block" : "hidden"
                      }`}
                    />
                    <p
                      className={`text-[16px] leading-[24px] font-semibold transition-transform duration-500 ${
                        hoveredProductCategory === item._id
                          ? "translate-x-1"
                          : "translate-x-0"
                      }`}
                    >
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div> */}
            <FilterActiveComponent
              items={product_categories}
              headingTitle="Category"
              hoveredItem={hoveredProductCategory}
              setHoveredItem={setHoveredProductCategory}
              selectedItem={selectedCategory}
              setSelectedItem={setSelectedCategory}
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
              headingTitile={"Gender"}
              items={genderCategory}
              hoveredItem={hoveredGenderCategory}
              setHoveredItem={setHoveredGenderCategory}
              selectedItems={currentGenderCategory}
              setSelectedItems={setCurrentGenderCategory}
            />
            {/* <FilterCategory
              headingTitile={"Size"}
              items={sizeCategory}
              hoveredItem={hoveredSizeCategory}
              setHoveredItem={setHoveredSizeCategory}
              selectedItems={currentSizeCategory}
              setSelectedItems={setCurrentSizeCategory}
            /> */}
            <PriceRangeSlider headingTitle="Price" min={0} max={500} />
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
            <RatingFilter
              headingTitle="Rating"
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              groupName="rating"
            />
            <div className="border-gray-200 border bg-white rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">
                  Related Products
                </p>
                {/* <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" /> */}
              </div>
              <div className="flex flex-col gap-2 w-full">
                {allProducts.slice(0, 5).map((product) => {
                  const imageSrc =
                    product.variants?.[0]?.images?.[0] ||
                    product.images?.[0] ||
                    "/placeholder.png";

                  const price =
                    product.variants?.[0]?.ageGroups?.[0]?.price || "—";

                  return (
                    <div
                      className="flex gap-5 w-full items-center cursor-pointer"
                      key={product._id}
                    >
                      <div className="w-40 bg-[#f9f9f9] rounded-md flex justify-center items-center">
                        <img
                          src={imageSrc}
                          alt={product.name}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <div className="w-full flex flex-col">
                        <p className="text-sm text-gray-500">
                          {product.product_type || product.brand || "General"}
                        </p>
                        <p className="text-black text-[16px] leading-[24px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
                          {product.name}
                        </p>
                        <p className="text-pink-600 text-[16px] leading-[24px] font-semibold">
                          ₹ {price}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
              items={product_categories}
              headingTitle="Category"
              hoveredItem={hoveredProductCategory}
              setHoveredItem={setHoveredProductCategory}
              selectedItem={selectedCategory}
              setSelectedItem={setSelectedCategory}
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
              headingTitile={"Gender"}
              items={genderCategory}
              hoveredItem={hoveredGenderCategory}
              setHoveredItem={setHoveredGenderCategory}
              selectedItems={currentGenderCategory}
              setSelectedItems={setCurrentGenderCategory}
            />
            {/* <FilterCategory
              headingTitile={"Size"}
              items={sizeCategory}
              hoveredItem={hoveredSizeCategory}
              setHoveredItem={setHoveredSizeCategory}
              selectedItems={currentSizeCategory}
              setSelectedItems={setCurrentSizeCategory}
            /> */}
            <PriceRangeSlider headingTitle="Price" min={0} max={500} />
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
            <RatingFilter
              headingTitle="Rating"
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              groupName="rating-mobile"
            />
          </div>
          <div className="lg:w-4/5 w-full flex flex-col gap-5">
            <div className="flex justify-between w-full items-center bg-white rounded-xl p-4">
              <p className="text-[#69778a] text-[18px] leading-[24px] font-semibold lg:block hidden">
                Showing all {allProducts.length} result
                {allProducts.length !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-5 items-center">
                <div>
                  <p
                    onClick={clearAllFilters}
                    className="text-[18px] leading-[27px] text-black font-semibold transition-colors duration-300 hover:text-[#00bbae] cursor-pointer"
                  >
                    Clear All Filters
                  </p>
                </div>
                {/* <div className="flex w-60 justify-between items-center border border-[#69778a] rounded-md p-2">
                  <p className="text-[#69778a] text-[16px] leading-[24px] font-semibold">
                    Default Sorting
                  </p>
                  <ChevronDown className="w-5 h-5 text-black" />
                </div> */}
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
              {allProducts?.map((product, index) => {
                return (
                  <Link
                    to={`/product-details/${product.url}`}
                    key={index}
                    onMouseEnter={() => setProductHoverd(product._id)}
                    onMouseLeave={() => setProductHoverd(null)}
                    className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group"
                  >
                    {/* ✅ image + hover overlay */}
                    <div className="w-full bg-[#f9f9f9] rounded-md relative h-52">
                      {product.status === "Out of Stock" && (
                        <p className="absolute top-0 -left-3 bg-red-400 ribbon pl-2 pr-5 text-white">
                          Sold Out
                        </p>
                      )}
                      <img
                        src={product.variants?.[0]?.images?.[0]}
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

                    {/* ✅ product details */}
                    <div className="flex flex-col gap-2 w-full px-2">
                      <div className="flex gap-2 items-center">
                        <div className="flex items-center">
                          {Array.from({
                            length: Math.floor(product.rating || 0),
                          }).map((_, i) => (
                            <Star
                              key={`filled-${i}`}
                              className="w-3 h-3 text-yellow-500"
                              fill="#f88e0f"
                            />
                          ))}
                          {Array.from({
                            length: 5 - Math.floor(product.rating || 0),
                          }).map((_, i) => (
                            <Star
                              key={`empty-${i}`}
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
                            {product.variants?.[0]?.ageGroups?.[0]?.price ||
                              product.price}
                          </p>
                          {product.variants?.[0]?.ageGroups?.[0]?.cutPrice && (
                            <>
                              <p className="text-gray-500 text-[14px] leading-[30px] line-through font-semibold">
                                ₹ {product.variants[0].ageGroups[0].cutPrice}
                              </p>
                              <p className="text-red-600 text-[18px] leading-[30px] font-semibold">
                                {product.variants[0].ageGroups[0].discount}% OFF
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

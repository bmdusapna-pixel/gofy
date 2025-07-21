import React, { useContext, useState } from "react";
import { ChevronDown, Heart, Menu, MoveRight, Star, ShoppingBag, Eye, RefreshCcw } from "lucide-react";
import product_list from "../assets/product-list";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const product_categories = [
  { _id: 1, name: "Dolls" },
  { _id: 2, name: "Educational Toy" },
  { _id: 3, name: "Games and puzzle" },
  { _id: 4, name: "Indoor Play" },
  { _id: 5, name: "Kids Books" },
  { _id: 6, name: "Outdoor Toy" },
  { _id: 7, name: "Rockers & Rides" },
  { _id: 8, name: "Toy Figures" },
  { _id: 9, name: "Uncategorized" },
  { _id: 10, name: "Vehicles Toys" }
];

const Products = () => {
  const [hoveredProductCategory, setHoveredProductCategory] = useState(null);
  const [productHovered, setProductHoverd] = useState(null);
  const { addToCart } = useContext(CartContext);

  const addProductToCart = (product, event) => {
    event.stopPropagation();
    event.preventDefault();
    addToCart(product);
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full lg:px-12 px-5 mx-auto py-10">
        <div className="flex gap-5 w-full">
          <div className="lg:w-1/4 lg:flex hidden flex-col gap-5">
            <div onMouseLeave={() => setHoveredProductCategory(null)} className="border-gray-200 border-[2px] bg-white rounded-2xl p-6 flex flex-col gap-8">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">Product Categories</p>
                <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {
                  product_categories.map((item) => (
                    <div className="flex w-full items-center cursor-pointer text-[#69778a] hover:text-[#00bbae] transition-colors duration-300" key={item._id} onMouseEnter={()=>setHoveredProductCategory(item._id)}>
                      <MoveRight className={`w-5 h-5 ${hoveredProductCategory === item._id ? "block" : "hidden"}`} />
                      <p className={`text-[16px] leading-[24px] font-semibold transition-transform duration-500 ${hoveredProductCategory === item._id ? "translate-x-1" : "translate-x-0"}`}>{item.name}</p>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className="border-gray-200 border-[2px] bg-white rounded-2xl p-6 flex flex-col gap-8">
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[27px] font-semibold text-black">Popular Products</p>
                <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                {
                  product_list.slice(0, 5).map((product) => (
                    <div className="flex gap-5 w-full items-center cursor-pointer" key={product._id}>
                      <div className="w-40 bg-[#f9f9f9] rounded-md">
                        <img src={product.images[0]} alt={product.name} className="w-20 object-cover"/>
                      </div>
                      <div className="w-full flex flex-col">
                        <p className="text-sm text-gray-500">{product.product_type}</p>
                        <p className="text-black text-[16px] leading-[24px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">{product.name}</p>
                        <p className="text-[#00bbae] text-[16px] leading-[24px] font-semibold">${product.price}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
          <div className="lg:w-4/5 w-full flex flex-col gap-5">
            <div className="flex justify-between w-full items-center bg-white rounded-xl p-4">
              <p className="text-[#69778a] text-[18px] leading-[24px] font-semibold lg:block hidden">Showing all 8 result</p>
              <div className="flex gap-5 items-center">
                <div className="flex w-60 justify-between items-center border border-[#69778a] rounded-md p-2">
                  <p className="text-[#69778a] text-[16px] leading-[24px] font-semibold">Default Sorting</p>
                  <ChevronDown className="w-5 h-5 text-black" />
                </div>
                <div className="w-10 flex items-center justify-center h-10 border border-[#69778a] p-1 rounded-md">
                  <Menu className="w-6 h-6 text-[#69778a]" />
                </div>
              </div>
            </div>
            <div className="w-full grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-3">
              {
                product_list.map((product) => (
                  <Link to={`/product-details/${product.url}`} key={product._id} onMouseEnter={()=>setProductHoverd(product._id)} onMouseLeave={()=>setProductHoverd(null)} className="w-full cursor-pointer border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-xl bg-white flex flex-col gap-2 lg:gap-3 transition-shadow duration-300 group">
                    <div className="w-full bg-[#f9f9f9] rounded-md relative h-52">
                      <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"/>
                      {
                        productHovered === product._id && (
                          <div className="absolute inset-0 bg-black/10 z-10 rounded-md"></div>
                        )
                      }
                      {
                        productHovered === product._id && (
                          <div className="absolute sm:block hidden bottom-3 left-1/2 -translate-x-1/2 transform transition-all duration-300 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-20">
                            <div className="flex gap-2 items-center">
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white">
                                <Heart className="w-4 h-4" />
                              </div>
                              <div onClick={(event)=>addProductToCart(product, event)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white">
                                <ShoppingBag className="w-4 h-4" />
                              </div>
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white">
                                <Eye className="w-4 h-4" />
                              </div>
                              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white transition-colors hover:bg-[#00bbae] text-black hover:text-white">
                                <RefreshCcw className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div className="flex flex-col gap-2 w-full px-2">
                      <div className="flex gap-2 items-center">
                        <div className="flex gap-2 items-center py-0.5 px-1.5 rounded-bl-lg rounded-tr-lg bg-[#f88e0f]">
                          <Star className="w-3 h-3 text-white" fill="white" />
                          <p className="text-white">({product.rating})</p>
                        </div>
                        <p className="text-sm text-gray-500">{product.review} Review</p>
                      </div>
                      <p className="text-sm text-gray-500">{product.product_type}</p>
                      <div className="flex sm:flex-col flex-row justify-between w-full gap-2">
                        <p className="text-black text-[20px] leading-[30px] transition-colors duration-300 hover:text-[#00bbae] font-semibold">{product.name}</p>
                        <p className="text-[#00bbae] text-[20px] leading-[30px] font-semibold">₹{product.price}</p>
                      </div>
                      <div className="flex sm:hidden gap-2 justify-between items-center">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00bbae] text-white">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div onClick={(event)=>addProductToCart(product, event)} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00bbae] text-white">
                          <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00bbae] text-white">
                          <Eye className="w-5 h-5" />
                        </div>
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00bbae] text-white">
                          <RefreshCcw className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

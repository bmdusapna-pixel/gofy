import React, { useContext } from "react";
import { Trash2 } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

import EmptyCart from "../assets/wishlist.png";

const WishList = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    cartItems,
    openCart,
    setOpenCart,
    totalItems,
    formSubmit,
    favouriteItems,
    addToCart,
    removeFavouriteItemsWishList,
  } = useContext(CartContext);

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full lg:px-12 px-5 mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[650px] w-full flex flex-col gap-2">
              <div className="flex items-center w-full justify-between bg-[#fce7ef] rounded-xl px-0 sm:px-10 py-2">
                <div className="flex-[0.2] text-[#001430] font-bold text-center sm:text-[20px] text-[18px]">
                  Product Image
                </div>
                <div className="flex-[0.3] text-[#001430] font-bold text-center sm:text-[20px] text-[18px]">
                  Product Title
                </div>
                <div className="flex-[0.2] text-[#001430] font-bold text-center sm:text-[20px] text-[18px]">
                  Price
                </div>
                <div className="flex-[0.2] text-[#001430] font-bold text-center sm:text-[20px] text-[18px]">
                  Add To Cart
                </div>
                <div className="flex-[0.1] flex justify-center items-center">
                  <Trash2 className="w-5 h-5 text-black" />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {favouriteItems.length > 0 &&
                  favouriteItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center w-full justify-between bg-white rounded-xl px-0 sm:px-10 py-2"
                    >
                      <div className="flex-[0.2] flex items-center justify-center">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="object-cover w-full rounded-md max-w-[60px] h-20"
                        />
                      </div>
                      <div className="flex-[0.3] text-[#001430] font-semibold text-center text-[16px] sm:text-[18px]">
                        {item.name}
                      </div>
                      <div className="flex-[0.2] text-[#001430] font-semibold text-center text-[16px]">
                        <span className="text-[14px] text-gray-600 line-through">
                          ₹ {item.price - 100}
                        </span>
                        <br />₹ {item.price}
                      </div>
                      <div
                        onClick={() => addToCart(item)}
                        className="flex-[0.2] flex justify-center cursor-pointer"
                      >
                        <p className="rounded-xl text-[16px] sm:text-[18px] font-semibold text-white hover:bg-[#f88e0f] transition-colors duration-300 px-3 h-12 bg-[#00bbae] flex gap-3 items-center justify-center">
                          Add to Cart
                        </p>
                      </div>
                      <div
                        onClick={() => removeFavouriteItemsWishList(item)}
                        className="flex-[0.1] flex justify-center items-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 text-[#00bbae] hover:text-[#f88e0f] transition-colors duration-300" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {favouriteItems.length === 0 && (
            <div className="flex items-center flex-col gap-3 justify-center bg-white rounded-2xl py-4">
              {/* <p className="text-[16px] font-medium text-black leading-[24px]">
                No favourites items present
              </p> */}
              <img src={EmptyCart} alt="" className="w-full" />
              <Link
                to="/"
                className="rounded-xl w-45 text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 py-4 bg-[#00bbae] flex gap-3 items-center justify-center"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishList;

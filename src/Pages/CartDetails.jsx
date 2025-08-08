import React, { useContext, useState } from "react";
import { ChevronRight, Info, Loader, Minus, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

import EmptyCart from "../assets/emptyCart.png";
import RelatedItems from "../Components/RelatedItems";

const CartDetails = () => {
  const {
    openCart,
    setOpenCart,
    totalItems,
    cartItems,
    formSubmit,
    increaseQuantityFromCart,
    decreaseQuantityFromCart,
    totalPrice,
    removeProductFromCart,
  } = useContext(CartContext);
  const [couponCode, setCouponeCode] = useState("");
  const [itemOpenInMobile, setItemOpenInMobile] = useState(null);

  const openItem = (item) => {
    if (item._id === itemOpenInMobile) {
      setItemOpenInMobile(null);
    } else {
      setItemOpenInMobile(item._id);
    }
  };

  const submitFormCoupon = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full lg:px-12 px-5 mx-auto flex lg:flex-row flex-col gap-5">
        <div className="w-full lg:w-4/6 flex flex-col gap-5 bg-white rounded-2xl p-5 md:p-10 h-full">
          {cartItems.length > 0 ? (
            <div className="flex flex-col w-full h-full">
              <div className="flex w-full items-center justify-between bg-[#f8f9fa] rounded-tl-2xl rounded-tr-2xl px-8 py-3">
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold text-center hidden md:block w-[60px]">
                  Remove
                </p>
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold text-center hidden md:block w-[100px]">
                  Product Image
                </p>
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold text-center w-[180px]">
                  Product Title
                </p>
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold text-center w-[80px]">
                  Price
                </p>
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold text-center hidden sm:block w-[120px]">
                  Quantity
                </p>
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold text-center hidden sm:block w-[80px]">
                  Total
                </p>
              </div>
              {cartItems.map((item, index) => (
                <div
                  key={item._id}
                  className={`flex w-full items-center justify-between relative bg-[#edfbfa] ${
                    index === cartItems.length - 1
                      ? "rounded-bl-2xl rounded-br-2xl"
                      : "border-b-[1px]"
                  } px-8 py-3`}
                >
                  <div
                    onClick={() => removeProductFromCart(item)}
                    className="hidden md:flex items-center justify-center w-[60px] h-[32px] cursor-pointer"
                  >
                    <div className="bg-[#aa0000] rounded-full w-6 h-6 flex items-center justify-center">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-[100px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full rounded-md"
                    />
                  </div>
                  <p className="text-[16px] leading-[24px] text-[#001430] font-semibold w-[180px] text-center truncate">
                    {item.name}
                  </p>
                  <p className="text-[16px] leading-[24px] text-[#001430] font-medium w-[80px] text-center">
                    ₹ {item.price}
                  </p>
                  <div className="hidden sm:flex items-center justify-center gap-1 px-2 border border-gray-200 rounded-md w-[120px]">
                    <div
                      onClick={() => decreaseQuantityFromCart(item)}
                      className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    >
                      <Minus className="w-4 h-4 text-[#00bbae]" />
                    </div>
                    <p className="text-[16px] leading-[24px] font-semibold text-[#001430] w-full text-center">
                      {item.quantity}
                    </p>
                    <div
                      onClick={() => increaseQuantityFromCart(item)}
                      className="w-6 h-6 flex items-center justify-center cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-[#00bbae]" />
                    </div>
                  </div>
                  <p className="hidden sm:block text-[16px] leading-[24px] text-[#001430] font-semibold w-[80px] text-center">
                    ₹ {item.price * item.quantity}
                  </p>
                  <ChevronRight
                    className={`absolute sm:hidden block right-2 w-5 h-5 cursor-pointer text-black transform transition-transform duration-300 ${
                      itemOpenInMobile === item._id ? "rotate-90" : ""
                    }`}
                    onClick={() => openItem(item)}
                  />
                  <AnimatePresence>
                    {itemOpenInMobile === item._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="sm:hidden absolute top-full left-0 bg-[white] w-full z-40 shadow-md px-8 py-3"
                      >
                        <div className="flex flex-col gap-3 w-full">
                          <div className="flex justify-between items-center">
                            <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                              Total
                            </p>
                            <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                              ₹ {item.price * item.quantity}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                              Quantity
                            </p>
                            <div className="flex items-center gap-1 px-2 border border-gray-200 rounded-md w-[120px]">
                              <div
                                onClick={() => decreaseQuantityFromCart(item)}
                                className="w-6 h-6 flex items-center justify-center cursor-pointer"
                              >
                                <Minus className="w-4 h-4 text-[#00bbae]" />
                              </div>
                              <p className="text-[16px] leading-[24px] font-semibold text-[#001430] w-full text-center">
                                {item.quantity}
                              </p>
                              <div
                                onClick={() => increaseQuantityFromCart(item)}
                                className="w-6 h-6 flex items-center justify-center cursor-pointer"
                              >
                                <Plus className="w-4 h-4 text-[#00bbae]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col w-full gap-5 items-center justify-center h-full">
              {/* <div className="border border-[#00bbae] p-4 rounded-xl flex gap-2 items-center w-full bg-[#edfbfa]">
                <div className="w-6 h-6 rounded-full bg-[#00bbae] flex items-center justify-center">
                  <Info className="w-4 h-4 text-white" />
                </div>
                <p className="text-[14px] text-[#2f2f2f] leading-[21px] font-normal">
                  Your cart is currently empty
                </p>
              </div> */}
              <img src={EmptyCart} alt="" />
              <Link
                to="/"
                className="rounded-xl w-40 text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 py-4 bg-[#00bbae] flex gap-3 items-center justify-center"
              >
                Shop Now
              </Link>
            </div>
          )}
        </div>
        <div className="w-full lg:w-2/6 flex flex-col gap-5">
          <div className="w-full md:p-10 p-5 flex flex-col gap-3 bg-white rounded-2xl">
            <p className="text-[28px] leading-[42px] font-semibold text-black">
              Cart totals
            </p>
            <div className="w-full flex-col gap-3 flex">
              <div className="flex justify-between items-center w-full">
                <p className="text-[18px] leading-[27px] font-medium text-[#69778a]">
                  Subtotal
                </p>
                <p className="text-[18px] leading-[27px] font-medium text-[#212121]">
                  ₹ {totalPrice}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-[20px] leading-[30px] font-semibold text-black">
                  Total
                </p>
                <p className="text-[20px] leading-[30px] font-semibold text-black">
                  ₹ {totalPrice}
                </p>
              </div>
              {totalPrice > 0 && totalPrice < 500 && (
                <p className="text-[18px] leading-[21px] font-normal text-[#7ba856]">
                  Free shipping on orders over ₹500
                </p>
              )}
            </div>
          </div>
          <div className="w-full md:p-10 p-5 flex flex-col gap-5 bg-white rounded-2xl">
            <p className="text-[28px] leading-[42px] font-semibold text-black">
              Apply coupon
            </p>
            <form
              onSubmit={submitFormCoupon}
              className="w-full flex-col gap-3 flex"
            >
              <input
                required
                name="couponCode"
                onChange={(event) => setCouponeCode(event.target.value)}
                type="text"
                className="w-full rounded-2xl border border-gray-200 p-3 focus:outline-none focus:border-[#00bbae] transition duration-300"
                placeholder="Coupon Code"
              />
              <button
                type="submit"
                className="rounded-xl w-full text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 h-12 bg-[#00bbae] flex gap-3 items-center justify-center"
              >
                {formSubmit ? (
                  <Loader className="w-6 h-6 text-white animate-spin" />
                ) : (
                  "Apply coupon"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full lg:px-12 px-5 mx-auto flex lg:flex-row flex-col gap-5">
        <RelatedItems
          heading={
            cartItems.length > 0 ? "Related Products" : "Specily for You"
          }
        />
      </div>
    </div>
  );
};

export default CartDetails;

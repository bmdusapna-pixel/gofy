import React, { useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Minus, Plus, X, Copy, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const coupon_data = [
  {
    _id: 1,
    description: "Flat 10% Off on Orders Above ₹1999/-",
    code: "FLAT10",
  },
];

const Cart = () => {
  const navigate = useNavigate();
  const {
    openCart,
    setOpenCart,
    totalItems,
    cartItems,
    removeProductFromCart,
    increaseQuantityFromCart,
    decreaseQuantityFromCart,
    totalMrp,
    emptyCart,
    totalProductDiscount,
    totalCouponDiscount,
    payableAmount,
    applicableCoupons,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
  } = useContext(CartContext);
  const [copiedCode, setCopiedCode] = useState(null);
  const [couponInput, setCouponInput] = useState("");
  console.log("mrp",totalMrp)

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code); // Set the code that was just copied
      setTimeout(() => setCopiedCode(null), 2000); // Clear "Copied!" message after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Fallback for older browsers or if permission is denied
      alert(`Failed to copy "${code}". Please copy manually.`);
    }
  };

  const navigateToCart = () => {
    setOpenCart(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/cart");
  };

  const navigateToCheckout = () => {
    setOpenCart(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/checkout");
  };

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      alert("Please enter a coupon code");
      return;
    }
    // Find coupon by code
    const coupon = applicableCoupons.find(
      (c) => c.code.toLowerCase() === couponInput.trim().toLowerCase()
    );
    if (coupon) {
      applyCoupon(coupon);
      setCouponInput("");
    } else {
      alert("Invalid coupon code. Please check and try again.");
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
  };

  return (
    <div
      className={`fixed right-0 top-0 w-[80%] sm:w-[450px] bg-white lg:w-96 h-full sm:h-screen z-50 transition-transform duration-300 ${
        openCart ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-between w-full items-center p-4">
          <div className="flex gap-3 items-center">
            <div className="w-7 h-7 p-1 rounded-full bg-[#00bbae] flex items-center justify-center">
              <p className="text-white text-[13px] leading-[13px] font-semibold">
                {totalItems}
              </p>
            </div>
            <p className="text-[#001430] text-[18px] leading-[36px] font-bold">
              Shopping Cart
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <p
              onClick={emptyCart}
              className="text-[14px] leading-[20px] cursor-pointer font-medium text-gray-600 transition-colors duration-300 hover:text-[#00bbae]"
            >
              Clear All
            </p>
            <div
              onClick={() => setOpenCart(false)}
              className="w-8 h-8 cursor-pointer flex items-center justify-center p-1 rounded-md border border-gray-400 bg-gray-200 transition-colors duration-300 text-black hover:text-white hover:bg-[#00bbae]"
            >
              <X className="w-6 h-6" />
            </div>
          </div>
        </div>
        <hr className="w-full h-[1px] bg-gray-300 border-none" />
        <div className="w-full p-5">
          <div className="flex flex-col gap-3 w-full h-[300px] overflow-y-auto hide-scrollbar">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div className="flex gap-5 w-full" key={item._id}>
                  <div className="w-32 border border-gray-200 rounded-2xl p-2">
                    <div className="w-full h-full bg-gray-200 rounded-2xl p-1">
                      <img
                        src={item.image}
                        alt=""
                        className="w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between w-full">
                      <p className="text-[16px] w-full leading-[24px] text-[#001430] transition-colors duration-300 hover:text-[#00bbae] font-semibold">
                        {item.name}
                      </p>
                      <X
                        onClick={() => removeProductFromCart(item)}
                        className="w-6 h-6 cursor-pointer text-gray-600 transition-colors duration-300 hover:text-[#00bbae]"
                      />
                    </div>
                    <div className="flex justify-between gap-5 w-full items-center">
                      <div className="flex items-center justify-between w-20 p-1 bg-gray-200 rounded-full">
                        <div
                          onClick={() => decreaseQuantityFromCart(item)}
                          className="w-6 h-6 cursor-pointer text-black transition-colors duration-300 hover:text-white hover:bg-[#00bbae] rounded-full border border-gray-400 bg-white flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </div>
                        <p className="text-[18px] leading-[27px] text-black font-medium">
                          {item.quantity}
                        </p>
                        <div
                          onClick={() => {
                            const availableStock = item.stock ?? 0;
                            if (item.quantity < availableStock) {
                              increaseQuantityFromCart(item);
                            }
                          }}
                          className={`w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center transition-colors duration-300 ${
                            (item.stock ?? 0) > item.quantity
                              ? "cursor-pointer text-black hover:text-white hover:bg-[#00bbae] bg-white"
                              : "cursor-not-allowed text-gray-400 bg-gray-100 opacity-50"
                          }`}
                          title={
                            (item.stock ?? 0) <= item.quantity
                              ? `Only ${item.stock ?? 0} items available in stock`
                              : "Increase quantity"
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </div>
                      </div>
                      <p className="text-[18px] leading-[27px] text-pink-600 font-semibold">
                        ₹ {item.price}{" "}
                        <span className="text-[14px] line-through text-gray-500">
                          ₹ {item.cutPrice}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-5 text-center text-gray-500 font-semibold">
                Your cart is empty.
              </div>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full z-10 bg-white">
          <hr className="w-full h-[1px] bg-gray-300 border-none" />
          <div className="flex flex-col gap-3 w-full p-6">
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-semibold text-green-800">
                      {appliedCoupon.code} Applied
                    </p>
                    <p className="text-xs text-green-600">
                      {appliedCoupon.discountType === "PERCENTAGE"
                        ? `${appliedCoupon.discountValue}% off`
                        : `₹${appliedCoupon.discountValue} off`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-red-600 hover:text-red-800 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-2 w-full items-center">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleApplyCoupon()}
                    className="w-full border border-gray-200 outline-none rounded-xl px-3 py-2 text-black"
                    placeholder="Enter coupon code"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="rounded-xl w-28 text-[16px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 py-2 bg-[#00bbae] flex gap-3 items-center justify-center"
                  >
                    Apply
                  </button>
                </div>
                {applicableCoupons.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-gray-700">
                      Available Coupons:
                    </p>
                    <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
                      {applicableCoupons.map((coupon) => (
                        <div
                          key={coupon._id}
                          className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-green-600" />
                            <div>
                              <p className="text-sm font-semibold text-gray-800">
                                {coupon.code}
                              </p>
                              <p className="text-xs text-gray-600">
                                {coupon.title}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              applyCoupon(coupon);
                              setCouponInput("");
                            }}
                            className="text-sm font-semibold text-[#00bbae] hover:text-[#f88e0f]"
                          >
                            Apply
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="w-full flex-col gap-3 flex overflow-y-auto max-h-[100px]">
              {/* Total MRP */}
              <div className="flex justify-between items-center w-full">
                <p className="text-[18px] leading-[25px] text-[#212121] font-semibold">
                  Total MRP
                </p>
                <p className="text-[16px] leading-[24px] text-[#212121]">
                  ₹ {totalMrp}
                </p>
              </div>

              {/* Discount on MRP (static) */}
              <div className="flex justify-between items-center w-full">
                <p className="text-[18px] leading-[25px] text-[#212121] font-semibold">
                  Discount on MRP
                </p>
                <p className="text-[16px] leading-[24px] text-[#d9534f]">
                  - ₹ {totalProductDiscount}
                </p>
              </div>
              <div className="flex justify-between items-center w-full">
                <p className="text-[18px] leading-[25px] text-[#212121] font-semibold">
                  Coupon Discount
                </p>
                <p className="text-[16px] leading-[24px] text-[#d9534f]">
                  - ₹ {totalCouponDiscount + couponDiscount}
                </p>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center w-full">
                <p className="text-[18px] leading-[25px] text-black font-semibold">
                  Total Amount
                </p>
                <p className="text-[18px] leading-[27px] text-black font-semibold">
                  ₹ {payableAmount}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={navigateToCart}
              className="rounded-xl w-full text-[18px] border border-gray-200 leading-[24px] font-semibold text-black hover:text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 py-3 bg-white flex gap-3 items-center justify-center"
            >
              View Cart
            </button>
            <button
              type="button"
              onClick={navigateToCheckout}
              className="rounded-xl w-full text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 py-3 bg-[#00bbae] flex gap-3 items-center justify-center"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

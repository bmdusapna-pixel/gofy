import React, { useContext, useState } from "react";
import {
  Info,
  Loader,
  Minus,
  Plus,
  X,
  Copy,
  Tag,
  Pin,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

import EmptyCart from "../assets/emptyCart.png";
import RelatedItems from "../Components/RelatedItems";

const coupon_data = [
  {
    _id: 1,
    description: "Flat 10% Off on Orders Above ₹1999/-",
    code: "FLAT10",
  },
];

const CartDetails = () => {
  const {
    cartItems,
    formSubmit,
    increaseQuantityFromCart,
    decreaseQuantityFromCart,
    totalPrice,
    removeProductFromCart,
    // NEW from context
    savedForLaterItems,
    saveForLater,
    moveToCartFromSaved,
    removeSavedForLaterItem,
  } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert(`Failed to copy "${code}". Please copy manually.`);
    }
  };

  const submitFormCoupon = (event) => {
    event.preventDefault();
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="w-full min-h-screen py-10 bg-gray-50">
      <div className="container mx-auto">
        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Cart Items Section */}
          <div className={`${isCartEmpty ? "w-full" : "w-full lg:w-3/5"}`}>
            <div className="bg-white rounded-3xl p-6 md:p-8">
              <h2 className="text-[25px] leading-[42px] font-semibold text-black mb-4">
                Shopping Cart
              </h2>
              {isCartEmpty ? (
                <div className="flex flex-col items-center justify-center text-center">
                  <img
                    src={EmptyCart}
                    alt="Empty Cart"
                    className="w-full max-h-[500px] object-contain"
                  />
                  <p className="text-xl text-gray-600 font-medium mb-4">
                    Your cart is currently empty.
                  </p>
                  <Link
                    to="/"
                    className="rounded-full px-8 py-3 text-lg font-semibold text-white bg-[#00bbae] transition-colors duration-300 hover:bg-[#f88e0f] shadow-md"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 p-4 md:p-6 bg-gray-100 rounded-2xl relative transition-shadow"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product/${item._id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col gap-2 w-full sm:w-auto text-center sm:text-left">
                        <div>
                          <Link to={`/product/${item._id}`}>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2 leading-tight">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Product ID: #{item._id}
                          </p>
                        </div>

                        {/* Prices & Quantity */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
                          {/* Price */}
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-pink-600">
                              ₹ {item.price * item.quantity}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ₹ {item.price}
                            </span>
                            <span className="text-red-600">30% Off</span>
                          </div>

                          {/* Quantity Control */}
                          <div className="flex items-center gap-2 p-1 border border-gray-300 rounded-full bg-white">
                            <button
                              onClick={() => decreaseQuantityFromCart(item)}
                              className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-lg font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantityFromCart(item)}
                              className="p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        {/* Save for later button */}
                        <button
                          onClick={() => saveForLater(item)}
                          className="p-2 text-gray-400 rounded-full hover:bg-gray-200 hover:text-blue-500 transition-colors"
                          aria-label="Save for later"
                          title="Save for Later"
                        >
                          <Pin className="w-5 h-5" />
                        </button>
                        {/* Remove button */}
                        <button
                          onClick={() => removeProductFromCart(item)}
                          className="p-2 text-gray-400 rounded-full hover:bg-gray-200 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                          title="Remove from Cart"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end gap-4 items-center mt-6">
                    <div className="flex items-center gap-2">
                      Missed Something? <ArrowRight className="w-4 h-4" />
                    </div>
                    <Link
                      to="/products"
                      className="flex items-center gap-2 text-sm font-semibold text-[#00bbae] transition-colors duration-300 hover:text-[#f88e0f] px-4 py-2 border border-gray-300 rounded-full shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      Add More Items
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* --- Saved for Later Section --- */}
            {savedForLaterItems.length > 0 && (
              <div className="mt-8 bg-white rounded-3xl p-6 md:p-8">
                <h2 className="text-[25px] leading-[42px] font-semibold text-black mb-4">
                  Saved for Later ({savedForLaterItems.length})
                </h2>
                <div className="flex flex-col gap-6">
                  {savedForLaterItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center sm:items-stretch gap-4 p-4 md:p-6 bg-gray-100 rounded-2xl relative transition-shadow"
                    >
                      {/* Product Image */}
                      <Link
                        to={`/product/${item._id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col gap-2 w-full sm:w-auto text-center sm:text-left">
                        <div>
                          <Link to={`/product/${item._id}`}>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 line-clamp-2 leading-tight">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mt-1">
                            Product ID: #{item._id}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-pink-600">
                            ₹ {item.price}
                          </span>
                          <span className="text-sm font-bold text-gray-500 line-through">
                            ₹ {item.price - 100}
                          </span>
                          <span className="text-red-600">30% Off</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button
                          onClick={() => moveToCartFromSaved(item)}
                          className="p-2 text-gray-400 rounded-full hover:bg-gray-200 hover:text-green-600 transition-colors"
                          aria-label="Move to cart"
                          title="Move to Cart"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => removeSavedForLaterItem(item)}
                          className="p-2 text-gray-400 rounded-full hover:bg-gray-200 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                          title="Remove from Saved"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          {!isCartEmpty && (
            <div className="w-full lg:w-2/5 flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-6 md:p-8">
                <h2 className="text-[25px] leading-[42px] font-semibold text-black mb-4">
                  Order Summary
                </h2>
                {/* Coupon Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Have a coupon?
                  </h3>
                  <form onSubmit={submitFormCoupon} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      name="couponCode"
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00bbae] transition"
                      placeholder="Enter coupon code"
                    />
                    <button
                      type="submit"
                      className="w-auto px-6 py-3 bg-[#00bbae] text-white font-semibold rounded-xl transition-colors duration-300 hover:bg-[#f88e0f]"
                    >
                      {formSubmit ? (
                        <Loader className="w-6 h-6 text-white animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </form>
                  <div className="flex flex-col gap-0 md:max-w-[500px]">
                    {coupon_data.map((coupon) => (
                      <div
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between
                            rounded-lg transition-all duration-200 ease-in-out
                           hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        key={coupon._id}
                      >
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <div className="w-5 h-5 flex-shrink-0 text-green-600">
                            <Tag className="w-full h-full" strokeWidth={2} />
                          </div>
                          <p className="text-base leading-relaxed text-gray-700 font-medium">
                            {coupon.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleCopy(coupon.code)}
                          className="group relative flex items-center justify-center gap-2
                             px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold
                             rounded-full transition-all duration-200 ease-in-out
                             hover:bg-blue-100 hover:shadow-md active:scale-95
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                             min-w-[120px] h-9"
                        >
                          <span
                            className={`transition-opacity duration-200 ${
                              copiedCode === coupon.code
                                ? "opacity-0 absolute"
                                : "opacity-100"
                            }`}
                          >
                            {coupon.code}
                          </span>
                          <span
                            className={`absolute transition-opacity duration-200 flex items-center gap-1
                                    ${
                                      copiedCode === coupon.code
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                          >
                            Copied!{" "}
                            <Copy
                              className="w-4 h-4 text-blue-700"
                              strokeWidth={2}
                            />
                          </span>
                          {!copiedCode && (
                            <Copy
                              className="w-4 h-4 text-blue-700 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                              strokeWidth={2}
                            />
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Price Details */}
                <div className="flex flex-col gap-3 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-base">
                      Total MRP ({cartItems.length} items)
                    </span>
                    <span className="text-base font-medium">
                      ₹ {totalPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base">Discount on MRP</span>
                    <span className="text-base font-medium text-red-500">
                      - ₹ 100
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base">Coupon Discount</span>
                    <span className="text-base font-medium text-red-500">
                      - ₹ 10
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base">Delivery Charges</span>
                    <span className="text-base font-medium text-green-600">
                      {totalPrice >= 500 ? "Free" : "₹ 50"}
                    </span>
                  </div>
                </div>
                <div className="w-full h-px bg-gray-200 my-6"></div>
                {/* Final Total and Checkout Button */}
                <div className="flex justify-between items-center font-bold text-gray-900 mb-6">
                  <span className="text-xl">Total Amount</span>
                  <span className="text-xl">
                    ₹ {totalPrice - 100 - 10 + (totalPrice >= 500 ? 0 : 50)}
                  </span>
                </div>
                <div className="mt-6 w-full text-center bg-[#00bbae] text-white text-lg font-bold rounded-xl transition-colors duration-300 hover:bg-[#f88e0f]">
                  <Link
                    to="/checkout"
                    className="w-full h-full flex justify-center px-6 py-4"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
                {totalPrice > 0 && totalPrice < 500 && (
                  <p className="text-sm font-normal text-green-600 text-center mt-4">
                    Add ₹{500 - totalPrice} more to get free shipping!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- Related Items Section --- */}
        <div className="mt-12">
          <RelatedItems
            heading={
              cartItems.length > 0 ? "You might also like" : "Specially for You"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CartDetails;

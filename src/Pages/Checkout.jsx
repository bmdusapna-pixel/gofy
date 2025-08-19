import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, X } from "lucide-react";
import { CartContext } from "../Context/CartContext";

const Checkout = () => {
  const [openCoupon, setOpenCoupon] = useState(false);
  const {
    openCart,
    setOpenCart,
    totalItems,
    cartItems,
    formSubmit,
    totalPrice,
  } = useContext(CartContext);
  const [couponCode, setCouponeCode] = useState("");
  const [sameAddress, setSameAddress] = useState(false);
  const [useGofyPoints, setUseGofyPoints] = useState(false);

  // Placeholder for user's available points
  const [gofyPoints, setGofyPoints] = useState(500);

  // Calculation for points earned (e.g., 1 point per $1 or a custom rate)
  const pointsToEarn = Math.floor(totalPrice / 100);
  const pointsDiscount = 50; // Example fixed discount for using points

  const [addressDetails, setAddressDetails] = useState({
    name: "",
    phone: "",
    alternatePhone: "",
    email: "",
    houseAndStreet: "",
    apartments: "",
    town: "",
    pinCode: "",
    district: "",
    state: "",
    landmark: "",
    message: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    receiverName: "",
    receiverPhone: "",
    houseAndStreet: "",
    apartments: "",
    town: "",
    pinCode: "",
    district: "",
    state: "",
    landmark: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setAddressDetails((prev) => ({ ...prev, [name]: value }));
    if (sameAddress) {
      setShippingAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const shippingInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSameAddressToggle = () => {
    setSameAddress((prev) => {
      const newValue = !prev;
      if (newValue) {
        setShippingAddress({
          receiverName: addressDetails.name,
          receiverPhone: addressDetails.phone,
          houseAndStreet: addressDetails.houseAndStreet,
          apartments: addressDetails.apartments,
          town: addressDetails.town,
          pinCode: addressDetails.pinCode,
          district: addressDetails.district,
          state: addressDetails.state,
          landmark: addressDetails.landmark,
        });
      } else {
        setShippingAddress({
          receiverName: "",
          receiverPhone: "",
          houseAndStreet: "",
          apartments: "",
          town: "",
          pinCode: "",
          district: "",
          state: "",
          landmark: "",
        });
      }
      return newValue;
    });
  };

  const submitFormCoupon = (event) => {
    event.preventDefault();
    // Logic for applying coupon
    console.log("Applying coupon:", couponCode);
  };

  const placeOrderForm = (event) => {
    event.preventDefault();
    // Logic for placing the order
    console.log(
      "Proceeding to payment with details:",
      addressDetails,
      shippingAddress
    );
  };

  const discountedPrice = useGofyPoints
    ? totalPrice - pointsDiscount
    : totalPrice;

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full lg:px-12 px-5 mx-auto flex lg:flex-row flex-col gap-5">
        <div className="w-full lg:w-4/6 flex flex-col gap-5 h-full">
          <div className="w-full relative flex flex-col gap-5">
            <div
              className="border cursor-pointer border-[#00bbae] p-4 rounded-xl flex md:flex-row flex-col gap-1 items-center w-full bg-[#edfbfa]"
              onClick={() => setOpenCoupon(!openCoupon)}
            >
              <p className="text-[16px] leading-[24px] text-[#2f2f2f] font-medium">
                Have a coupon?
              </p>
              <p className="text-[16px] leading-[24px] text-[#00bbae] transition-colors duration-300 hover:text-[#F88E0F] font-medium">
                Click here to enter your code
              </p>
            </div>
            <AnimatePresence>
              {openCoupon && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full bg-white rounded-2xl overflow-hidden"
                >
                  <div className="md:p-10 p-5 flex flex-col gap-5">
                    <p className="text-[16px] leading-[24px] font-semibold text-black">
                      If you have a coupon code, please apply it below.
                    </p>
                    <form
                      onSubmit={submitFormCoupon}
                      className="w-full sm:w-[50%] items-center gap-3 flex sm:flex-row flex-col"
                    >
                      <input
                        required
                        name="couponCode"
                        onChange={(event) => setCouponeCode(event.target.value)}
                        value={couponCode}
                        type="text"
                        className="transition-colors duration-300 w-full text-[18px] leading-[27px] rounded-2xl border border-gray-200 p-3 focus:outline-none focus:border-[#00bbae]"
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <form
            onSubmit={placeOrderForm}
            className="flex flex-col gap-5 w-full"
          >
            <div className="bg-white flex flex-col gap-5 rounded-2xl p-5 md:p-10">
              <p className="text-[28px] leading-[42px] font-semibold text-black">
                Billing Details
              </p>
              <div className="w-full flex flex-col gap-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    required
                    name="name"
                    value={addressDetails.name}
                    onChange={inputChangeHandler}
                    type="text"
                    placeholder="Full Name"
                    className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  />
                  <input
                    required
                    name="email"
                    value={addressDetails.email}
                    onChange={inputChangeHandler}
                    type="email"
                    placeholder="Email"
                    className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  />
                  <input
                    required
                    name="phone"
                    value={addressDetails.phone}
                    onChange={inputChangeHandler}
                    type="tel"
                    placeholder="Phone"
                    className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  />
                  <input
                    name="alternatePhone"
                    value={addressDetails.alternatePhone}
                    onChange={inputChangeHandler}
                    type="tel"
                    placeholder="Alternate Phone (optional)"
                    className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-[18px] leading-[24px] font-semibold text-black">
                    Billing Address
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      required
                      name="houseAndStreet"
                      value={addressDetails.houseAndStreet}
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="House number and street name"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      name="apartments"
                      value={addressDetails.apartments}
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="Apartments, suits, unit, etc. (optional)"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="town"
                      value={addressDetails.town}
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="Town / City"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="pinCode"
                      value={addressDetails.pinCode}
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="Zip / Postal Code"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="district"
                      value={addressDetails.district}
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="District"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="state"
                      value={addressDetails.state}
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="State"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      name="landmark"
                      value={addressDetails.landmark}
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="Landmark (e.g. near ABC hospital)"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex sm:flex-row flex-col gap-2 sm:gap-5 w-full sm:items-center">
                    <p className="text-[18px] leading-[24px] font-semibold text-black">
                      Shipping Address
                    </p>
                    <div className="flex gap-2 items-center">
                      <input
                        type="checkbox"
                        checked={sameAddress}
                        onChange={handleSameAddressToggle}
                        className="border border-gray-200 rounded-md cursor-pointer w-4 h-4"
                      />
                      <p className="text-[14px] leading-[18px] font-medium text-gray-600">
                        Same as Billing Address
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      required
                      name="receiverName"
                      value={shippingAddress.receiverName}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="Receiver's Full Name"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="receiverPhone"
                      value={shippingAddress.receiverPhone}
                      onChange={shippingInputChangeHandler}
                      type="tel"
                      placeholder="Receiver's Phone Number"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="houseAndStreet"
                      value={shippingAddress.houseAndStreet}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="House number and street name"
                      className="transition-colors duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      name="apartments"
                      value={shippingAddress.apartments}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="Apartments, suits, unit, etc. (optional)"
                      className="transition-colors duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="town"
                      value={shippingAddress.town}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="Town / City"
                      className="transition-colors duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="pinCode"
                      value={shippingAddress.pinCode}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="Zip / Postal Code"
                      className="transition-colors duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="district"
                      value={shippingAddress.district}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="District"
                      className="transition-colors duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="state"
                      value={shippingAddress.state}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="State"
                      className="transition-colors duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      name="landmark"
                      value={shippingAddress.landmark}
                      onChange={shippingInputChangeHandler}
                      type="text"
                      placeholder="Landmark (e.g. near ABC hospital)"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white flex flex-col gap-5 rounded-2xl p-5 md:p-10">
              <p className="text-[28px] leading-[42px] font-semibold text-black">
                Additional information
              </p>
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[14px] leading-[20px] text-[#2f2f2f] font-semibold">
                  Order notes (optional)
                </p>
                <textarea
                  rows="4"
                  className="transition-colors duration-300 w-full border border-gray-200 focus:border-[#00bbae] outline-none p-4 rounded-md"
                  name="message"
                  onChange={inputChangeHandler}
                  value={addressDetails.message}
                  id=""
                ></textarea>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-2/6 flex flex-col gap-5">
          <div className="w-full md:p-10 p-5 flex flex-col gap-3 bg-white rounded-2xl">
            <p className="text-[28px] leading-[42px] font-semibold text-black">
              Your order
            </p>
            <div className="border-[1px] rounded-md border-gray-200">
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                  Product
                </p>
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold ">
                  Subtotal
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                {cartItems &&
                  cartItems.length > 0 &&
                  cartItems.map((item) => (
                    <div
                      className="flex gap-3 w-full px-3 justify-between"
                      key={item._id}
                    >
                      <div className="flex flex-col gap-1">
                        <p className="text-[16px] leading-[24px] text-[#001430]">
                          {item.name}
                        </p>
                        <div className="flex gap-1 items-center">
                          <X className="w-4 h-4 text-[#001430]" />
                          <p className="text-[16px] leading-[24px] text-[#001430]">
                            {item?.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="text-[16px] leading-[24px]  text-[#001430]">
                        ₹ {item.price}
                      </p>
                    </div>
                  ))}
              </div>
              <div className="w-full h-[1px] bg-gray-200 border-none"></div>
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[18px] leading-[27px] text-[#001430] font-semibold ">
                  Subtotal
                </p>
                <p className="text-[18px] leading-[27px] text-[#001430] font-semibold ">
                  ₹ {totalPrice}
                </p>
              </div>
              {/* Added Gofy Points row */}
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[18px] leading-[27px] text-[#00bbae] font-semibold ">
                  You will earn
                </p>
                <p className="text-[18px] leading-[27px] text-[#00bbae] font-semibold ">
                  {pointsToEarn} Gofy points
                </p>
              </div>
              <div className="w-full h-[1px] bg-gray-200 border-none"></div>
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[20px] leading-[30px] text-[#001430] font-bold ">
                  Total
                </p>
                <p className="text-[20px] leading-[30px] text-[#001430] font-bold ">
                  ₹ {discountedPrice}
                </p>
              </div>
            </div>
            <p className="text-[16px] leading-[24px] text-[#00bbae] font-medium">
              Offers and promotions will be applied at the next step.
            </p>

            {/* Added Gofy Points Section */}
            <div className=" flex flex-col gap-3">
              <p className="text-[20px] leading-[30px] font-semibold text-black">
                Gofy Points
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useGofyPoints"
                  name="useGofyPoints"
                  checked={useGofyPoints}
                  onChange={() => setUseGofyPoints(!useGofyPoints)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="useGofyPoints"
                  className="text-[16px] leading-[24px] text-gray-700"
                >
                  Use **{gofyPoints}** Gofy points to get a ₹{pointsDiscount}{" "}
                  discount
                </label>
              </div>
            </div>

            <button
              onClick={placeOrderForm}
              className="rounded-xl w-full text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 h-12 bg-[#00bbae] flex gap-3 items-center justify-center"
            >
              {formSubmit ? (
                <Loader className="w-6 h-6 text-white animate-spin" />
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

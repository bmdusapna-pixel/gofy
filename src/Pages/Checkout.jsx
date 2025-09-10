import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, X, MapPin, Truck } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { CartContext } from "../Context/CartContext";
import RelatedItems from "../Components/RelatedItems";
import { AuthContext } from "../Context/AuthContext";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Checkout = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [openCoupon, setOpenCoupon] = useState(false);
  const { cartItems, formSubmit, totalPrice } = useContext(CartContext);

  const [couponCode, setCouponeCode] = useState("");
  const [useGofyPoints, setUseGofyPoints] = useState(false);

  const [billingEditable, setBillingEditable] = useState(false);
  const [shippingEditable, setShippingEditable] = useState(false);

  const [gofyPoints, setGofyPoints] = useState(500);

  // Gift packaging states
  const [isGift, setIsGift] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    houseAndStreet: "",
    apartments: "",
    town: "",
    pinCode: "",
    district: "",
    state: "",
  });
  const handleAddNewClick = () => {
    setShowForm(true);
  };
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    setShowForm(false);
  };
  useEffect(() => {
    setAddresses(() =>
      user?.addresses.map((addr, index) => ({
        id: index + 1,
        details: `${addr.nickname}\n${addr.houseStreet}, ${addr.apartment}, ${addr.city}, ${addr.district}, ${addr.state}, ${addr.zipCode}, India\nPhone number: N/A`,
      }))
    );
  }, [user]);

  const savedBillingAddresses = [...addresses];
  const savedShippingAddresses = [...addresses];

  const defaultBillingId = 1;
  const defaultShippingId = 1;

  const [billingAddressId, setBillingAddressId] = useState(defaultBillingId);
  const [shippingAddressId, setShippingAddressId] = useState(defaultShippingId);

  const pointsToEarn = Math.floor(totalPrice / 100);
  const pointsDiscount = 50;
  const discountedPrice = useGofyPoints
    ? totalPrice - pointsDiscount
    : totalPrice;

  const [sameAsBilling, setSameAsBilling] = useState(false);

  const handleSameAsBillingChange = () => {
    const newValue = !sameAsBilling;
    setSameAsBilling(newValue);
    if (newValue) {
      setShippingAddressId(billingAddressId);
    } else {
      setShippingAddressId(defaultShippingId);
    }
  };

  const submitFormCoupon = (event) => {
    event.preventDefault();
    console.log("Applying coupon:", couponCode);
  };

  const handleSaveAddress = async (event) => {
    event.preventDefault();

    try {
      let response;

      response = await fetch(`${baseUrl}/user/auth/address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          address: {
            nickname: formData.name,
            houseStreet: formData.houseAndStreet,
            apartment: formData.apartments,
            city: formData.town,
            zipCode: formData.pinCode,
            district: formData.district,
            state: formData.state,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user) {
          updateUser(data.user);
        }
        alert("Address added successfully!");
        setShowForm(false);
      } else {
        alert(data.message || "Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Something went wrong");
    }
  };
  const placeOrderForm = (event) => {
    event.preventDefault();
    const billingAddress = savedBillingAddresses.find(
      (addr) => addr.id === billingAddressId
    )?.details;
    const shippingAddress = savedShippingAddresses.find(
      (addr) => addr.id === shippingAddressId
    )?.details;

    console.log("Proceeding to payment with addresses:", {
      billingAddress,
      shippingAddress,
      useGofyPoints,
      isGift,
      selectedMessage,
      giftNote,
    });
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full lg:px-12 px-5 mx-auto flex lg:flex-row flex-col gap-5">
        <div className="w-full lg:w-4/6 flex flex-col gap-5 h-full">
          {/* Coupon Section */}
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

          {/* Billing & Shipping Section */}
          <form
            onSubmit={placeOrderForm}
            className="flex flex-col gap-5 w-full"
          >
            <div className="bg-white flex flex-col gap-5 rounded-2xl p-5 md:p-10">
              <p className="text-[28px] leading-[42px] font-semibold text-black">
                Billing Details
              </p>

              {/* Billing Address */}
              <div className="flex flex-col gap-2 w-full">
                <p className="text-[18px] leading-[24px] font-semibold text-black">
                  Billing Address
                </p>
                {!billingEditable ? (
                  <div className="border p-4 rounded-lg bg-gray-50 flex justify-between items-center border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {
                        savedBillingAddresses.find(
                          (addr) => addr.id === billingAddressId
                        )?.details
                      }
                    </p>
                    <button
                      type="button"
                      className="ml-4 text-blue-500 hover:text-blue-700 font-semibold"
                      onClick={() => setBillingEditable(true)}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {savedBillingAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`border p-3 rounded-lg cursor-pointer flex gap-2 items-start ${
                          billingAddressId === addr.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="billingAddressRadio"
                          checked={billingAddressId === addr.id}
                          onChange={() => setBillingAddressId(addr.id)}
                          className="mt-1"
                        />
                        <span className="whitespace-pre-line">
                          {addr.details}
                        </span>
                      </label>
                    ))}
                    <button
                      type="button"
                      className="mt-2 text-blue-500 font-semibold hover:text-blue-700"
                      onClick={() => setBillingEditable(false)}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>

              {/* Shipping Address */}
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-3">
                  <p className="text-[18px] leading-[24px] font-semibold text-black">
                    Shipping Address
                  </p>
                  <label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sameAsBilling}
                      onChange={handleSameAsBillingChange}
                    />
                    Same as Billing Address
                  </label>
                </div>
                {!shippingEditable ? (
                  <div className="border p-4 rounded-lg bg-gray-50 flex justify-between items-center border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">
                      {
                        savedShippingAddresses.find(
                          (addr) => addr.id === shippingAddressId
                        )?.details
                      }
                    </p>
                    <button
                      type="button"
                      className="ml-4 text-blue-500 hover:text-blue-700 font-semibold"
                      onClick={() => setShippingEditable(true)}
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {savedShippingAddresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`border p-3 rounded-lg cursor-pointer flex gap-2 items-start ${
                          shippingAddressId === addr.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingAddressRadio"
                          checked={shippingAddressId === addr.id}
                          onChange={() => setShippingAddressId(addr.id)}
                          className="mt-1"
                        />
                        <span className="whitespace-pre-line">
                          {addr.details}
                        </span>
                      </label>
                    ))}
                    <button
                      type="button"
                      className="mt-2 text-blue-500 font-semibold hover:text-blue-700"
                      onClick={() => setShippingEditable(false)}
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
              {!showForm && (
                <button
                  onClick={handleAddNewClick}
                  className="mt-4 flex items-center justify-center gap-2 rounded-xl h-10 px-4 text-white bg-[#00bbae] hover:bg-[#f88e0f] transition-colors duration-300"
                >
                  <FaPlus /> Add New Address
                </button>
              )}
              {showForm && (
                <div className="w-full mt-6 p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-bold mb-4">Add New Address</h3>
                  <div className="flex flex-col gap-2">
                    <input
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Address Nickname (e.g., Home, Work)"
                      className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="houseAndStreet"
                      value={formData.houseAndStreet}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="House number and street name"
                      className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      name="apartments"
                      value={formData.apartments}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Apartments, suits, unit, etc. (optional)"
                      className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="town"
                      value={formData.town}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Town / City"
                      className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="Zip / Postal Code"
                      className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="district"
                      value={formData.district}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="District"
                      className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleFormChange}
                      type="text"
                      placeholder="State"
                      className="px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      type="submit"
                      onClick={handleSaveAddress}
                      className="rounded-xl w-24 h-10 text-white bg-[#00bbae] hover:bg-[#f88e0f] transition-colors duration-300"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="rounded-xl w-24 h-10 text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
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
                  placeholder="Notes about your order, e.g. special delivery instructions"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Your Order Section */}
        <div className="w-full lg:w-2/6 flex flex-col gap-5">
          <div className="w-full md:p-10 p-5 flex flex-col gap-3 bg-white rounded-2xl">
            <p className="text-[28px] leading-[42px] font-semibold text-black">
              Your order
            </p>
            <div className="border-[1px] rounded-md border-gray-200">
              {/* Header */}
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold">
                  Product
                </p>
                <p className="text-[16px] leading-[24px] text-[#001430] font-semibold ">
                  Subtotal
                </p>
              </div>

              {/* Cart Items */}
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

              {/* Subtotal */}
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[18px] leading-[27px] text-[#001430] font-semibold ">
                  Subtotal
                </p>
                <p className="text-[18px] leading-[27px] text-[#001430] font-semibold ">
                  ₹ {totalPrice}
                </p>
              </div>

              {/* Earned Points */}
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[18px] leading-[27px] text-[#00bbae] font-semibold ">
                  You will earn
                </p>
                <p className="text-[18px] leading-[27px] text-[#00bbae] font-semibold ">
                  {pointsToEarn} Gofy points
                </p>
              </div>

              <div className="w-full h-[1px] bg-gray-200 border-none"></div>

              {/* Total */}
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

            {/* Delivery Options */}
            <div className="space-y-4">
              <h2 className="text-[20px] leading-[30px] font-semibold text-black">
                Choose Delivery Option
              </h2>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="mt-1 h-5 w-5 text-blue-500 border-gray-400 focus:ring-blue-500"
                />
                <div>
                  <p className="text-gray-700">
                    Store-pickup & Earn Gofy Points
                  </p>
                  <p className="flex items-center text-black font-semibold">
                    <MapPin className="text-red-500 w-5 h-5 mr-1" />
                    Gofy Store Model Town, Delhi
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="h-5 w-5 text-blue-500 border-gray-400 focus:ring-blue-500"
                />
                <span className="flex items-center text-gray-700">
                  Get under 30 minutes
                  <Truck className="w-5 h-5 text-blue-500 ml-1" />
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  className="h-5 w-5 text-blue-500 border-gray-400 focus:ring-blue-500"
                />
                <span className="text-gray-700">Normal Delivery 2–3 days</span>
              </label>
            </div>

            {/* Gofy Points and Gift */}
            <div className="flex flex-col gap-3 mt-3">
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="useGofyPoints"
                  className="text-[16px] leading-[24px] text-gray-700"
                >
                  Use **{gofyPoints}** Gofy points to get a ₹{pointsDiscount}{" "}
                  discount
                </label>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="h-5 w-5 text-blue-500 border-gray-400 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">Add Gift Packaging</span>
              </label>

              {isGift && (
                <div className="p-3 border border-gray-300 rounded-lg space-y-2 bg-gray-50">
                  <p className="text-sm text-gray-600">
                    🎁 Your order will be gift wrapped.
                  </p>
                  <input
                    type="text"
                    value={selectedMessage}
                    onChange={(e) => setSelectedMessage(e.target.value)}
                    placeholder="Gift message"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Add a personal note (optional)"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
              )}
            </div>

            <button
              onClick={placeOrderForm}
              className="rounded-xl w-full text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 h-12 bg-[#00bbae] flex gap-3 items-center justify-center mt-4"
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

      {/* Related Items Section */}
      <div className="w-full lg:px-12 px-5 mx-auto">
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

export default Checkout;

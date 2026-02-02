import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader, X, MapPin, Truck } from "lucide-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import RelatedItems from "../Components/RelatedItems";
import { AuthContext } from "../Context/AuthContext";
import api from "../api/axios.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Checkout = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(AuthContext);
  const [openCoupon, setOpenCoupon] = useState(false);
  const { formSubmit, emptyCart, appliedCoupon } = useContext(CartContext);

  const [couponCode, setCouponCode] = useState("");
  const [useGofyPoints, setUseGofyPoints] = useState(false);

  const [billingEditable, setBillingEditable] = useState(false);
  const [shippingEditable, setShippingEditable] = useState(false);

  const [deliveryOption, setDeliveryOption] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // 'COD' or 'ONLINE'

  // Gift packaging states
  const [isGift, setIsGift] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [giftNote, setGiftNote] = useState("");
  
  // Checkout details from API
  const [checkoutData, setCheckoutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      user?.addresses.map((addr) => ({
        id: addr._id,
        details: `${addr.nickname}\n${addr.houseStreet}, ${addr.apartment}, ${addr.city}, ${addr.district}, ${addr.state}, ${addr.zipCode}, India\nPhone number: ${user?.phone}`,
      }))
    );
  }, [user]);

  const savedBillingAddresses = [...addresses];
  const savedShippingAddresses = [...addresses];

  const defaultBillingId = addresses[0]?.id;
  const defaultShippingId = addresses[0]?.id;

  const [billingAddressId, setBillingAddressId] = useState(null);
  const [shippingAddressId, setShippingAddressId] = useState(null);

  // Set default addresses when addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !billingAddressId) {
      setBillingAddressId(addresses[0].id);
      setShippingAddressId(addresses[0].id);
    }
  }, [addresses]);

  const [sameAsBilling, setSameAsBilling] = useState(false);

  // Fetch checkout details from API
  const fetchCheckoutDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/user/checkout/checkout-details", {
        couponCode: couponCode || undefined,
        deliveryType: deliveryOption || "NORMAL",
        points: useGofyPoints ? user?.gofyPoints || 0 : 0,
        giftPack: isGift,
      });
      
      if (data.success) {
        setCheckoutData(data);
        console.log(data)
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching checkout details:", err);
      setError("Failed to load checkout details");
    } finally {
      setLoading(false);
    }
  };

  // Sync couponCode with appliedCoupon from context
  useEffect(() => {
    if (appliedCoupon) {
      setCouponCode(appliedCoupon.code);
    } else {
      setCouponCode("");
    }
  }, [appliedCoupon]);

  // Fetch checkout details on mount and when relevant fields change
  useEffect(() => {
    fetchCheckoutDetails();
  }, [couponCode, deliveryOption, useGofyPoints, isGift]);

  const handleSameAsBillingChange = () => {
    const newValue = !sameAsBilling;
    setSameAsBilling(newValue);
    if (newValue) {
      setShippingAddressId(billingAddressId);
    } else {
      setShippingAddressId(addresses[0]?.id);
    }
  };

  const submitFormCoupon = (event) => {
    event.preventDefault();
    // Coupon will be automatically applied through the useEffect
    console.log("Applying coupon:", couponCode);
  };

  const handleSaveAddress = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/user/auth/address", {
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
      });
      if (data.user) {
        updateUser(data.user);
      }
      alert("Address added successfully!");
      setShowForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Something went wrong");
    }
  };

  const placeOrderForm = async (event) => {
    event.preventDefault();

    if (!deliveryOption) {
      alert("Please select a delivery option");
      return;
    }

    if (!billingAddressId || !shippingAddressId) {
      alert("Please select billing and shipping addresses");
      return;
    }

    const orderData = {
      shippingAddressId: shippingAddressId,
      billingAddressId: billingAddressId,
      paymentMethod: paymentMethod,
      couponCode: couponCode || undefined,
      deliveryType: deliveryOption,
      points: useGofyPoints ? (user?.gofyPoints || 0) : 0,
      giftPack: isGift,
      giftMessage: selectedMessage || undefined,
      giftNote: giftNote || undefined,
      otherNote: message || undefined,
    };

    try {
      const { data } = await api.post("/user/order/create", orderData);
      
      if (data.success) {
        // If payment method is ONLINE, redirect to payment page
        if (paymentMethod === "ONLINE") {
          const orderId = data.order._id || data.order.id;
          const amount = data.order.pricing?.total || checkoutData?.pricing?.total;
          navigate(`/payment?orderId=${orderId}&amount=${amount}`);
        } else {
          // For COD, show success message and clear cart
          alert("Order placed successfully!");
          emptyCart();
          console.log("Order response:", data);
          // Optional: Redirect to order confirmation page
          // navigate('/order-confirmation');
        }
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert(
        error.response?.data?.message || "Something went wrong while placing order"
      );
    }
  };

  const getDeliveryLabel = (type) => {
    switch (type) {
      case "STORE_PICKUP":
        return "Store-pickup & Earn Gofy Points";
      case "UNDER_30_MIN":
        return "Get under 30 minutes";
      case "NORMAL":
        return "Normal Delivery 2–3 days";
      default:
        return type;
    }
  };

  if (loading && !checkoutData) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 text-[#00bbae] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

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
                    {checkoutData?.couponError && (
                      <p className="text-red-500 text-sm">
                        {checkoutData.couponError}
                      </p>
                    )}
                    <form
                      onSubmit={submitFormCoupon}
                      className="w-full sm:w-[50%] items-center gap-3 flex sm:flex-row flex-col"
                    >
                      <input
                        required
                        name="couponCode"
                        onChange={(event) => setCouponCode(event.target.value)}
                        value={couponCode}
                        type="text"
                        className="transition-colors duration-300 w-full text-[18px] leading-[27px] rounded-2xl border border-gray-200 p-3 focus:outline-none focus:border-[#00bbae]"
                        placeholder="Coupon Code"
                      />
                      <button
                        type="submit"
                        className="rounded-xl w-full text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 h-12 bg-[#00bbae] flex gap-3 items-center justify-center"
                      >
                        Apply coupon
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
                  type="button"
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
                      type="button"
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                {checkoutData?.items &&
                  checkoutData.items.length > 0 &&
                  checkoutData.items.map((item) => (
                    <div
                      className="flex gap-3 w-full px-3 justify-between"
                      key={item.cartId}
                    >
                      <div className="flex gap-1 flex-wrap mb-3">
                        <p className="text-[16px] leading-[24px] text-[#001430]">
                          {item.productName} X ({item.quantity} items)
                        </p>
                      </div>
                      <p className="text-[16px] leading-[24px] whitespace-nowrap text-[#001430]">
                        ₹ {item.totalPrice}
                      </p>
                    </div>
                  ))}
                {isGift && (
                  <div className="flex gap-3 w-full px-3 justify-between items-center">
                    <p className="text-[16px] leading-[24px] text-gray-700 font-medium">
                      Gift Packaging
                    </p>
                    <p className="text-[16px] leading-[24px] text-gray-700 font-medium">
                      ₹ {checkoutData?.pricing?.giftPackCharges || 0}
                    </p>
                  </div>
                )}
              </div>

              <div className="w-full h-[1px] bg-gray-200 border-none"></div>

              {/* Subtotal */}
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[18px] leading-[27px] text-[#001430] font-semibold ">
                  Subtotal
                </p>
                <p className="text-[18px] leading-[27px] text-[#001430] font-semibold ">
                  ₹ {checkoutData?.pricing?.subtotal}
                </p>
              </div>

              {/* Discounts */}
              {checkoutData?.pricing?.totalDiscount > 0 && (
                <div className="flex gap-3 w-full p-3 justify-between items-center">
                  <p className="text-[16px] leading-[24px] text-green-600 font-medium">
                    Product Discount
                  </p>
                  <p className="text-[16px] leading-[24px] text-green-600 font-medium">
                    - ₹ {checkoutData.pricing.totalDiscount}
                  </p>
                </div>
              )}

              {checkoutData?.pricing?.couponDiscount > 0 && (
                <div className="flex gap-3 w-full p-3 justify-between items-center">
                  <p className="text-[16px] leading-[24px] text-green-600 font-medium">
                    Coupon Discount
                  </p>
                  <p className="text-[16px] leading-[24px] text-green-600 font-medium">
                    - ₹ {checkoutData.pricing.couponDiscount}
                  </p>
                </div>
              )}

              {checkoutData?.pricing?.pointsDiscount > 0 && (
                <div className="flex gap-3 w-full p-3 justify-between items-center">
                  <p className="text-[16px] leading-[24px] text-green-600 font-medium">
                    Points Discount
                  </p>
                  <p className="text-[16px] leading-[24px] text-green-600 font-medium">
                    - ₹ {checkoutData.pricing.pointsDiscount}
                  </p>
                </div>
              )}

              {checkoutData?.pricing?.deliveryCharges > 0 && (
                <div className="flex gap-3 w-full p-3 justify-between items-center">
                  <p className="text-[16px] leading-[24px] text-[#001430] font-medium">
                    Delivery Charges
                  </p>
                  <p className="text-[16px] leading-[24px] text-[#001430] font-medium">
                    ₹ {checkoutData.pricing.deliveryCharges}
                  </p>
                </div>
              )}

              <div className="w-full h-[1px] bg-gray-200 border-none"></div>

              {/* Total Savings */}
              {checkoutData?.pricing?.totalSavings > 0 && (
                <div className="flex gap-3 w-full p-3 justify-between items-center bg-green-50">
                  <p className="text-[18px] leading-[27px] text-green-700 font-semibold ">
                    Total Savings
                  </p>
                  <p className="text-[18px] leading-[27px] text-green-700 font-semibold ">
                    ₹ {checkoutData.pricing.totalSavings}
                  </p>
                </div>
              )}

              <div className="w-full h-[1px] bg-gray-200 border-none"></div>

              {/* Total */}
              <div className="flex gap-3 w-full p-3 justify-between items-center">
                <p className="text-[20px] leading-[30px] text-[#001430] font-bold ">
                  Total
                </p>
                <p className="text-[20px] leading-[30px] text-[#001430] font-bold ">
                  ₹ {checkoutData?.pricing?.total || 0}
                </p>
              </div>
            </div>

            {/* Delivery Options */}
            <div className="space-y-4 mt-4">
              <h2 className="text-[20px] leading-[30px] font-semibold text-black">
                Choose Delivery Option
              </h2>

              {/* Store Pickup */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="STORE_PICKUP"
                  checked={deliveryOption === "STORE_PICKUP"}
                  onChange={(e) => setDeliveryOption(e.target.value)}
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

              {/* 30 Min Delivery */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="UNDER_30_MIN"
                  checked={deliveryOption === "UNDER_30_MIN"}
                  onChange={(e) => setDeliveryOption(e.target.value)}
                  className="h-5 w-5 text-blue-500 border-gray-400 focus:ring-blue-500"
                />
                <span className="flex items-center text-gray-700">
                  Get under 30 minutes
                  <Truck className="w-5 h-5 text-blue-500 ml-1" />
                </span>
              </label>

              {/* Normal Delivery */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="delivery"
                  value="NORMAL"
                  checked={deliveryOption === "NORMAL"}
                  onChange={(e) => setDeliveryOption(e.target.value)}
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
                  disabled={!user?.gofyPoints || user.gofyPoints === 0}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="useGofyPoints"
                  className="text-[16px] leading-[24px] text-gray-700"
                >
                  Use {user?.gofyPoints || 0} Gofy points to get a discount
                  {checkoutData?.pricing?.pointsDiscount > 0 && (
                    <span className="text-green-600 font-semibold">
                      {" "}
                      (₹{checkoutData.pricing.pointsDiscount} off)
                    </span>
                  )}
                </label>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="h-5 w-5 text-blue-500 border-gray-400 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  Add Gift Packaging (₹
                  {checkoutData?.pricing?.giftPackCharges || 50})
                </span>
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

            {/* Payment Method Selection */}
            <div className="space-y-4 mt-4">
              <h2 className="text-[20px] leading-[30px] font-semibold text-black">
                Payment Method
              </h2>

              

              {/* Online Payment */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ONLINE"
                  checked={paymentMethod === "ONLINE"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 text-blue-500 border-gray-400 focus:ring-blue-500"
                />
                <div>
                  <p className="text-gray-700 font-medium">Online Payment (Recommeded)</p>
                  <p className="text-sm text-gray-500">Pay securely</p>
                </div>
              </label>

              {/* Cash on Delivery */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-5 w-5 text-blue-500 border-gray-400 focus:ring-blue-500"
                />
                <div>
                  <p className="text-gray-700 font-medium">Cash on Delivery (COD)</p>
                  <p className="text-sm text-gray-500">Pay when you receive your order</p>
                </div>
              </label>
            </div>

            <button
              onClick={placeOrderForm}
              disabled={loading || !deliveryOption}
              className="rounded-xl w-full text-[18px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer px-3 h-12 bg-[#00bbae] flex gap-3 items-center justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formSubmit || loading ? (
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
              checkoutData?.items?.length > 0
                ? "You might also like"
                : "Specially for You"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
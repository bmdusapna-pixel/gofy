import React, { useContext, useState } from "react";
import { Loader, Map, Package, User, LogOut, Coins } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Orders from "../Components/Orders.jsx";
import Points from "../Components/Points.jsx";

const IconComponents = {
  User,
  Map,
  Package,
  LogOut,
  Coins,
};

const account_items = [
  {
    _id: 1,
    icon: "User",
    link: "profile",
    title: "My Profile",
  },
  {
    _id: 2,
    icon: "Map",
    link: "address",
    title: "Address",
  },
  {
    _id: 3,
    icon: "Package",
    link: "orders",
    title: "My Orders",
  },
  {
    _id: 4,
    icon: "Coins",
    link: "points",
    title: "Gofy Point",
  },
  {
    _id: 5,
    icon: "LogOut",
    link: "logout",
    title: "LogOut",
  },
];

const Account = () => {
  const navigate = useNavigate();
  const { formSubmit } = useContext(CartContext);

  const [sameAddress, setSameAddress] = useState(false);
  const [activeItem, setActiveItem] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [billingAddresss, setBillingAddress] = useState({
    houseAndStreet: "",
    apartments: "",
    town: "",
    pinCode: "",
    district: "",
    state: "",
  });

  const [shippingAddress, setShippingAddress] = useState({
    houseAndStreet: "",
    apartments: "",
    town: "",
    pinCode: "",
    district: "",
    state: "",
  });

  const profileInputChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      const re = /^[0-9\b]+$/;
      if (value === "" || (re.test(value) && value.length <= 10)) {
        setProfileData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const billingInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setBillingAddress((prev) => ({ ...prev, [name]: value }));
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
        setShippingAddress({ ...billingAddresss });
      } else {
        setShippingAddress({
          houseAndStreet: "",
          apartments: "",
          town: "",
          pinCode: "",
          district: "",
          state: "",
        });
      }
      return newValue;
    });
  };

  const handleProfileUpdate = (event) => {
    event.preventDefault();
    console.log("Updating Profile:", profileData);
    // Simulating an alert. It's recommended to use a custom message box.
    alert("Profile updated successfully! (Simulated)");
  };

  const handleAddressUpdate = (event) => {
    event.preventDefault();
    console.log("Updating Billing Address:", billingAddresss);
    console.log("Updating Shipping Address:", shippingAddress);
    // Simulating an alert. It's recommended to use a custom message box.
    alert("Address updated successfully! (Simulated)");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Simulating an alert. It's recommended to use a custom message box.
    alert("You have been logged out. (Simulated)");
    navigate("/sign-in");
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="w-full flex gap-10 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 bg-[#e9ecef] shadow-sm rounded-2xl flex flex-col">
            <div className="flex gap-5 w-full p-3 items-center">
              <div className="w-16 h-16 p-2 rounded-full bg-[#00bbae] flex items-center justify-center">
                <p className="text-[32px] leading-[48px] text-white font-bold">
                  NS
                </p>
              </div>
              <p className="text-[18px] font-semibold text-black leading-[27px]">
                Nandit Sharma
              </p>
            </div>
            <div className="bg-[#f8f9fa] w-full h-0.5"></div>
            <div className="flex flex-col w-full relative h-full overflow-y-auto">
              {account_items.map((item) => {
                const Icon = IconComponents[item.icon];
                return (
                  <div
                    onClick={() => {
                      if (item.link === "logout") {
                        handleLogout();
                      } else {
                        setActiveItem(item.link);
                      }
                    }}
                    key={item._id}
                    className={`flex ${
                      item._id === account_items.length
                        ? "rounded-b-2xl shadow-none lg:mt-auto"
                        : "rounded-none"
                    } px-3 py-1.5 gap-2 w-full items-center transition-colors duration-300 text-black bg-transparent hover:bg-white hover:text-[#00bbae] cursor-pointer group
                    ${
                      activeItem === item.link ? "bg-white text-[#00bbae]" : ""
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-red-600 group-hover:text-[#00bbae]" />
                    </div>
                    <p className="tex-[16px] font-semibold leading-[24px]">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex flex-col gap-5 p-8 rounded-2xl bg-white shadow-sm">
            {activeItem === "profile" && (
              <form
                onSubmit={handleProfileUpdate}
                className="flex flex-col gap-5 w-full"
              >
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">
                    Full Name
                  </p>
                  <input
                    name="name"
                    value={profileData.name}
                    onChange={profileInputChangeHandler}
                    type="text"
                    className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    placeholder="Name"
                    autoComplete="name"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">
                    Email Address
                  </p>
                  <input
                    name="email"
                    value={profileData.email}
                    onChange={profileInputChangeHandler}
                    type="email"
                    className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    placeholder="Email"
                    autoComplete="email"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">
                    Contact Number
                  </p>
                  <div className="flex">
                    <span className="flex items-center bg-gray-100 border border-gray-200 rounded-l-md px-4 text-[18px] leading-[27px] font-medium text-black">
                      +91
                    </span>
                    <input
                      name="phone"
                      value={profileData.phone}
                      onChange={profileInputChangeHandler}
                      type="tel"
                      maxLength="10"
                      className="flex-1 transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-r-md"
                      placeholder="10-digit number"
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
                >
                  {formSubmit ? (
                    <Loader className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            )}

            {activeItem === "address" && (
              <form onSubmit={handleAddressUpdate} className="w-full">
                <div className="flex flex-col gap-5 h-[50vh] overflow-y-scroll pr-2">
                  <p className="text-[18px] leading-[24px] font-semibold text-black">
                    Billing Address
                  </p>
                  <div className="flex flex-col gap-2 w-full">
                    <input
                      required
                      name="houseAndStreet"
                      value={billingAddresss.houseAndStreet}
                      onChange={billingInputChangeHandler}
                      type="text"
                      placeholder="House number and street name"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      name="apartments"
                      value={billingAddresss.apartments}
                      onChange={billingInputChangeHandler}
                      type="text"
                      placeholder="Apartments, suits, unit, etc. (optional)"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="town"
                      value={billingAddresss.town}
                      onChange={billingInputChangeHandler}
                      type="text"
                      placeholder="Town / City"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="pinCode"
                      value={billingAddresss.pinCode}
                      onChange={billingInputChangeHandler}
                      type="text"
                      placeholder="Zip / Postal Code"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="district"
                      value={billingAddresss.district}
                      onChange={billingInputChangeHandler}
                      type="text"
                      placeholder="District"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                    <input
                      required
                      name="state"
                      value={billingAddresss.state}
                      onChange={billingInputChangeHandler}
                      type="text"
                      placeholder="State"
                      className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex sm:flex-row flex-col gap-2 sm:gap-5 w-full sm:items-center">
                      <p className="text-[18px] leading-[24px] font-semibold text-black">
                        Shipping Address
                      </p>
                      <div className="flex gap-2 items-center">
                        <input
                          checked={sameAddress}
                          onChange={handleSameAddressToggle}
                          type="checkbox"
                          className="border border-gray-200 rounded-md cursor-pointer w-4 h-4"
                        />
                        <p className="text-[14px] leading-[18px] font-medium text-gray-600">
                          Same as Billing Address
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <input
                        required
                        name="houseAndStreet"
                        value={shippingAddress.houseAndStreet}
                        onChange={shippingInputChangeHandler}
                        type="text"
                        placeholder="House number and street name"
                        className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      />
                      <input
                        name="apartments"
                        value={shippingAddress.apartments}
                        onChange={shippingInputChangeHandler}
                        type="text"
                        placeholder="Apartments, suits, unit, etc. (optional)"
                        className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      />
                      <input
                        required
                        name="town"
                        value={shippingAddress.town}
                        onChange={shippingInputChangeHandler}
                        type="text"
                        placeholder="Town / City"
                        className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      />
                      <input
                        required
                        name="pinCode"
                        value={shippingAddress.pinCode}
                        onChange={shippingInputChangeHandler}
                        type="text"
                        placeholder="Zip / Postal Code"
                        className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      />
                      <input
                        required
                        name="district"
                        value={shippingAddress.district}
                        onChange={shippingInputChangeHandler}
                        type="text"
                        placeholder="District"
                        className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      />
                      <input
                        required
                        name="state"
                        value={shippingAddress.state}
                        onChange={shippingInputChangeHandler}
                        type="text"
                        placeholder="State"
                        className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-xl mt-5 w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
                >
                  {formSubmit ? (
                    <Loader className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    "Update"
                  )}
                </button>
              </form>
            )}

            {activeItem === "orders" && <Orders />}
            {activeItem === "points" && <Points />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

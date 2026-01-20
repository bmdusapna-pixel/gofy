import React, { useContext, useEffect, useState } from "react";
import {
  Loader,
  Map,
  Package,
  User,
  LogOut,
  Coins,
  Undo2,
  CircleAlert,
} from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Orders from "../Components/Orders.jsx";
import Points from "../Components/Points.jsx";
import Returns from "../Components/Returns.jsx";
import Issues from "../Components/Issues.jsx";
import ReferEarn from "../Components/ReferEarn.jsx";
import SavedAddress from "../Components/SavedAddress.jsx";
import { AuthContext } from "../Context/AuthContext.jsx";
import DelayedModal from "../Components/DelayedModal.jsx";
import Log from "../assets/Log.webp";
import sale from "../assets/sale.jpg";

const IconComponents = {
  User,
  Map,
  Package,
  LogOut,
  Coins,
  Undo2,
  CircleAlert,
};

const account_items = [
  {
    _id: 1,
    icon: "User",
    link: "profile",
    title: "My Profile",
  },
  {
    _id: 3,
    icon: "Package",
    link: "orders",
    title: "My Orders",
  },
  {
    _id: 2,
    icon: "Map",
    link: "address",
    title: "Address",
  },
  
  {
    _id: 4,
    icon: "Coins",
    link: "points",
    title: "Gofy Point",
  },
  {
    _id: 5,
    icon: "Coins",
    link: "refer-earn",
    title: "Refer Earn",
  },
  {
    _id: 6,
    icon: "Undo2",
    link: "return",
    title: "Returns",
  },
  {
    _id: 7,
    icon: "CircleAlert",
    link: "issue",
    title: "Issues",
  },
  {
    _id: 8,
    icon: "LogOut",
    link: "logout",
    title: "LogOut",
  },
];

const Account = () => {
  const navigate = useNavigate();
  const { formSubmit } = useContext(CartContext);

  const [activeItem, setActiveItem] = useState("profile");

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const { user, logout, token, updateUser } = useContext(AuthContext);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDelayedModal, setShowDelayedModal] = useState(false);

  useEffect(() => {
    if (showDelayedModal) {
      setTimeout(() => {
        setShowDelayedModal(false);
      }, 5000);
    }
  }, [showDelayedModal]);

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

  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
      }));
    }
  }, [user]);

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/auth/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      setProfileData((prev) => ({
        ...prev,
        name: data.user.name,
        phone: data.user.phone,
        email: data.user.email || prev.email,
      }));

      if (data.user) {
        updateUser(data.user);
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      alert(error.message);
    }
  };

  const handleLogoutClick = () => {
    setShowDelayedModal(true);
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/sign-in");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-5">
        <div className="w-full flex gap-10 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 bg-[#e9ecef] shadow-sm rounded-2xl flex flex-col">
            <div className="flex gap-5 w-full p-3 items-center">
              <div className="w-16 h-16 p-2 rounded-full bg-[#00bbae] flex items-center justify-center">
                <p className="text-[32px] leading-[48px] text-white font-bold">
                  {user?.name?.split(" ").map((i) => i[0])}
                </p>
              </div>
              <p className="text-[18px] font-semibold text-black leading-[27px]">
                {user?.name}
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
                        handleLogoutClick();
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

            {activeItem === "address" && <SavedAddress />}
            {activeItem === "orders" && <Orders />}
            {activeItem === "points" && <Points />}
            {activeItem === "return" && <Returns />}
            {activeItem === "issue" && <Issues />}
            {activeItem === "refer-earn" && <ReferEarn />}
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 flex flex-col overflow-hidden">
            {/* Image Banner */}
            <div className="w-full h-36 overflow-hidden">
              <img
                src={Log}
                alt="Logout Banner"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="px-6 py-6 flex flex-col gap-4 text-center">
              <h3 className="text-gray-900 text-lg font-semibold">
                Confirm Logout
              </h3>
              <p className="text-gray-600 text-[15px]">
                Are you sure you want to logout? You will need to log in again
                to access your account.
              </p>

              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={cancelLogout}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-5 py-2 rounded-lg bg-[#00bbae] text-white hover:bg-[#009e9a] transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showDelayedModal && <DelayedModal imageUrl={sale} linkUrl="/" />}
    </div>
  );
};

export default Account;

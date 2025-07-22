import React, { useContext, useState } from "react";
import { Loader, LockKeyhole, LogOut, Map, Package, User } from "lucide-react";
import { CartContext } from "../Context/CartContext";

const IconComponents = {
  User,
  Map,
  Package,
  LockKeyhole,
  LogOut,
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
    link: "",
    title: "My Orders",
  },
  {
    _id: 4,
    icon: "LockKeyhole",
    link: "password",
    title: "Change Password",
  },
  {
    _id: 5,
    icon: "LogOut",
    link: "",
    title: "LogOut",
  },
]

const Account = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, cartItems, openCart, setOpenCart, totalItems, formSubmit } = useContext(CartContext);
  const [sameAddress, setSameAddress] = useState(false);
  const [activeItem, setActiveItem] = useState("profile");
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPasswordFirst: "",
    newPasswordSecond: "",
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

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setProfileData((prev) => ({...prev, [name]: value }));
    setPasswordData((prev) => ({...prev, [name]: value }));
  };

  const billingInputChangeHandler = (event) => {
    const { name, value } = event.target;
    setBillingAddress((prev) => ({...prev, [name]: value }));
    if (sameAddress) {
      setShippingAddress((prev) => ({...prev, [name]: value }));
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

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="max-w-5xl mx-auto lg:px-0 px-5">
        <div className="w-full flex gap-10">
          <div className="w-1/3 bg-[#e9ecef] shadow-sm rounded-2xl flex flex-col">
            <div className="flex gap-5 w-full p-3 items-center">
              <div className="w-16 h-16 p-2 rounded-full bg-[#00bbae] flex items-center justify-center">
                <p className="text-[32px] leading-[48px] text-white font-bold">NS</p>
              </div>
              <p className="text-[18px] font-semibold text-black leading-[27px]">Nandit Sharma</p>
            </div>
            <div className="bg-[#f8f9fa] w-full h-0.5"></div>
            <div className="flex flex-col w-full relative">
              {
                account_items.map((item) => {
                  const Icon = IconComponents[item.icon];
                  return (
                    <div onClick={()=>setActiveItem(item.link)} key={item._id} className={`flex ${item._id === account_items.length ? "rounded-b-2xl shadow-none mt-24": "rounded-none"} px-3 py-1.5 gap-2 w-full items-center transition-colors duration-300 text-black bg-transparent hover:bg-white hover:text-[#00bbae] cursor-pointer`}>
                      <div className="w-8 h-8 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="tex-[16px] font-semibold leading-[24px]">{item.title}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className="w-2/3 flex flex-col gap-5 p-8 rounded-2xl bg-white shadow-sm">

          {/* profile data */}
          {
            activeItem === "profile" && (
              <form className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">Full Name</p>
                  <input name="name" value={profileData.name} onChange={inputChangeHandler} type="text" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="Name" autoComplete="current-email"  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">Email address</p>
                  <input name="email" value={profileData.email} onChange={inputChangeHandler} type="text" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="Email Address" autoComplete="current-email"  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">Contact Number</p>
                  <input name="phone" value={profileData.phone} onChange={inputChangeHandler} type="tel" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="Contact Number" autoComplete="current-email"  />
                </div>
                <button type="submit" className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">{formSubmit ? <Loader className="w-6 h-6 text-white animate-spin" /> : "Update"}</button>
              </form>
            )
          }

           {/* address data */}
          {
            activeItem === "address" && (
              <form className="w-full">
                <div className="flex flex-col gap-5 h-[50vh] overflow-y-scroll">
                  <p className="text-[18px] leading-[24px] font-semibold text-black">Billing Address</p>
                  <div className="flex flex-col gap-2 w-full">
                    <input required name="houseAndStreet" value={billingAddresss.houseAndStreet} onChange={billingInputChangeHandler} type="text" placeholder="House number and street name" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                    <input name="apartments" value={billingAddresss.apartments} onChange={billingInputChangeHandler} type="text" placeholder="Apartments, suits, unit, etc. (optional)" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                    <input required name="town" value={billingAddresss.town} onChange={billingInputChangeHandler} type="text" placeholder="Town / City" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                    <input required name="pinCode" value={billingAddresss.pinCode} onChange={billingInputChangeHandler} type="text" placeholder="Zip / Postal Code" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                    <input required name="district" value={billingAddresss.district} onChange={billingInputChangeHandler} type="text" placeholder="District" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                    <input required name="state" value={billingAddresss.state} onChange={billingInputChangeHandler} type="text" placeholder="State" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                  </div>
                  <div className="flex flex-col gap-5 w-full">
                    <div className="flex sm:flex-row flex-col gap-2 sm:gap-5 w-full sm:items-center">
                      <p className="text-[18px] leading-[24px] font-semibold text-black">Shipping Address</p>
                      <div className="flex gap-2 items-center">
                        <input checked={sameAddress} onChange={handleSameAddressToggle} type="checkbox" className="border border-gray-200 rounded-md cursor-pointer w-4 h-4" />
                        <p className="text-[14px] leading-[18px] font-medium text-gray-600">Same as Billing Address</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <input required name="houseAndStreet" value={shippingAddress.houseAndStreet} onChange={shippingInputChangeHandler} type="text" placeholder="House number and street name" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                      <input name="apartments" value={shippingAddress.apartments} onChange={shippingInputChangeHandler} type="text" placeholder="Apartments, suits, unit, etc. (optional)" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                      <input required name="town" value={shippingAddress.town} onChange={shippingInputChangeHandler} type="text" placeholder="Town / City" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                      <input required name="pinCode" value={shippingAddress.pinCode} onChange={shippingInputChangeHandler} type="text" placeholder="Zip / Postal Code" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                      <input required name="district" value={shippingAddress.district} onChange={shippingInputChangeHandler} type="text" placeholder="District" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                      <input required name="state" value={shippingAddress.state} onChange={shippingInputChangeHandler} type="text" placeholder="State" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" />
                    </div>
                  </div>
                </div>
                <button type="submit" className="rounded-xl mt-5 w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">{formSubmit ? <Loader className="w-6 h-6 text-white animate-spin" /> : "Update"}</button>
              </form>
            )
          }

          {/* password data */}
          {
            activeItem === "password" && (
              <form className="flex flex-col gap-5 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">Current Password</p>
                  <input name="oldPassword" value={passwordData.oldPassword} onChange={inputChangeHandler} type="text" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="Current Password" autoComplete="current-email"  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">New Password</p>
                  <input name="newPasswordFirst" value={passwordData.newPasswordFirst} onChange={inputChangeHandler} type="tel" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="New Password" autoComplete="current-email"  />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">Re - Enter Password</p>
                  <input name="newPasswordSecond" value={passwordData.newPasswordSecond} onChange={inputChangeHandler} type="tel" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-1 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="Re - Enter Password" autoComplete="current-email"  />
                </div>
                <button type="submit" className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">{formSubmit ? <Loader className="w-6 h-6 text-white animate-spin" /> : "Update"}</button>
              </form>
            )
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;

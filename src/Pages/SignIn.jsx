import React, { useContext, useState } from "react";
import { Star, Eye, EyeOff, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const SignIn = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, cartItems, openCart, setOpenCart, totalItems, formSubmit } = useContext(CartContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [singInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignInData((prev) => ({...prev, [name]: value }));
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="max-w-xl mx-auto lg:px-0 px-5">
        <div className="w-full flex flex-col bg-white rounded-2xl p-5 md:p-10 gap-5">
          <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold text-black">Login</p>
          <form action="" className="w-full border border-gray-200 rounded-2xl p-5 flex flex-col gap-2 sm:gap-5">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2 items-center">
                <p className="text-[16px] leading-[24px] font-semibold text-black">Email address</p>
                <Star className="w-2 h-2 text-[#dc3545] self-start translate-y-2" fill="#dc3545" />
              </div>
              <input name="email" required value={singInData.email} onChange={inputChangeHandler} type="email" className="transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" placeholder="Email" autoComplete="current-email"  />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2 items-center">
                <p className="text-[16px] leading-[32px] font-semibold text-black">Password</p>
                <Star className="w-2 h-2 text-[#dc3545] self-start translate-y-2" fill="#dc3545" />
              </div>
              <div className="relative">
                <input required value={singInData.password} name="password" onChange={inputChangeHandler} type={passwordVisible ? "text" : "password"} placeholder="Password" className="transition-colors duration-300 text-black text-[18px] leading-[27px] font-medium py-2 px-4 rounded-md border focus:border-[#00bbae] focus:outline-none w-full border-gray-200 pr-10" autoComplete="current-password" />
                <div onClick={() => setPasswordVisible((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer">
                  {
                    passwordVisible ? 
                    (
                      <EyeOff className="text-black w-5 h-5" />
                    ) 
                    : 
                    (
                      <Eye className="text-black w-5 h-5" />
                    )
                  }
                </div>
              </div>
            </div>
            <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 justify-between w-full items-start sm:items-center">
              <div className="flex gap-3 items-center">
                <input type="checkbox" className="border border-gray-200 rounded-md w-4 h-4" />
                <p className="text-[16px] leading-[24px] font-semibold text-black">Remember me</p>
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-[16px] leading-[24px] font-semibold text-black">New User?</p>
                <Link to="/sign-up" className="text-[#00bbae] text-[16px] leading-[24px] transition-colors duration-300 hover:text-[#f88e0f] font-semibold">Sign Up</Link>
              </div>
            </div>
            <button type="submit" className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">{formSubmit ? <Loader className="w-6 h-6 text-white animate-spin" /> : "Log In"}</button>
            <Link to="/" className="text-[16px] leading-[24px] font-medium text-[#00bbae] transition-colors duration-300 hover:text-[#f88e0f]">Forgot Password</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

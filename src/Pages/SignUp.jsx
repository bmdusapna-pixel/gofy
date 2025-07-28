import React, { useContext, useState } from "react";
import { Eye, EyeOff, Loader, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

const SignUp = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen, cartItems, openCart, setOpenCart, totalItems, formSubmit } = useContext(CartContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [singUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({...prev, [name]: value }));
    if (name === "password") {
      const validations = {
        hasUpperCase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        minLength: value.length >= 8,
      };
      setPasswordValidation(validations);
    }
  };

  const [passwordValidation, setPasswordValidation] = useState({
    hasUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    minLength: false,
  });

  const submitFrom = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="max-w-xl mx-auto lg:px-0 px-5">
        <div className="w-full flex flex-col gap-5 bg-white rounded-2xl p-5 md:p-10">
          <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold text-black">Sign up</p>
          <form onSubmit={submitFrom} className="w-full border border-gray-200 rounded-2xl p-5 flex flex-col gap-2 sm:gap-4">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2 items-center">
                <p className="text-[16px] leading-[24px] font-semibold text-black">Name</p>
                <Star className="w-2 h-2 text-[#dc3545] self-start translate-y-2" fill="#dc3545" />
              </div>
              <input required onChange={inputChangeHandler} value={singUpData.name} name="name" type="text" className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" autoComplete="current-name" placeholder="Name" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2 items-center">
                <p className="text-[16px] leading-[24px] font-semibold text-black">Email address</p>
                <Star className="w-2 h-2 text-[#dc3545] self-start translate-y-2" fill="#dc3545" />
              </div>
              <input required onChange={inputChangeHandler} value={singUpData.email} name="email" type="email" className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" autoComplete="current-email" placeholder="Email" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2 items-center">
                <p className="text-[16px] leading-[24px] font-semibold text-black">Phone</p>
                <Star className="w-2 h-2 text-[#dc3545] self-start translate-y-2" fill="#dc3545" />
              </div>
              <input required onChange={inputChangeHandler} value={singUpData.phone} name="phone" type="tel" className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" autoComplete="current-name" placeholder="Phone" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2 items-center">
                <p className="text-[16px] leading-[24px] font-semibold text-black">Password</p>
                <Star className="w-2 h-2 text-[#dc3545]" fill="#dc3545" />
              </div>
              <div className="relative">
                <input required value={singUpData.password} name="password" onChange={inputChangeHandler} type={passwordVisible ? "text" : "password"} placeholder="Password" className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" autoComplete="current-password" />
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
                <p className="text-[16px] leading-[24px] font-semibold text-black">Already have an account?</p>
                <Link to="/sign-in" className="text-[16px] leading-[24px] text-[#00bbae] transition-colors duration-300 hover:text-[#f88e0f] font-semibold">Sign In</Link>
              </div>
            </div>
            <button type="submit" className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center">{formSubmit ? <Loader className="w-6 h-6 text-white animate-spin" /> : "Sign Up"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

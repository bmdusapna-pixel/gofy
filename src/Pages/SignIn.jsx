import React, { useState, useEffect } from "react";
import {
  Star,
  Loader,
  CheckCircle,
  XCircle,
  MessageSquare,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import LoginBanner from "../assets/login-banner.jpeg";
import LoginBannerMobile from "../assets/login-banner-mobile.jpeg";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    phone: "",
    otp: "",
  });

  const [otpMethod, setOtpMethod] = useState(""); // 'whatsapp' or 'sms'

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const [activeBanner, setActiveBanner] = useState(LoginBanner);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      const re = /^[0-9\b]+$/;
      if (value === "" || (re.test(value) && value.length <= 10)) {
        setLoginData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRequestOtp = async () => {
    if (loginData.phone.length !== 10) {
      showMessage("Please enter a valid 10-digit phone number.", "error");
      return;
    }
    if (!otpMethod) {
      showMessage("Please select a method to receive your OTP.", "error");
      return;
    }

    setOtpRequestLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setOtpSent(true);
    setOtpRequestLoading(false);
    showMessage(
      `OTP sent to +91${loginData.phone} via ${otpMethod}. (Simulated)`,
      "success"
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (loginData.otp === "123456") {
      showMessage("Login successful!", "success");
      navigate("/account");
    } else {
      showMessage("Invalid OTP. Please try again.", "error");
    }
    setLoading(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setActiveBanner(LoginBannerMobile);
      } else {
        setActiveBanner(LoginBanner);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="max-w-[1120px] mx-auto px-5">
        <div
          className="w-full flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden relative"
          style={{
            backgroundImage: `url(${activeBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-0 relative z-10"></div>

          <div className="relative z-10 w-full md:w-1/2 p-5 md:px-10 md:py-20 flex flex-col gap-5 bg-transparent bg-opacity-90 md:bg-opacity-80 rounded-b-2xl md:rounded-l-none md:rounded-r-2xl">
            {message && (
              <div
                className={`p-4 rounded-xl flex items-start gap-3 text-sm border-2 ${
                  messageType === "error"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-green-50 text-green-700 border-green-200"
                }`}
              >
                {messageType === "error" ? (
                  <XCircle className="w-5 h-5 mt-0.5" />
                ) : (
                  <CheckCircle className="w-5 h-5 mt-0.5" />
                )}
                <span className="font-medium leading-relaxed">{message}</span>
              </div>
            )}

            <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold text-black">
              Login with Phone & OTP
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 sm:gap-5"
            >
              {!otpSent && (
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex gap-2 items-center">
                    <p className="text-[16px] leading-[24px] font-semibold text-black">
                      Phone Number
                    </p>
                    <Star
                      className="w-2 h-2 text-[#dc3545] self-start translate-y-2"
                      fill="#dc3545"
                    />
                  </div>
                  <div className="flex">
                    <span className="flex items-center bg-white border border-gray-200 border-r-0 rounded-l-md px-4 text-[18px] leading-[27px] font-medium text-black">
                      +91
                    </span>
                    <input
                      name="phone"
                      required
                      value={loginData.phone}
                      onChange={inputChangeHandler}
                      type="tel"
                      maxLength="10"
                      className="flex-1 transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 outline-none rounded-r-md bg-white"
                      placeholder="10-digit number"
                      autoComplete="tel"
                    />
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-[16px] leading-[24px] font-semibold text-black">
                      How would you like to receive the OTP?
                    </p>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setOtpMethod("whatsapp")}
                        className={`flex-1 flex items-center justify-start gap-3 px-4 py-2 rounded-md border-2 transition-all duration-200 ${
                          otpMethod === "whatsapp"
                            ? "border-[#25D366] bg-[#D4FCDD] shadow-md"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="bg-[#25D366] flex justify-center items-center h-7 w-7 rounded-full">
                          <FaWhatsapp
                            className={`w-5 h-5 ${
                              otpMethod === "whatsapp"
                                ? "text-white"
                                : "text-white"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            otpMethod === "whatsapp"
                              ? "text-[#25D366]"
                              : "text-gray-700"
                          }`}
                        >
                          WhatsApp
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpMethod("sms")}
                        className={`flex-1 flex items-center justify-start gap-3 px-4 py-2 rounded-md border-2 transition-all duration-200 ${
                          otpMethod === "sms"
                            ? "border-[#00bbae] bg-[#E0FCF9] shadow-md"
                            : "border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                      >
                        <div className="bg-[#00bbae] flex justify-center items-center h-7 w-7 rounded-full">
                          <MessageSquare
                            className={`w-5 h-5 ${
                              otpMethod === "sms" ? "text-white" : "text-white"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            otpMethod === "sms"
                              ? "text-[#00bbae]"
                              : "text-gray-700"
                          }`}
                        >
                          SMS
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={
                      otpRequestLoading ||
                      otpSent ||
                      loginData.phone.length !== 10 ||
                      !otpMethod
                    }
                    className={`mt-4 rounded-md px-4 py-2 text-[16px] leading-[24px] font-semibold text-white transition-colors duration-300 ${
                      otpRequestLoading ||
                      otpSent ||
                      loginData.phone.length !== 10 ||
                      !otpMethod
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#00bbae] hover:bg-[#f88e0f] cursor-pointer"
                    } flex items-center justify-center`}
                  >
                    {otpRequestLoading ? (
                      <Loader className="w-5 h-5 animate-spin mr-2" />
                    ) : otpSent ? (
                      "OTP Sent!"
                    ) : (
                      "Request OTP"
                    )}
                  </button>
                </div>
              )}

              {otpSent && (
                <div className="flex flex-col gap-1 w-full mt-4">
                  <div className="flex gap-2 items-center">
                    <p className="text-[16px] leading-[32px] font-semibold text-black">
                      Enter OTP
                    </p>
                    <Star
                      className="w-2 h-2 text-[#dc3545] self-start translate-y-2"
                      fill="#dc3545"
                    />
                  </div>
                  <input
                    required
                    value={loginData.otp}
                    name="otp"
                    onChange={inputChangeHandler}
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    maxLength="6"
                    className="transition-colors duration-300 text-black text-[18px] leading-[27px] font-medium py-2 px-4 rounded-md border focus:outline-none w-full border-gray-200 bg-white"
                    autoComplete="one-time-code"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={
                        otpRequestLoading ||
                        loginData.phone.length !== 10 ||
                        !otpMethod
                      }
                      className={`my-1 text-left text-[14px] leading-[20px] transition-colors duration-300 font-semibold ${
                        otpRequestLoading ||
                        loginData.phone.length !== 10 ||
                        !otpMethod
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-[#00bbae] hover:text-[#f88e0f] cursor-pointer"
                      }`}
                    >
                      Resend OTP
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="rounded-md px-4 py-2 text-[16px] leading-[24px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
                    disabled={loading || !otpSent}
                  >
                    {loading ? (
                      <Loader className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>
              )}

              <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 justify-end w-full items-start sm:items-center pb-5">
                <div className="flex gap-3 items-center">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">
                    New User?
                  </p>
                  <Link
                    to="/sign-up"
                    className="text-pink-600 text-[16px] leading-[24px] transition-colors duration-300 hover:text-[#f88e0f] font-semibold"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

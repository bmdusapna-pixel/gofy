import React, { useState } from "react";
import { Star, Loader } from "lucide-react";
import Sign from "../assets/sign.webp";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const mockContext = {
    formSubmit: false,
  };
  const { formSubmit: globalFormSubmit } = mockContext;

  // const Link = ({ to, children, className }) => (
  //   <a href={to} className={className}>
  //     {children}
  //   </a>
  // );

  const [loginData, setLoginData] = useState({
    phone: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);

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
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setOtpRequestLoading(true);
    console.log(`Requesting OTP for phone: +91${loginData.phone}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOtpSent(true);
    setOtpRequestLoading(false);
    alert(`OTP sent to +91${loginData.phone}. (Simulated)`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Verifying OTP:", loginData);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (loginData.otp === "123456") {
      alert("Login successful!");
      // Redirect to the root path after successful login
      navigate("/");
    } else {
      alert("Invalid OTP. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa] font-sans">
      <div className="max-w-[992px] mx-auto px-5">
        <div className="w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 p-0">
            <img
              src={Sign}
              alt="Sign In Illustration"
              className="rounded-xl object-cover w-auto h-full shadow-md"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/450x600/E0E7FF/000000?text=Image+Error";
              }}
            />
          </div>

          <div className="w-full md:w-1/2 p-5 md:p-10 flex flex-col gap-5">
            <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold text-black">
              Login with Phone & OTP
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full border border-gray-200 rounded-2xl p-5 flex flex-col gap-2 sm:gap-5"
            >
              {/* Phone number input field with +91 prefix */}
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
                  {/* +91 Prefix */}
                  <span className="flex items-center bg-gray-100 border border-gray-200 rounded-l-md px-4 text-[18px] leading-[27px] font-medium text-black">
                    +91
                  </span>
                  {/* Phone number input */}
                  <input
                    name="phone"
                    required
                    value={loginData.phone}
                    onChange={inputChangeHandler}
                    type="tel"
                    maxLength="10" // Visual maxLength to hint 10 digits
                    className="flex-1 transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-r-md"
                    placeholder="10-digit number"
                    autoComplete="tel"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRequestOtp}
                  disabled={
                    otpRequestLoading ||
                    otpSent ||
                    loginData.phone.length !== 10
                  }
                  className={`mt-2 rounded-md px-4 py-2 text-[16px] leading-[24px] font-semibold text-white transition-colors duration-300 ${
                    otpRequestLoading ||
                    otpSent ||
                    loginData.phone.length !== 10
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

              {/* OTP input field - conditionally rendered */}
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
                    className="transition-colors duration-300 text-black text-[18px] leading-[27px] font-medium py-2 px-4 rounded-md border focus:border-[#00bbae] focus:outline-none w-full border-gray-200"
                    autoComplete="one-time-code"
                  />
                  <button
                    type="button"
                    onClick={handleRequestOtp}
                    disabled={
                      otpRequestLoading || loginData.phone.length !== 10
                    } // Disable if phone not 10 digits
                    className={`mt-2 text-left text-[14px] leading-[20px] transition-colors duration-300 font-semibold ${
                      otpRequestLoading || loginData.phone.length !== 10
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-[#00bbae] hover:text-[#f88e0f] cursor-pointer"
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>
              )}

              {/* New User/Sign Up link */}
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 justify-end w-full items-start sm:items-center">
                <div className="flex gap-3 items-center">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">
                    New User?
                  </p>
                  <Link
                    to="/sign-up"
                    className="text-[#00bbae] text-[16px] leading-[24px] transition-colors duration-300 hover:text-[#f88e0f] font-semibold"
                  >
                    Create Account
                  </Link>
                </div>
              </div>

              {/* Log In button with loading indicator */}
              <button
                type="submit"
                className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
                disabled={loading || !otpSent}
              >
                {loading ? (
                  <Loader className="w-6 h-6 text-white animate-spin" />
                ) : (
                  "Log In"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import React, { useState, useEffect } from "react";
import { Star, Loader, CheckCircle, XCircle } from "lucide-react";
import LoginBanner from "../assets/login-banner.jpeg";
import LoginBannerMobile from "../assets/login-banner-mobile.jpeg";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  // State to handle responsive banner image
  const [activeBanner, setActiveBanner] = useState(LoginBanner);

  // State to hold the user's sign-up data
  const [signUpData, setSignUpData] = useState({
    name: "",
    phone: "",
    otp: "",
  });

  // State to manage the UI flow
  const [currentStep, setCurrentStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);

  // State for the user feedback message box
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(""); // Can be 'success' or 'error'

  /**
   * Helper function to show a feedback message in the UI.
   * @param {string} text - The message to display.
   * @param {string} type - The type of message ('success' or 'error').
   */
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    // Hide the message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  /**
   * Handles changes to the form input fields.
   * Restricts phone number input to 10 digits.
   * @param {Event} event - The input change event.
   */
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "phone") {
      const re = /^[0-9\b]+$/;
      if (value === "" || (re.test(value) && value.length <= 10)) {
        setSignUpData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  /**
   * Validates the required fields for Step 1.
   * @returns {boolean} - True if all fields are valid, false otherwise.
   */
  const validateStep1 = () => {
    const { name, phone } = signUpData;

    if (!name || !phone) {
      showMessage("Please fill in all required fields.", "error");
      return false;
    }
    if (phone.length !== 10) {
      showMessage("Please enter a valid 10-digit phone number.", "error");
      return false;
    }
    return true;
  };

  /**
   * Simulates an API call to request an OTP.
   */
  const handleRequestOtp = async () => {
    if (signUpData.phone.length !== 10) {
      showMessage(
        "Please enter a valid 10-digit phone number to request OTP.",
        "error"
      );
      return;
    }
    setOtpRequestLoading(true);
    // Simulate API call for sending OTP
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOtpSent(true);
    setOtpRequestLoading(false);
    showMessage(`OTP sent to +91${signUpData.phone}. (Simulated)`, "success");
  };

  /**
   * Handles the main form submission for both steps.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep === 1) {
      if (validateStep1()) {
        await handleRequestOtp(); // Request OTP and then move to step 2
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (!signUpData.otp) {
        showMessage("Please enter the OTP.", "error");
        return;
      }
      setVerificationLoading(true);
      // Simulate OTP verification (e.g., '123456' as a valid OTP)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (signUpData.otp === "123456") {
        showMessage(
          "Account created successfully and phone number verified!",
          "success"
        );
        // Redirect to the root path after successful submission
        setTimeout(() => {
          navigate("/");
        }, 1000); // Wait 1 second before redirecting to show success message
      } else {
        showMessage("Invalid OTP. Please try again.", "error");
      }
      setVerificationLoading(false);
    }
  };

  // Effect to handle responsive banner image swapping
  useEffect(() => {
    const handleResize = () => {
      // Set the mobile banner for screens smaller than 768px (md breakpoint)
      if (window.innerWidth < 768) {
        setActiveBanner(LoginBannerMobile);
      } else {
        setActiveBanner(LoginBanner);
      }
    };

    // Set the initial banner on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa] font-sans">
      <div className="max-w-[1120px] mx-auto px-5">
        <div
          className="w-full flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden relative"
          style={{
            backgroundImage: `url(${activeBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* This div acts as the left half of the flex container on desktop */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center p-0 relative z-10">
            {/* The backdrop blur creates a frosted glass effect */}
          </div>

          {/* Form Container */}
          <div className="relative z-10 w-full md:w-1/2 p-5 md:px-10 md:py-20 flex flex-col gap-5 bg-transparent bg-opacity-90 md:bg-opacity-80 rounded-b-2xl md:rounded-l-none md:rounded-r-2xl">
            {/* The message box for user feedback */}
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
              Create Account
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-2 sm:gap-5"
            >
              {/* Step 1: Account Details */}
              {currentStep === 1 && (
                <>
                  {/* Name Input */}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-2 items-center">
                      <p className="text-[16px] leading-[24px] font-semibold text-black">
                        Name
                      </p>
                      <Star
                        className="w-2 h-2 text-[#dc3545] self-start translate-y-2"
                        fill="#dc3545"
                      />
                    </div>
                    <input
                      required
                      onChange={inputChangeHandler}
                      value={signUpData.name}
                      name="name"
                      type="text"
                      className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200  outline-none rounded-md bg-white"
                      autoComplete="name"
                      placeholder="Your Full Name"
                    />
                  </div>

                  {/* Phone Number Input with +91 prefix */}
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
                        required
                        onChange={inputChangeHandler}
                        value={signUpData.phone}
                        name="phone"
                        type="tel"
                        maxLength="10"
                        className="flex-1 transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 outline-none rounded-r-md bg-white"
                        placeholder="10-digit number"
                        autoComplete="tel"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: OTP Verification */}
              {currentStep === 2 && (
                <>
                  <p className="text-[18px] leading-[27px] font-semibold text-black mb-2">
                    Verify Phone Number
                  </p>
                  <div className="flex flex-col gap-1 w-full">
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
                      value={signUpData.otp}
                      name="otp"
                      onChange={inputChangeHandler}
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      className="transition-colors duration-300 text-black text-[18px] leading-[27px] font-medium py-2 px-4 rounded-md border focus:border-[#00bbae] focus:outline-none w-full border-gray-200 bg-white"
                      autoComplete="one-time-code"
                    />
                    <div className="flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="mt-2 text-left text-[14px] leading-[20px] transition-colors duration-300 font-semibold text-gray-600 hover:text-gray-800 cursor-pointer"
                      >
                        ← Back to details
                      </button>
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={
                          otpRequestLoading || signUpData.phone.length !== 10
                        }
                        className={`my-1 text-left text-[14px] leading-[20px] transition-colors duration-300 font-semibold ${
                          otpRequestLoading || signUpData.phone.length !== 10
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-[#00bbae] hover:text-[#f88e0f] cursor-pointer"
                        }`}
                      >
                        {otpRequestLoading ? (
                          <Loader className="w-4 h-4 inline-block animate-spin mr-1" />
                        ) : (
                          "Resend OTP"
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="rounded-md w-full sm:w-auto px-6 py-3 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center mt-5"
                disabled={currentStep === 2 && verificationLoading}
              >
                {currentStep === 1 ? (
                  otpRequestLoading ? (
                    <Loader className="w-6 h-6 text-white animate-spin" />
                  ) : (
                    "Next"
                  )
                ) : verificationLoading ? (
                  <Loader className="w-6 h-6 text-white animate-spin" />
                ) : (
                  "Verify & Create Account"
                )}
              </button>
              {/* Navigation and Submit Buttons */}
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 justify-end w-full items-start sm:items-center pt-5">
                <div className="flex gap-3 items-center">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">
                    Already have an account?
                  </p>
                  <Link
                    to="/sign-in"
                    className="text-[16px] leading-[24px] text-pink-600 transition-colors duration-300 hover:text-[#f88e0f] font-semibold"
                  >
                    Sign In
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

export default SignUp;

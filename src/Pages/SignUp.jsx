import React, { useState } from "react";
import { Loader, Star, UploadCloud } from "lucide-react";
import Sign from "../assets/sign.webp";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate for redirection

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Mocking Link component for demonstration
  // const Link = ({ to, children, className }) => (
  //   <a href={to} className={className}>
  //     {children}
  //   </a>
  // );

  const [currentStep, setCurrentStep] = useState(1); // 1: Fill details, 2: Verify OTP
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    phone: "", // Will store only the 10 digits
    imageFile: null, // Stores the File object
    imagePreviewUrl: null, // Stores the URL for image preview
    otp: "", // For OTP verification
  });

  const [otpSent, setOtpSent] = useState(false); // True after OTP is "sent"
  const [otpRequestLoading, setOtpRequestLoading] = useState(false); // Loading for "Request OTP"
  const [verificationLoading, setVerificationLoading] = useState(false); // Loading for "Verify & Create Account"

  // Handler for all text/number inputs
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      // Allow only digits and limit to 10
      const re = /^[0-9\b]+$/;
      if (value === "" || (re.test(value) && value.length <= 10)) {
        setSignUpData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handler for image file input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSignUpData((prev) => ({
        ...prev,
        imageFile: file,
        imagePreviewUrl: URL.createObjectURL(file), // Create a URL for preview
      }));
    } else {
      setSignUpData((prev) => ({
        ...prev,
        imageFile: null,
        imagePreviewUrl: null,
      }));
    }
  };

  // Function to validate all fields in Step 1
  const validateStep1 = () => {
    const { name, email, phone } = signUpData;

    if (!name || !email || !phone) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  // Handles requesting OTP for the phone number
  const handleRequestOtp = async () => {
    if (signUpData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number to request OTP.");
      return;
    }
    setOtpRequestLoading(true);
    console.log(`Requesting OTP for phone: +91${signUpData.phone}`);
    // Simulate API call for sending OTP
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOtpSent(true);
    setOtpRequestLoading(false);
    alert(`OTP sent to +91${signUpData.phone}. (Simulated)`);
  };

  // Handles the main form submission (either "Next" or "Verify & Create Account")
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentStep === 1) {
      if (validateStep1()) {
        await handleRequestOtp(); // Request OTP and then move to step 2
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (!signUpData.otp) {
        alert("Please enter the OTP.");
        return;
      }
      setVerificationLoading(true);
      console.log("Verifying OTP and creating account:", signUpData);
      // Simulate OTP verification (e.g., '123456' as a valid OTP)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (signUpData.otp === "123456") {
        alert("Account created successfully and phone number verified!");
        // Here you would typically send all signUpData to your backend for final registration
        console.log("Final Account Data:", {
          name: signUpData.name,
          email: signUpData.email,
          phone: `+91${signUpData.phone}`,
          imageFile: signUpData.imageFile
            ? signUpData.imageFile.name
            : "No image",
        });
        // Clear form data after successful submission
        setSignUpData({
          name: "",
          email: "",
          phone: "",
          imageFile: null,
          imagePreviewUrl: null,
          otp: "",
        });
        setOtpSent(false);
        setCurrentStep(1); // Reset to first step for potential new sign-up

        // Redirect to the root path
        navigate("/");
      } else {
        alert("Invalid OTP. Please try again.");
      }
      setVerificationLoading(false);
    }
  };

  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa] font-sans">
      <div className="max-w-[992px] mx-auto px-5">
        <div className="w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 p-0">
            <img
              src={Sign}
              alt="Sign Up Illustration"
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
              Create Account
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full border border-gray-200 rounded-2xl p-5 flex flex-col gap-2 sm:gap-4"
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
                      className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      autoComplete="name"
                      placeholder="Your Full Name"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex gap-2 items-center">
                      <p className="text-[16px] leading-[24px] font-semibold text-black">
                        Email address
                      </p>
                      <Star
                        className="w-2 h-2 text-[#dc3545] self-start translate-y-2"
                        fill="#dc3545"
                      />
                    </div>
                    <input
                      required
                      onChange={inputChangeHandler}
                      value={signUpData.email}
                      name="email"
                      type="email"
                      className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                      autoComplete="email"
                      placeholder="your.email@example.com"
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
                      <span className="flex items-center bg-gray-100 border border-gray-200 rounded-l-md px-4 text-[18px] leading-[27px] font-medium text-black">
                        +91
                      </span>
                      <input
                        required
                        onChange={inputChangeHandler}
                        value={signUpData.phone}
                        name="phone"
                        type="tel"
                        maxLength="10"
                        className="flex-1 transition-colors text-[18px] leading-[27px] duration-300 w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-r-md"
                        placeholder="10-digit number"
                        autoComplete="tel"
                      />
                    </div>
                  </div>

                  {/* Image Upload (Optional) */}
                  <div className="flex flex-col gap-1 w-full">
                    <p className="text-[16px] leading-[24px] font-semibold text-black">
                      Profile Image (Optional)
                    </p>
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center border border-gray-200 rounded-md px-4 py-2 cursor-pointer hover:border-[#00bbae] transition-colors duration-300"
                    >
                      <UploadCloud className="w-5 h-5 mr-2 text-gray-600" />
                      <span className="text-[16px] leading-[24px] text-gray-600">
                        {signUpData.imageFile
                          ? signUpData.imageFile.name
                          : "Choose File"}
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    {signUpData.imagePreviewUrl && (
                      <div className="mt-2">
                        <img
                          src={signUpData.imagePreviewUrl}
                          alt="Image Preview"
                          className="w-24 h-24 object-cover rounded-md border border-gray-200"
                        />
                      </div>
                    )}
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
                      className="transition-colors duration-300 text-black text-[18px] leading-[27px] font-medium py-2 px-4 rounded-md border focus:border-[#00bbae] focus:outline-none w-full border-gray-200"
                      autoComplete="one-time-code"
                    />
                    <button
                      type="button"
                      onClick={handleRequestOtp}
                      disabled={
                        otpRequestLoading || signUpData.phone.length !== 10
                      }
                      className={`mt-2 text-left text-[14px] leading-[20px] transition-colors duration-300 font-semibold ${
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
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="mt-2 text-left text-[14px] leading-[20px] transition-colors duration-300 font-semibold text-gray-600 hover:text-gray-800 cursor-pointer"
                    >
                      ← Back to details
                    </button>
                  </div>
                </>
              )}

              {/* Navigation and Submit Buttons */}
              <div className="flex sm:flex-row flex-col sm:gap-0 gap-3 justify-between w-full items-start sm:items-center mt-4">
                <div className="flex gap-3 items-center">
                  <p className="text-[16px] leading-[24px] font-semibold text-black">
                    Already have an account?
                  </p>
                  <Link
                    to="/sign-in"
                    className="text-[16px] leading-[24px] text-[#00bbae] transition-colors duration-300 hover:text-[#f88e0f] font-semibold"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="rounded-xl w-full sm:w-auto px-6 py-3 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center mt-5"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

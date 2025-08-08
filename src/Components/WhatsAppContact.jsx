import React, { useState } from "react";
import { IoSend, IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbMessageCircleFilled } from "react-icons/tb";

const WhatsAppContact = ({ show, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const countryCode = "+91";

  const handleSendText = () => {
    if (phoneNumber.length === 10) {
      const whatsappUrl = `https://wa.me/${countryCode.replace(
        "+",
        ""
      )}${phoneNumber}`;
      window.open(whatsappUrl, "_blank");
    } else {
      console.error("Please enter a valid 10-digit phone number.");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };
  if (!show) {
    return null;
  }

  return (
    <div className="fixed right-5 bottom-40 w-[350px] h-auto bg-linear-45 from-green-400 to-green-900 rounded-lg shadow-lg text-white z-50">
      <div className="relative">
        <div className="p-4">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp Icon"
              className="h-10 w-10 mr-2"
            />
            <h1 className="text-2xl font-bold">WhatsApp Supporta</h1>
          </div>
        </div>
        <div className="p-4 bg-green-50 rounded-b-md">
          <h1 className="text-2xl text-gray-900 font-bold">👋 Hi there!</h1>
          <div className="rounded-md">
            <p className="text-gray-900 mb-3">
              Need help? Let's chat on WhatsApp.
            </p>

            <div className="flex items-center bg-gray-50 border border-gray-400 rounded-md mb-2">
              <div className="flex items-center p-3 border-r border-gray-400 text-black">
                <span role="img" aria-label="India Flag" className="mr-2">
                  🇮🇳
                </span>
                {/* <span>{countryCode}</span> */}
              </div>
              <input
                type="tel"
                className="flex-grow bg-transparent p-3 outline-none text-black placeholder-gray-500"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter Your number"
                maxLength={10}
              />
            </div>
            <p className="text-gray-600 mb-2">We'll reply instantly!</p>

            <button
              onClick={handleSendText}
              className="w-full bg-green-900 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center transition duration-300"
            >
              <TbMessageCircleFilled className="h-5 w-5 mr-2" />
              Start WhatsApp Chat
            </button>
          </div>
          <div className="flex gap-1 p-4">
            <IoShieldCheckmarkOutline className="h-5 w-5 mr-2 text-green-900" />
            <p className="text-gray-600">100% safe & private conversation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [isWhatsAppVisible, setIsWhatsAppVisible] = useState(true);

  const toggleWhatsApp = () => {
    setIsWhatsAppVisible(!isWhatsAppVisible);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <button
        onClick={toggleWhatsApp}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        {isWhatsAppVisible ? "Hide WhatsApp Widget" : "Show WhatsApp Widget"}
      </button>

      <WhatsAppContact
        show={isWhatsAppVisible}
        onClose={() => setIsWhatsAppVisible(false)}
      />
    </div>
  );
};

export default WhatsAppContact;

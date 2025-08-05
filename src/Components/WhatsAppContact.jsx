import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

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
    <div
      className="fixed right-5 bottom-40 w-[350px] h-auto bg-gray-800 rounded-lg shadow-lg text-white z-50"
      style={{ background: "linear-gradient(to bottom, #1a2a2a, #3a3a3a)" }}
    >
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

          <div className="flex items-center mb-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp Icon"
              className="h-10 w-10 mr-2"
            />
            <h1 className="text-2xl font-bold">Hi there 👋</h1>
          </div>

          <p className="text-gray-300 mb-8">
            We are here to help. Chat with us on WhatsApp for any queries.
          </p>
        </div>
        <div className="p-4 bg-white rounded-b-md">
          <div className="bg-white p-4 rounded-md -mt-[50px]">
            <p className="text-gray-900 mb-2">Hey, how can we help you?</p>

            <div className="flex items-center bg-gray-300 rounded-md mb-6">
              <div className="flex items-center p-3 border-r border-gray-400 text-black">
                <span role="img" aria-label="India Flag" className="mr-2">
                  🇮🇳
                </span>
                <span>{countryCode}</span>
              </div>
              <input
                type="tel"
                className="flex-grow bg-transparent p-3 outline-none text-black placeholder-gray-400"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter Your number"
                maxLength={10}
              />
            </div>

            <button
              onClick={handleSendText}
              className="w-full bg-green-900 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center transition duration-300"
            >
              <IoSend className="h-5 w-5 mr-2" />
              Send Us a Text
            </button>
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

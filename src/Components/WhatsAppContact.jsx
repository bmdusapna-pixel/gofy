import React, { useState } from "react";

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
      className="fixed right-5 bottom-40 w-[300px] h-auto bg-gray-800 rounded-lg shadow-lg text-white z-50"
      style={{ background: "linear-gradient(to bottom, #1a2a2a, #3a3a3a)" }}
    >
      <div className="p-4 relative">
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

        <div className="flex items-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp Icon"
            className="h-10 w-10 mr-2"
          />
          <h1 className="text-2xl font-bold">Hi there 👋</h1>
        </div>

        <p className="text-gray-300 mb-6">
          We are here to help. Chat with us on WhatsApp for any queries.
        </p>

        <p className="text-gray-200 mb-2">Hey, how can we help you?</p>

        <div className="flex items-center bg-gray-700 rounded-md mb-6">
          <div className="flex items-center p-3 border-r border-gray-600">
            <span role="img" aria-label="India Flag" className="mr-2">
              🇮🇳
            </span>
            <span>{countryCode}</span>
          </div>
          <input
            type="tel"
            className="flex-grow bg-transparent p-3 outline-none text-white placeholder-gray-400"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter 10-digit number"
            maxLength={10}
          />
        </div>

        <button
          onClick={handleSendText}
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-4 rounded-md flex items-center justify-center transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          Send Us a Text
        </button>
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

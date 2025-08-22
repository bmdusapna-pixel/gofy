import React, { useState } from "react";
import { Copy } from "lucide-react"; // icon
import Refer from "../assets/refer.jpg";

export default function ReferEarn() {
  const [copied, setCopied] = useState(false);
  const referralCode = "TYLP0063";

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* Illustration placeholder */}
      <div className="w-full md:w-[50%] flex justify-center mb-4">
        <img src={Refer} />
      </div>

      <h2 className="text-lg font-semibold">
        Invite Friends Your Friend & Earn Gofy Points
      </h2>
      <p className="text-gray-500 text-sm mt-2 max-w-md">
        Share your unique referral code with friends. When they make their first
        purchase, you&apos;ll both earn 500 points
      </p>

      {/* Referral Code Box */}
      <div className="flex items-center border border-gray-300 rounded-lg mt-4">
        <input
          type="text"
          readOnly
          value={referralCode}
          className="flex-1 px-3 py-2 text-gray-700 bg-white rounded-l-lg outline-none"
        />
        <button
          onClick={copyCode}
          className="px-3 py-2 text-blue-600 hover:text-blue-800"
        >
          <Copy size={18} />
        </button>
      </div>

      {/* Feedback */}
      {copied && <span className="text-green-600 text-xs mt-1">Copied!</span>}

      {/* Button */}
      <button className="bg-[#00bbae] text-white font-medium rounded-full px-6 py-2 mt-5 hover:bg-blue-700 transition">
        Refer Now
      </button>
    </div>
  );
}

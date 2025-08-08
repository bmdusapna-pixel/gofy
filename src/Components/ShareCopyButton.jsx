import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";

const ShareCopyButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={handleCopy}
        className="w-8 h-8 rounded-md bg-white text-gray-400 transition-colors hover:text-white hover:bg-[#00bbae] cursor-pointer flex items-center justify-center"
      >
        <FontAwesomeIcon className="w-4 h-4" icon={faShare} />
      </div>

      {/* "Copied!" tooltip */}
      {copied && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 shadow">
          Copied!
        </div>
      )}
    </div>
  );
};

export default ShareCopyButton;

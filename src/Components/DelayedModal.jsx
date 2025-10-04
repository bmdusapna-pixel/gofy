import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function DelayedModal({
  imageUrl,
  linkUrl,
  autoCloseDelay = 5000,
}) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const hideTimeout = setTimeout(() => {
      setIsOpen(false);
    }, autoCloseDelay);

    return () => clearTimeout(hideTimeout);
  }, [isOpen, autoCloseDelay]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-lg w-2xl flex flex-col items-center gap-4">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Image with Link */}
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={imageUrl}
            alt="Modal Content"
            className="w-full h-auto rounded-md"
          />
        </a>
      </div>
    </div>
  );
}

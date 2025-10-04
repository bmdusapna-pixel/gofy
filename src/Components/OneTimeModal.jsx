import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import { AuthContext } from "../Context/AuthContext.jsx";

export default function OneTimeModal({ imageUrl, linkUrl }) {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const storageKey = `oneTimeModalShown_${user?.id}`;

  useEffect(() => {
    if (!user || localStorage.getItem(storageKey)) return;

    const showTimeout = setTimeout(() => {
      setIsOpen(true);

      const hideTimeout = setTimeout(() => {
        setIsOpen(false);
        localStorage.setItem(storageKey, "true");
      }, 5000);

      return () => clearTimeout(hideTimeout);
    }, 5000);

    return () => clearTimeout(showTimeout);
  }, [user, storageKey]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-lg w-2xl flex flex-col items-center gap-4">
        <button
          onClick={() => {
            setIsOpen(false);
            localStorage.setItem(storageKey, "true");
          }}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

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

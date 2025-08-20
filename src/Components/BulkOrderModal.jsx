import React from "react";
import { X } from "lucide-react";

const BulkOrderModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  transition-opacity duration-300"
      style={{ background: "rgba(0,0,0,0.3)" }}
    >
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-xl transform transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
        <div className="text-center">
          <h3 className="mb-4 text-xl font-semibold text-gray-900">
            Bulk Order Alert
          </h3>
          <p className="text-gray-600">
            You are adding more than 5 items. You can buy in bulk to get a
            discount. Do you want to continue?
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={onConfirm}
              className="rounded-lg bg-[#00bbae] px-4 py-2 text-white font-medium hover:bg-green-600 transition-colors"
            >
              Continue
            </button>
            <button
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
          </div>
          <div className="mt-4">
            <a
              href="https://wa.me/1234567890?text=Hello%2C%20I%20would%20like%20to%20chat%20with%20you%20on%20WhatsApp"
              target="_blank"
            >
              Or chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkOrderModal;

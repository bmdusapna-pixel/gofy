import { Plus } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import BulkBanner from "../assets/bulkBanner.png";
import SearchInput from "../Components/SearchInput";
import { groupedCombined } from "../assets/helper.js";
import { FaWhatsapp } from "react-icons/fa"; // Assuming you have react-icons installed
import { AuthContext } from "../Context/AuthContext.jsx";

const BulkOrder = () => {
  const [productItems, setProductItems] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useContext(AuthContext);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    phone: "",
    additionalNotes: "",
  });

  useEffect(() => {
    const productsData = groupedCombined;
    setProductItems(productsData);
    setContactDetails({ name: user?.name || "", phone: user?.phone || "" });
  }, [user]);

  const allItems = productItems.map((item) => item.items);
  const names = allItems.flatMap((group) => group.map((item) => item.name));

  const [productDetails, setProductDetails] = useState([
    {
      _id: Date.now(),
      name: "",
      quantity: "",
    },
  ]);

  const handleAddProduct = () => {
    setProductDetails((prev) => [
      ...prev,
      { _id: Date.now(), name: "", quantity: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...productDetails];
    updated[index][field] = value;
    setProductDetails(updated);
  };

  const handleContactChange = (field, value) => {
    setContactDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    setIsSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210";
    const message = `Hello, I would like to place a bulk order. My details are:\n\nName: ${
      contactDetails.name
    }\nPhone: ${contactDetails.phone}\n\nOrder Details:\n${productDetails
      .map((p) => `- ${p.name}: ${p.quantity}`)
      .join("\n")}\n\nAdditional Notes: ${contactDetails.additionalNotes}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  if (isSubmitted) {
    return (
      <div className="w-full h-full sm:px-0 px-5 py-10 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto my-10 flex flex-col items-center gap-8 p-10 bg-white rounded-2xl shadow-lg">
          <svg
            className="w-24 h-24 text-[#00bbae]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p className="text-4xl font-bold text-center text-black">
            Thank You for Your Order!
          </p>
          <p className="text-lg text-gray-700 text-center max-w-lg">
            Your bulk order request has been successfully submitted. We will
            review the details and get back to you with a quote within 24-48
            hours.
          </p>
          <div className="flex flex-col items-center gap-4 mt-5">
            <p className="text-xl font-semibold text-gray-800">
              Need immediate assistance?
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-lg transition-transform transform hover:scale-105"
            >
              <FaWhatsapp className="w-6 h-6" />
              Chat with Us on WhatsApp
            </button>
            <p className="text-sm text-gray-500">
              By clicking, you will be redirected to WhatsApp with your order
              details pre-filled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full sm:px-0 px-5 py-10 bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-5 w-full bg-white rounded-2xl overflow-hidden">
          <img src={BulkBanner} alt="" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
            <p className="text-[30px] leading-[40px] font-semibold text-black">
              Contact Information
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              <input
                type="text"
                placeholder="Name"
                className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                value={contactDetails.name}
                onChange={(e) => handleContactChange("name", e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                value={contactDetails.phone}
                onChange={(e) => handleContactChange("phone", e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
            <p className="text-[30px] leading-[40px] font-semibold text-black">
              Order Details
            </p>
            {productDetails.map((product, index) => (
              <div
                key={product._id}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
              >
                <SearchInput items={names} />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                  value={product.quantity}
                  onChange={(e) =>
                    handleInputChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={handleAddProduct}
            >
              <p className="text-[16px] leading-[24px] text-black font-semibold">
                Add
              </p>
              <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#00bbae]">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
            <p className="text-[30px] leading-[40px] font-semibold text-black">
              Additional Notes
            </p>
            <textarea
              rows="4"
              className="transition-colors duration-300 w-full text-[18px] leading-[27px] border border-gray-200 focus:border-[#00bbae] outline-none p-4 rounded-md"
              value={contactDetails.additionalNotes}
              onChange={(e) =>
                handleContactChange("additionalNotes", e.target.value)
              }
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#00bbae] text-white rounded-md"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkOrder;

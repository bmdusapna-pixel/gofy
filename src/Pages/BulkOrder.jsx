import { Plus } from "lucide-react";
import React, { useState } from "react";

const BulkOrder = () => {
  const [productDetails, setProductDetails] = useState([
    {
      _id: Date.now(),
      name: "",
      quantity: "",
    },
  ]);

  // const [bulkOrderDetails, setBulkOrderDetails] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  //   company: "",
  // });

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

  return (
    <div className="w-full h-full sm:px-0 px-5 py-10 bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
          <p className="text-[30px] leading-[40px] font-semibold text-black">
            Contact Information
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <input
              type="text"
              placeholder="Name"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            {/* <input type="text" placeholder="Email" className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" /> */}
            {/* <input type="text" placeholder="Company Name (optional)" className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md" /> */}
            <input
              type="tel"
              placeholder="Phone"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
          </div>
        </div>
        {/* <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
          <p className="text-[30px] leading-[40px] font-semibold text-black">
            Shipping Address
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <input
              type="text"
              placeholder="House number and street name"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              type="text"
              placeholder="Apartments, suits, unit, etc. (optional)"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              type="text"
              placeholder="Town / City"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              type="tel"
              placeholder="Zip / Postal Code"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              type="text"
              placeholder="State"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
          </div>
        </div> */}
        <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
          <p className="text-[30px] leading-[40px] font-semibold text-black">
            Order Details
          </p>
          {productDetails.map((product, index) => (
            <div
              key={product._id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full"
            >
              <input
                type="text"
                placeholder="Product Name"
                className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
                value={product.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
              />
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
        {/* <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
          <p className="text-[30px] leading-[40px] font-semibold text-black">
            Delivery Details
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <input
              type="date"
              placeholder="Product Name"
              className="transition-colors duration-300 text-[18px] leading-[27px] w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <select
              name=""
              id=""
              className="w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            >
              <option value="">Standard</option>
              <option value="">Express</option>
              <option value="">Pickup</option>
              <option value="">DTDC</option>
            </select>
          </div>
        </div> */}
        <div className="flex flex-col gap-5 w-full p-5 sm:p-8 bg-white rounded-2xl">
          <p className="text-[30px] leading-[40px] font-semibold text-black">
            Additional Notes
          </p>
          <textarea
            rows="4"
            className="transition-colors duration-300 w-full text-[18px] leading-[27px] border border-gray-200 focus:border-[#00bbae] outline-none p-4 rounded-md"
            name=""
            id=""
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-[#00bbae] text-white rounded-md">
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkOrder;

import React, { useState } from "react";
import { Star, User2Icon, Loader } from "lucide-react"; // Assuming you have lucide-react installed

const ProductReviews = ({ items }) => {
  const [reviewData, setReviewData] = useState({
    starRating: 0,
    description: "",
    name: "",
    email: "",
    media: null, // For image/video upload
  });
  const [formSubmit, setFormSubmit] = useState(false);

  // Demo data for product reviews (moved inside the component for direct use)
  const product_reviews = [
    {
      _id: 1,
      name: "Alice Johnson",
      date: "2025-07-18",
      description: "Fantastic quality and fast delivery. Highly recommend!",
      rating: 5,
      image: "https://via.placeholder.com/100/FF5733/FFFFFF?text=Review+Pic", // Example image URL
    },
    {
      _id: 2,
      name: "Bob Smith",
      date: "2025-07-17",
      description:
        "The product is decent for the price, but packaging could be better.",
      rating: 4,
    },
    {
      _id: 3,
      name: "Charlie Davis",
      date: "2025-07-16",
      description:
        "Not satisfied with the product. It didn’t match the description.",
      rating: 2,
      image: "https://via.placeholder.com/100/33FF57/FFFFFF?text=Another+Pic", // Example image URL
    },
  ];

  const giveStarRating = (rating) => {
    setReviewData({ ...reviewData, starRating: rating });
  };

  const inputChangeHandler = (e) => {
    const { name, value, files } = e.target;
    if (name === "media") {
      setReviewData({ ...reviewData, media: files[0] });
    } else {
      setReviewData({ ...reviewData, [name]: value });
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setFormSubmit(true);
    // In a real application, you would send reviewData to your backend API
    console.log("Submitting review:", reviewData);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
    setFormSubmit(false);
    // Optionally reset the form after submission
    setReviewData({
      starRating: 0,
      description: "",
      name: "",
      email: "",
      media: null,
    });
  };

  return (
    <div className="w-full border border-gray-200 rounded-2xl p-6 bg-white relative">
      <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 flex gap-4 items-center w-max">
        <p
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
          className="px-4 lg:px-8 py-1.5 lg:py-2 rounded-full text-black bg-[#f9f9f9] text-[20px] leading-[30px] md:text-[24px] md:leading-[37px] font-semibold"
        >
          Reviews
        </p>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <p className="text-[18px] leading-[27px] text-black font-semibold">
          {items?.review || product_reviews.length} review
          {product_reviews.length !== 1 ? "s" : ""} for{" "}
          {items?.name || "this product"}
        </p>
        <div className="flex flex-col gap-3 w-full">
          {product_reviews.map((product) => (
            <div
              className="flex sm:flex-row flex-col justify-between w-full sm:gap-0 gap-4 border-gray-200 rounded-md p-4 sm:p-6 border-[1px]" // Smaller padding
              key={product._id}
            >
              <div className="flex gap-3 sm:gap-5 w-full">
                <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center rounded-full bg-gray-300 p-2">
                  <User2Icon className="w-5 sm:w-7 h-5 sm:h-7 text-white" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex gap-1 items-center">
                    <p className="text-[16px] text-black leading-[24px] font-semibold">
                      {product.name}
                    </p>
                    <p className="text-[14px] text-gray-500 leading-[21px] font-medium">
                      {" "}
                      - {product.date}
                    </p>
                  </div>
                  <p className="text-[15px] text-gray-500 leading-[22px] font-medium w-full">
                    {" "}
                    {/* Slightly smaller font */}
                    {product.description}
                  </p>
                  {product.image && (
                    <img
                      src={product.image}
                      alt="Review media"
                      className="mt-2 rounded-md max-w-[100px] h-auto"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-0.5 mt-2 sm:mt-0">
                {" "}
                {/* Adjusted margin for mobile */}
                {Array.from({ length: Math.floor(product.rating) }).map(
                  (_, index) => (
                    <Star
                      key={index}
                      className="w-4 h-4 text-yellow-500"
                      fill="#f88e0f"
                    />
                  )
                )}
                {Array.from({ length: 5 - Math.floor(product.rating) }).map(
                  // To show unselected stars
                  (_, index) => (
                    <Star
                      key={`empty-${index}`}
                      className="w-4 h-4 text-yellow-500"
                      fill="#f8f9fa"
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <p className="text-[18px] leading-[27px] text-black font-semibold">
            Add a review
          </p>
          <p className="text-[16px] text-red-600 leading-[24px] font-medium w-full">
            Your email address will not be published. Required fields are marked
            *
          </p>
        </div>
        <div className="flex gap-8 w-full items-center">
          <p className="text-[14px] leading-[21px] font-semibold text-black">
            Your Rating
          </p>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                onClick={() => giveStarRating(i + 1)}
                className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                  i < reviewData.starRating
                    ? "text-yellow-500"
                    : "text-[#d1d5db]"
                }`}
                fill={i < reviewData.starRating ? "#f59e0b" : "#d1d5db"}
              />
            ))}
          </div>
        </div>
        <form onSubmit={submitReview} className="w-full flex-col flex gap-5">
          <textarea
            required
            placeholder="Your Review *"
            rows="1"
            style={{ minHeight: "50px" }}
            className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full border border-gray-200 focus:border-[#00bbae] outline-none p-4 rounded-md"
            name="description"
            onChange={inputChangeHandler}
            value={reviewData.description}
            id=""
          ></textarea>
          <label htmlFor="media-upload" className="custom-file-upload">
            Upload image/video (optional)
          </label>
          <input
            type="file"
            name="media"
            onChange={inputChangeHandler}
            className="transition-colors duration-300 text-[16px] leading-[24px] font-medium w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            accept="image/*,video/*"
          />
          <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 w-full items-center">
            <input
              required
              placeholder="Your name *"
              name="name"
              value={reviewData.name}
              onChange={inputChangeHandler}
              type="text"
              className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              required
              placeholder="Your email *"
              name="email"
              value={reviewData.email}
              onChange={inputChangeHandler}
              type="email" // Changed type to email for better validation
              className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
            disabled={formSubmit} // Disable button during submission
          >
            {formSubmit ? (
              <Loader className="w-6 h-6 text-white animate-spin" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;

import React, { useState, useEffect } from "react";
import { Star, User2Icon, Loader } from "lucide-react"; // Assuming you have lucide-react installed
import api from "../api/axios";

const getReviewsApi = async () => {
  const res = await api.get(`/reviews`);
  return res.data;
};

const postReviewApi = async (reviewData, productId) => {
  const formData = new FormData();
  // Append primitive fields
  formData.append("rating", String(reviewData.rating ?? 0));
  formData.append("reviewText", reviewData.reviewText ?? "");
  formData.append("name", reviewData.name ?? "");
  formData.append("email", reviewData.email ?? "");
  if (productId) formData.append("product", productId);
  if (reviewData.media) {
    formData.append("images", reviewData.media);
  }

  const config = { headers: { "Content-Type": "multipart/form-data" } };

  if (productId) {
    try {
      const res = await api.post(
        `/products/${productId}/reviews`,
        formData,
        config
      );
      return res.data;
    } catch (err) {
      if (err?.response?.status && err.response.status !== 404) {
        console.error(
          "postReviewApi failed on product endpoint:",
          err?.response?.status,
          err?.message || err
        );
        throw err;
      }
    }
  }

  try {
    const res = await api.post("/reviews", formData, config);
    return res.data;
  } catch (err) {
    const status = err?.response?.status;
    const serverMsg =
      err?.response?.data?.message || err?.response?.data || err?.message;
    console.error(
      "postReviewApi failed on generic endpoint:",
      status,
      serverMsg
    );
    const errorToThrow = new Error(
      `Review submission failed${
        status ? ` (status ${status})` : ""
      }: ${serverMsg}`
    );
    errorToThrow.response = err?.response;
    throw errorToThrow;
  }
};

const ProductReviews = ({ items }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    rating: 0,
    reviewText: "",
    name: "",
    email: "",
    media: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setError(null);
      setIsLoading(true);
      if (!import.meta.env.VITE_BASE_URL) {
        console.warn("VITE_BASE_URL is not set — skipping reviews fetch");
        setReviews([]);
        return;
      }
      const fetchedReviews = await getReviewsApi(items?.id);
      setReviews(fetchedReviews || []);
    } catch (err) {
      setError("Failed to load reviews. Please try refreshing the page.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "media" && files) {
      setReviewData({ ...reviewData, media: files[0] });
    } else {
      setReviewData({ ...reviewData, [name]: value });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (reviewData.rating === 0) {
      alert("Please select a star rating.");
      return;
    }
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...reviewData,
      };
      await postReviewApi(submissionData, items?.id);
      await fetchReviews();
      setReviewData({
        rating: 0,
        reviewText: "",
        name: "",
        email: "",
        media: null,
      });
      e.target.reset();
    } catch (err) {
      const serverMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Please try again later.";
      alert(`Failed to submit review. ${serverMsg}`);
      console.error("Submission Error:", err);
    } finally {
      setIsSubmitting(false);
    }
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
          {items?.review || reviews.length} review
          {reviews.length !== 1 ? "s" : ""} for {items?.name || "this product"}
        </p>
        <div className="flex flex-col gap-3 w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col justify-center items-center h-48 text-red-600 bg-red-50 p-4 rounded-lg">
              <AlertTriangle className="w-8 h-8 mb-2" />
              <p>{error}</p>
            </div>
          ) : (
            reviews.map((product) => (
              <div
                className="flex sm:flex-row flex-col justify-between w-full sm:gap-0 gap-4 border-gray-200 rounded-md p-4 sm:p-6 border-[1px]"
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
                        -{" "}
                        {new Date(product.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <p className="text-[15px] text-gray-500 leading-[22px] font-medium w-full">
                      {" "}
                      {product.reviewText}
                    </p>

                    {/* Images / Videos */}
                    {product.images.length > 0 &&
                      product.images.map((p) => {
                        if (p.url.includes("image")) {
                          return (
                            <img
                              key={p.url}
                              src={p.url}
                              alt="Review media"
                              className="mt-2 rounded-md max-w-[100px] h-auto"
                            />
                          );
                        }
                        if (p.url.includes("video")) {
                          return (
                            <video
                              key={p.url}
                              src={p.url}
                              controls
                              className="mt-2 rounded-md max-w-[100px] h-auto"
                            />
                          );
                        }
                        return null;
                      })}
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mt-2 sm:mt-0">
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
            ))
          )}
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
                onClick={() => setReviewData({ ...reviewData, rating: i + 1 })}
                className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                  i < reviewData.rating ? "text-yellow-500" : "text-[#d1d5db]"
                }`}
                fill={i < reviewData.rating ? "#f59e0b" : "#d1d5db"}
              />
            ))}
          </div>
        </div>
        <form
          onSubmit={handleSubmitReview}
          className="w-full flex-col flex gap-5"
        >
          <textarea
            required
            placeholder="Your Review *"
            rows="1"
            style={{ minHeight: "50px" }}
            className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full border border-gray-200 focus:border-[#00bbae] outline-none p-4 rounded-md"
            name="reviewText"
            onChange={handleInputChange}
            value={reviewData.reviewText}
            id=""
          ></textarea>
          <label htmlFor="media-upload" className="custom-file-upload">
            Upload image/video (optional)
          </label>
          <input
            id="media-upload"
            type="file"
            name="media"
            onChange={handleInputChange}
            className="transition-colors duration-300 text-[16px] leading-[24px] font-medium w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            accept="image/*,video/*"
          />
          <div className="flex sm:flex-row flex-col gap-4 sm:gap-8 w-full items-center">
            <input
              required
              placeholder="Your name *"
              name="name"
              value={reviewData.name}
              onChange={handleInputChange}
              type="text"
              className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
            <input
              required
              placeholder="Your email *"
              name="email"
              value={reviewData.email}
              onChange={handleInputChange}
              type="email" // Changed type to email for better validation
              className="transition-colors duration-300 text-[16px] leading-[24px] font-medium placeholder:font-semibold w-full px-4 py-2 border border-gray-200 focus:border-[#00bbae] outline-none rounded-md"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl w-24 h-10 text-[18px] leading-[27px] font-semibold text-white transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer bg-[#00bbae] flex gap-3 items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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

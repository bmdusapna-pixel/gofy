import React from "react";

const ReviewForm = () => {
  return (
  <div className="w-full flex flex-col p-8 gap-6">
      {/* Title */}
      <div>
        <h2 className="text-[26px] font-semibold">Write a Review</h2>
        <p className="text-[#69778A]">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>

      {/* Comment Box */}
      <textarea
        className="w-full border border-[#E8E6E6] rounded-lg px-5 py-5"
        placeholder="Comment*"
      />

      {/* Name and Email */}
      <div className="flex flex-col lg:flex-row gap-5">
        <input
          className="w-full border border-[#E8E6E6] rounded-lg px-5 py-5"
          type="text"
          placeholder="Name*"
        />
        <input
          className="w-full border border-[#E8E6E6] rounded-lg px-5 py-5"
          type="email"
          placeholder="Email*"
        />
      </div>

      {/* Checkbox */}
      <div className="flex gap-2 items-start">
        <input type="checkbox" name="condition" id="condition" />
        <label htmlFor="condition" className="text-[#69778A]">
          Save my name, email, and website in this browser for the next time I comment.
        </label>
      </div>

      {/* Button */}
      <button className="w-fit bg-[#00BBAE] hover:bg-amber-500 text-white text-[18px] font-medium py-4 px-6 rounded-lg">
        Post Comment
      </button>
    </div>
  );
};


export default ReviewForm;

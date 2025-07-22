import React from "react";
import BlogContentData from "../../BlogContentData.json";

const BlogContent = () => {
  const { title, quote, paragraph1, paragraph2, paragraph3, paragraph4 } = BlogContentData;

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 text-[#001430]">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
        {title}
      </h1>

      {/* Paragraphs */}
      <p className="text-base md:text-lg leading-relaxed text-[#69778A] mb-5">
        {paragraph1}
      </p>
      <p className="text-base md:text-lg leading-relaxed text-[#69778A] mb-5">
        {paragraph2}
      </p>

      {/* Quote */}
      <blockquote className="border-l-4 border-teal-500 bg-teal-100 px-4 sm:px-6 md:px-10 py-4 text-[#001430] text-base md:text-lg font-medium italic my-6">
        {quote}
      </blockquote>

      <p className="text-base md:text-lg leading-relaxed text-[#69778A] mb-5">
        {paragraph3}
      </p>
      <p className="text-base md:text-lg leading-relaxed text-[#69778A] mb-5">
        {paragraph4}
      </p>
    </div>
  );
};

export default BlogContent;

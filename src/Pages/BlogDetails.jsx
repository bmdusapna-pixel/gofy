import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TagShareSection from "../Components/TagShareSection";
import AuthorInfo from "../Components/AuthorInfo";
import NextPostCard from "../Components/NextPostCard";
import ReviewForm from "../Components/ReviewForm";
import SearchBar from "../Components/SearchBar";
import Categories from "../Components/Categories";
import PopularNews from "../Components/PopularNews";
import Archives from "../Components/Archives";
import PopularTags from "../Components/PopularTags";
import OfferSection from "../Components/OfferSection";
import RelatedPost from "../Components/RelatedPost";
import api from "../api/axios";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await api.get(`/blogs/${encodeURIComponent(slug)}`);
        const data = res.data;
        setBlog(Array.isArray(data) ? data[0] : data);
      } catch (e) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchBlog();
  }, [slug]);

  const imageSrc = blog?.coverImage || blog?.image || blog?.banner;
  const author = blog?.author?.name || blog?.author || "Admin";
  const dateStr =
    blog?.publishedAt || blog?.createdAt || blog?.updatedAt || null;
  const dateLabel = dateStr
    ? new Date(dateStr).toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";
  const category = blog?.category || blog?.tag || "";

  return (
    <div className="bg-[#F9F9F9] max-w-[1400px] m-auto ">
      <div className="flex flex-col md:flex-col lg:flex-row justify-between ">
        {/* left section */}
        <div className="max-w-[1008px] mt-10 ">
          <div className="border border-[#E8E6E6] rounded-lg bg-white">
            {/* Blog-Image */}
            <div className="max-w-[1008px]">
              <div className="flex mx-[32px] items-center justify-center">
                {loading ? (
                  <div className="w-full h-72 bg-gray-100 rounded-lg animate-pulse mt-10" />
                ) : imageSrc ? (
                  <img
                    className="rounded-lg mt-10"
                    src={imageSrc}
                    alt={blog?.title || "Blog image"}
                  />
                ) : null}
              </div>
            </div>

            {/* Header-like meta */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-5 mx-4 md:mx-8">
              <div className="flex items-center gap-3">
                <span className="bg-gray-300 p-2 text-white rounded-full">
                  <span className="block h-6 w-6 md:h-7 md:w-7 bg-white rounded-full" />
                </span>
                <div>
                  <h3 className="text-[#69778A] text-sm">Posted by:</h3>
                  <h2 className="text-[#001430] text-base md:text-[16px]">
                    {author}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-teal-400 p-2 rounded-full bg-teal-100">
                  <span className="block h-6 w-6 md:h-7 md:w-7" />
                </div>
                <div>
                  <h3 className="text-[#69778A] text-sm">Date:</h3>
                  <h3 className="text-[#001430] text-base md:text-[16px]">
                    {dateLabel}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-amber-500 p-2 rounded-full bg-amber-100">
                  <span className="block h-6 w-6 md:h-7 md:w-7" />
                </div>
                <div>
                  <h3 className="text-[#69778A] text-sm">Category:</h3>
                  <h3 className="text-[#001430] text-base md:text-[16px]">
                    {category}
                  </h3>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="px-4 sm:px-6 md:px-8 py-6 text-[#001430] text-2xl sm:text-3xl md:text-4xl font-semibold">
              {blog?.title}
            </h1>

            {/* Content */}
            <div className="px-4 sm:px-6 md:px-8 pb-6 text-[#001430]">
              {loading && <p className="text-gray-600">Loading...</p>}
              {error && <p className="text-red-600">{error}</p>}
              {!loading &&
                !error &&
                blog?.content &&
                (typeof blog.content === "string" &&
                blog.content.includes("<") ? (
                  <div
                    className="prose max-w-none text-[#69778A]"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                ) : (
                  <p className="text-base md:text-lg leading-relaxed text-[#69778A]">
                    {blog.content}
                  </p>
                ))}
            </div>

            <TagShareSection />
          </div>
          <div>
            <AuthorInfo />
            <NextPostCard />
            <div className="flex items-center w-full gap-5 mt-10 bg-white border border-[#E8E6E6] rounded-lg ">
              <ReviewForm />
            </div>
          </div>
        </div>

        {/* right section */}
        <div className="w-full lg:w-[30%] px-4 py-10">
          <div className="flex gap-10 flex-col">
            <SearchBar />
            <Categories />
            <PopularNews />
            <Archives />
            <PopularTags />
            <OfferSection />
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto mt-20 bg-[#F9F9F9] px-4 sm:px-6 md:px-8 py-10 rounded-xl shadow-sm">
        <RelatedPost />
      </div>
    </div>
  );
};

export default BlogDetails;

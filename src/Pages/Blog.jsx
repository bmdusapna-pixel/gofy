import React, { useState, useEffect, useRef } from "react";
import BlogCard from "../components/BlogCard";
import { Search, MoveRight } from "lucide-react";

import BI1 from "../assets/blogimg/bi1.jpg";
import BI2 from "../assets/blogimg/bi2.jpg";
import BI3 from "../assets/blogimg/bi3.jpg";
import BI4 from "../assets/blogimg/bi4.jpg";
import BI5 from "../assets/blogimg/bi5.jpg";
import BI6 from "../assets/blogimg/bi6.jpg";
import BI7 from "../assets/blogimg/bi7.jpg";
import BI8 from "../assets/blogimg/bi8.jpg";
import BI9 from "../assets/blogimg/bi9.jpg";
import BI10 from "../assets/blogimg/bi10.jpg";

import PopularNews from "../components/PopularNews";
import Archives from "../components/Archives";
import PopularTags from "../components/PopularTags";
import OfferSection from "../components/OfferSection";

const Blog = () => {
  const blogs = [
    { Image: BI1, Tag: "Top Toys" },
    { Image: BI2, Tag: "Family Fun" },
    { Image: BI3, Tag: "Kids Activities" },
    { Image: BI4, Tag: "Learn and Inspire" },
    { Image: BI5, Tag: "Learn and Inspire" },
    { Image: BI6, Tag: "Top Toys" },
    { Image: BI7, Tag: "Family Fun" },
    { Image: BI8, Tag: "Kids Activities" },
    { Image: BI9, Tag: "Learn and Inspire" },
    { Image: BI10, Tag: "Learn and Inspire" },
    { Image: BI1, Tag: "Family Fun" },
    { Image: BI3, Tag: "Kids Activities" },
    { Image: BI6, Tag: "Top Toys" },
    { Image: BI7, Tag: "Family Fun" },
    { Image: BI8, Tag: "Kids Activities" },
    { Image: BI9, Tag: "Learn and Inspire" },
    { Image: BI10, Tag: "Learn and Inspire" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentBlogs = blogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(blogs.length / postsPerPage);

  const blogTopRef = useRef(null);

  useEffect(() => {
    if (blogTopRef.current) {
      blogTopRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <div className="flex max-w-[1400px] w-full px-5 mx-auto flex-col bg-[#F9F9F9] lg:flex-row gap-10 py-10">
      {/* Left Section */}
      <div ref={blogTopRef} className="w-full flex flex-col items-center lg:w-[70%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {currentBlogs.map((blog, index) => (
            <BlogCard key={index} Image={blog.Image} Tag={blog.Tag} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center text-xl gap-5 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-2 bg-[#00BBAE] text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-3 rounded ${
                currentPage === i + 1
                  ? "bg-[#00BBAE] text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-3 py-2 bg-[#00BBAE] text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[26%] flex flex-col gap-10">
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search blog..."
            className="w-full pr-12 pl-4 py-3 border border-[#E8E6E6] bg-white text-black placeholder:text-gray-500 rounded-lg outline-none"
          />
          <button
            type="submit"
            className="absolute top-1/2 -translate-y-1/2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="bg-white p-10 border border-[#E8E6E6] rounded-lg">
          <h2 className="text-[25px] text-[#001430] font-semibold mb-2">
            Categories
          </h2>
          <hr className="bg-amber-500 h-1 w-10 text-[20px] rounded-lg border-none mb-4" />
          <ul className="flex flex-col font-medium gap-4">
            {[
              "Family Fun (1)",
              "Kids Activities (1)",
              "Learn & Inspire (1)",
              "Tips & Tricks (1)",
              "Top Toys (5)",
              "Toy Reviews (2)",
              "Toy Trends (3)",
            ].map((item, index) => (
              <li
                key={index}
                className="group relative flex items-center gap-2 pl-6 cursor-pointer text-gray-500 hover:translate-x-2 transition-all"
              >
                <span className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <MoveRight className="text-[#00BBAE]" size={16} />
                </span>
                <a className="group-hover:text-[#00BBAE] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <PopularNews />
        <Archives />
        <PopularTags />
        <OfferSection />
      </div>
    </div>
  );
};

export default Blog;

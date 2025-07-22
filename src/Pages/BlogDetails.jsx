import React from "react";
import Image1 from "../assets/blog_05.jpg";
import BlogHeader from "../Components/BlogHeader";
import BlogContent from "../Components/BlogContent";
import TagShareSection from "../Components/TagShareSection";
import AuthorInfo from "../Components/AuthorInfo";
import NextPostCard from "../Components/NextPostCard";
import ReviewForm from "../Components/ReviewForm";
import SearchBar from "../Components/SearchBar";
import Categories from "../Components/Categories";
import PopularNews from "../Components/PopularNews";
import Archives from "../components/Archives";
import PopularTags from "../components/PopularTags";
import OfferSection from "../components/OfferSection";
import RelatedPost from "../Components/RelatedPost";

const BlogDetails = () => {
  return (
    <div className="bg-[#F9F9F9] max-w-[1400px]  m-auto ">
      <div className="  flex flex-col  md:flex-col lg:flex-row justify-between ">
        {/* left secton */}
        <div className="max-w-[1008px] m-autobg-[#F9F9F9] mt-10  ">
          <div className="border border-[#E8E6E6] rounded-lg ">
            {/* Blog-Image */}
            <div className="max-w-[1008px]">
              <div className=" flex  mx-[32px] items-center justify-center">
                {" "}
                <img className="rounded-lg  mt-10 " src={Image1} alt="image" />
              </div>
            </div>
            <BlogHeader />
            <BlogContent />
            <TagShareSection />
          </div>
          <div>
            <AuthorInfo />
            <NextPostCard />
            <div className="flex items-center w-full  gap-5  mt-10 bg-white  border  border-[#E8E6E6]  rounded-lg ">
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

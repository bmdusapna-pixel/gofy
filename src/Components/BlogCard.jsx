import React from "react";
import { Calendar } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog, Image, Tag }) => {
  const idOrSlug = blog?.slug || blog?._id || blog?.id;
  const imageSrc = blog?.coverImage || blog?.image || blog?.thumbnail || Image;
  const tag = blog?.tag || blog?.category || Tag;
  const title = blog?.title || "";
  const excerpt = blog?.excerpt || blog?.summary || "";
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

  return (
    <Link
      to={idOrSlug ? `/blog/${encodeURIComponent(idOrSlug)}` : "/blog-details"}
      className="w-[300px] p-1 h-auto border-[#E8E6E6] rounded-lg overflow-hidden bg-[#FFFF] shadow"
    >
      <div className="relative p-3 rounded-lg">
        {imageSrc && (
          <img
            className="w-full h-60 rounded-lg object-cover"
            src={imageSrc}
            alt={title || "Blog"}
          />
        )}
        {tag && (
          <span className="absolute top-6 hover:bg-amber-600 left-6 bg-[#00BBAE] text-white text-sm font-semibold px-1 py-1 rounded-lg shadow">
            {tag}
          </span>
        )}
      </div>

      <div className="p-1">
        <div className="flex items-center w-[127px] h-[37px] px-1 py-1 rounded-lg border-1 border-[#E8E6E6] text-gray-500 gap-1">
          <Calendar className="w-5 h-5 text-[#00BBAE]" />
          <span className="text-[#001430]">{dateLabel}</span>
        </div>
        <h1 className="text-md text-[20px] hover:text-[#00BBAE] text-[#001430] font-semibold ">
          {title}
        </h1>
        {excerpt && <p className="text text-[#69778A]">{excerpt}</p>}
        <div className="flex items-center gap-1 h-[63px] w-[252px] border-t-1 border-t-[#E8E6E6] text-sm text-gray-500">
          <CircleUserRound className="w-7 h-7" />
          <span className="text-[16px] font-medium">
            Posted by: <span className="text-[#001430]">{author}</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

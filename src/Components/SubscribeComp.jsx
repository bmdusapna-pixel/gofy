import React from "react";
import subscribeImg from "../assets/subscribe_01.svg";

const Subscribe = () => {
  return (
    <div className="bg-[#001430] mt-10    text-white mb-10 flex flex-col md:flex-row items-center justify-between px-10 py-10 rounded-xl shadow-md gap-6 md:h-[280px]">
      <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start text-center md:text-left">
        <img src={subscribeImg} alt="Subscribe" className="w-16 md:w-20" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-medium max-w-lg">
          Subscribe to our newsletter to get the latest news.
        </h2>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md">
        <div className="flex items-center bg-[#172d4b] rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Your Email Address"
            className="w-full px-4 py-3 bg-transparent text-white placeholder:text-white/70 outline-none"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 text-sm md:text-base font-medium whitespace-nowrap rounded-full transition"
          >
            Subscribe Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;

import React from "react";
import cta from "../assets/cta_02.png";

const OfferBanner = () => {
  return (
    <div className="w-full ">
      <div className="bg-[#001430] flex mt-10  flex-col md:flex-row rounded-2xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center px-6 py-10 md:px-16 md:py-0 text-center md:text-left">
          <h2 className="text-white text-2xl md:text-3xl font-bold max-w-xl leading-snug">
            Get 25% discount in all kinds of superhero themes!
          </h2>
        </div>

        <div className="flex-1 flex items-end justify-center px-6 md:px-0">
          <img
            src={cta}
            alt="Offer Banner"
            className="object-contain w-full max-w-[300px] md:max-w-[360px] max-h-[260px]"
          />
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;

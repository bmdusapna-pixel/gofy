import React, { useState } from "react";
import cta_banner from "../assets/cta.png";
import age_1 from "../assets/age_1.png";
import age_2 from "../assets/age_2.png";
import age_3 from "../assets/age_3.png";
import age_4 from "../assets/age_4.png";
import age_5 from "../assets/age_5.png";
import ProductsCollection from "./ProductsCollection";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const age_category_array = [
  {
    _id: 1,
    image: age_1,
    age_difference: "0-2 years",
    bg: "#06a096",
    url: "age/zero-to-two",
  },
  {
    _id: 2,
    image: age_2,
    age_difference: "2-4 years",
    bg: "#e91e63",
    url: "age/two-to-four",
  },
  {
    _id: 3,
    image: age_3,
    age_difference: "4-6 years",
    bg: "#28a745",
    url: "age/four-to-six",
  },
  {
    _id: 4,
    image: age_4,
    age_difference: "6-8 years",
    bg: "#dc3545",
    url: "age/six-to-eight",
  },
  {
    _id: 5,
    image: age_5,
    age_difference: "8-10 years",
    bg: "#0d6efd",
    url: "age/eight-to-ten",
  },
  {
    _id: 6,
    image: age_1,
    age_difference: "10-12 years",
    bg: "#dc3545",
    url: "age/ten-to-twelve",
  },
  {
    _id: 7,
    image: age_3,
    age_difference: "12-14 years",
    bg: "#0d6efd",
    url: "age/twelve-to-fourteen",
  },
];

const CTA = () => {
  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="w-full bg-white lg:px-12 sm:px-20 px-5">
        <div className="w-full bg-[#002cc7] h-full mx-auto my-10 rounded-3xl flex md:flex-row flex-col justify-center items-center">
          <div className="flex flex-col gap-5 sm:gap-10 w-full px-8 py-10 md:w-1/2">
            <p className="text-white text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-bold">
              Get 25% discount in all kind of <br />
              super hero theme
            </p>
            <button
              onMouseEnter={() => setButtonHovered(true)}
              onMouseLeave={() => setButtonHovered(false)}
              className="flex gap-2 w-44 bg-orange-500 transition-all duration-300 hover:bg-orange-400 cursor-pointer rounded-full items-center justify-center p-3"
            >
              <p className="text-[16px] font-semibold text-white leading-[24px]">
                See Collection
              </p>
              <ArrowRight
                className={`w-5 h-5 text-white transition-transform duration-300 ${
                  buttonHovered ? "translate-x-1" : ""
                }`}
              />
            </button>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center pt-0 sm:pt-10">
            <img src={cta_banner} alt="" className="w-full" />
          </div>
        </div>
      </div>
      <ProductsCollection color={"#2563eb"} />
      <div className="flex lg:px-12 sm:px-10 px-5 flex-col gap-2 w-full mx-auto items-center justify-center">
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#212529] font-bold">
          Shop By Age
        </p>
        <p className="text-[16px] leading-[24px] font-normal text-gray-500">
          Lorem ipsum dolor sit amet consectetur. Id fames there are many
          vulputate eget dolor.
        </p>
        <div className="grid lg:grid-cols-7 md:grid-cols-3 grid-cols-2 gap-0 sm:gap-5 w-full my-5 sm:my-10 items-center">
          {age_category_array.map((item) => (
            <Link
              to={`/products/${item.url}`}
              key={item._id}
              className="flex flex-col gap-5 w-full items-center relative group"
            >
              <div
                style={{ backgroundColor: item.bg }}
                className="flex items-center justify-center sm:w-44 w-36 sm:h-44 h-36 rounded-full"
              >
                <img
                  src={item.image}
                  alt=""
                  className="w-20 sm:w-24 absolute z-10 h-24 sm:h-32 top-[23px] group-hover:scale-110 transition-transform duration-300"
                />
                <div className="w-28 h-28 border border-white border-dashed rounded-full absolute"></div>
                <div className="absolute w-full h-10 bg-white bottom-8"></div>
              </div>
              <p className="relative bottom-8 text-[18px] leading-[27px] text-[#000000] font-semibold">
                {item.age_difference}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CTA;

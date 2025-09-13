import React, { useEffect, useState } from "react";
import cta_banner from "../assets/cta.png";
import I1 from "../assets/1.png";
import I2 from "../assets/2.png";
import I3 from "../assets/3.png";
import I4 from "../assets/4.png";
import I5 from "../assets/5.png";
import I6 from "../assets/6.png";
import I7 from "../assets/7.png";
import I8 from "../assets/8.png";
// import ProductsCollection from "./ProductsCollection";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { slugify } from "../assets/helper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const age_category_array = [
  {
    _id: 1,
    image: I1,
    age_difference: "0-6 months",
    url: "age/zero-to-two",
  },
  {
    _id: 2,
    image: I2,
    age_difference: "6-12 months",
    url: "age/two-to-four",
  },
  {
    _id: 3,
    image: I3,
    age_difference: "1-2 years",
    url: "age/four-to-six",
  },
  {
    _id: 4,
    image: I4,
    age_difference: "2-4 years",
    url: "age/six-to-eight",
  },
  {
    _id: 5,
    image: I5,
    age_difference: "4-6 years",
    url: "age/eight-to-ten",
  },
  {
    _id: 6,
    image: I6,
    age_difference: "6-8 years",
    url: "age/ten-to-twelve",
  },
  {
    _id: 7,
    image: I7,
    age_difference: "8-10 years",
    url: "age/twelve-to-fourteen",
  },
  {
    _id: 8,
    image: I8,
    age_difference: "10-12 years",
    url: "age/twelve-to-fourteen",
  },
];

const CTA = () => {
  const [buttonHovered, setButtonHovered] = useState(false);
  const [ageCategories, setAgeCategories] = useState([]);
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    const fetchAges = async () => {
      const res = await fetch(`${baseUrl}/ages`);
      const data = await res.json();
      setAgeCategories(data);
    };
    fetchAges();
    const fetchBanner = async () => {
      const result = await fetch(`${baseUrl}/banners/active`);
      const res = await result.json();
      setBanner(res);
    };
    fetchBanner();
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="w-full bg-white lg:px-12 sm:px-20 px-5">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {banner
            .filter((b) => b.bannerName === "offer banner")
            .map((b) => (
              <SwiperSlide key={b._id}>
                <div className="w-full bg-[#002cc7] h-full mx-auto my-10 rounded-3xl flex md:flex-row flex-col justify-center items-center">
                  <div className="flex flex-col gap-5 sm:gap-10 w-full px-8 py-10 md:w-1/2">
                    <p className="text-white text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-bold">
                      {b.description}
                    </p>
                    <Link
                      to={"/products"}
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
                    </Link>
                  </div>
                  <div className="w-full md:w-1/2 flex items-center justify-center pt-0 sm:pt-10 pl-8 sm:pl-0">
                    <img src={b.webImageUrl} alt="" className="w-full" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      {/* <ProductsCollection color={"#2563eb"} /> */}
      <div className="flex lg:px-12 sm:px-10 px-5 flex-col gap-2 w-full mx-auto items-center justify-center">
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#212529] font-bold">
          Shop By Age
        </p>
        <p className="text-[16px] leading-[24px] font-normal text-gray-500">
          Lorem ipsum dolor sit amet consectetur. Id fames there are many
          vulputate eget dolor.
        </p>
        <div className="grid xl:grid-cols-8 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-0 sm:gap-5 w-full my-5 sm:my-10 items-center">
          {ageCategories?.map((item) => (
            <Link
              to={`/products/${slugify(item.ageRange)}`}
              key={item._id}
              className="flex flex-col gap-3 w-full items-center group"
            >
              <div className="flex items-center justify-center sm:w-40 w-36 sm:h-40 h-36 rounded-full">
                <img
                  src={item.image}
                  alt=""
                  className="w-full z-10 h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <p className="bottom-8 text-[18px] leading-[27px] text-[#000000] font-semibold">
                {item.ageRange}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CTA;

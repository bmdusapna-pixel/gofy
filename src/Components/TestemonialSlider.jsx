import React from "react";
import Slider from "react-slick";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
    onClick={onClick}
  >
    <ArrowRight className="text-[#00BBAE] w-5 h-5" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
    onClick={onClick}
  >
    <ArrowLeft className="text-[#00BBAE] w-5 h-5" />
  </div>
);

const TestimonialSlider = ({ testimonials }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false },
      },
    ],
  };

  return (
    <div className="px-4 max-w-6xl mx-auto py-10 relative">
      <Slider {...settings}>
        {testimonials.map((item, index) => (
          <div key={index} className="px-3 group">
            <div className="bg-white min-h-[340px] p-4 rounded-xl flex flex-col gap-3 items-center justify-between text-center">
              <div className="relative w-fit">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-full h-24 w-24 object-cover shadow p-1 border border-[#F9F9F9]"
                />
                <Quote
                  fill="white"
                  className="absolute bottom-1 right-0  bg-[#00BBAE] rounded-full p-1 w-6 h-6 text-white transition-transform duration-700 ease-in-out group-hover:rotate-y-180
"
                />
              </div>

              <div className="flex gap-1 mb-1 justify-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    fill="#f88e0f"
                    className="text-[#f88e0f] h-4 w-4"
                  />
                ))}
              </div>

              <p className="text-[#001851] text-lg leading-relaxed min-h-[112px] line-clamp-4">
                {item.feedback || "No feedback provided."}
              </p>

              <div>
                <h2 className="text-xl font-semibold text-[#00BBAE]">
                  {item.name}
                </h2>
                <h3 className="text-medium text-[#69778A]">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;

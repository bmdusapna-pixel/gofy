import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const bannerColors = ["#2563EB", "#06B6D4", "#DC2626", "#EC4899", "#10B981"];

const Banners = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [banners, setBanners] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const result = await fetch(`${baseUrl}/banners/active`);
        const res = await result.json();

        // Only use hero banners
        const heroBanners = res.filter((b) => b.bannerName === "bottom banner");

        // Assign cycling colors
        const updated = heroBanners.map((item, index) => {
          const bg_color = bannerColors[index % bannerColors.length];
          return { ...item, bg_color };
        });

        setBanners(updated);
      } catch (err) {
        console.error("Error fetching banners:", err);
      }
    };

    fetchBanners();
  }, [baseUrl]);

  return (
    <div className="lg:px-12 px-0 w-full mx-auto my-10">
      <div className="w-full">
        <Swiper
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1536: { slidesPerView: 5, spaceBetween: 20 },
          }}
        >
          {banners.map((item) => (
            <SwiperSlide key={item._id}>
              <div
                style={{ backgroundColor: item.bg_color }}
                className="w-full rounded-2xl flex lg:flex-row flex-col gap-2 items-center h-80"
              >
                {/* LEFT: Text */}
                <div className="lg:w-2/3 w-full px-8 py-10 flex flex-col gap-5">
                  <p className="text-[27px] text-white leading-[40px] font-bold">
                    {item.title}
                  </p>
                  <p className="text-[16px] text-gray-200 font-semibold leading-[24px]">
                    {item.description}
                  </p>
                  <a
                    href={item.bannerUrl || "/products"}
                    onMouseEnter={() => setHoveredId(item._id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{ "--hover-color": item.bg_color }}
                    className="cursor-pointer text-black flex items-center gap-2 border border-transparent justify-center rounded-full w-40 h-10 bg-white transition-all duration-300 hover:[color:var(--hover-color)]"
                  >
                    <p className="text-[16px] leading-[24px] font-semibold">
                      See Collection
                    </p>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        hoveredId === item._id
                          ? "translate-x-1"
                          : "translate-x-0"
                      }`}
                    />
                  </a>
                </div>

                {/* RIGHT: Image */}
                <div className="md:w-1/3 w-full">
                  <img
                    src={item.webImageUrl}
                    alt={item.title}
                    className="w-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banners;

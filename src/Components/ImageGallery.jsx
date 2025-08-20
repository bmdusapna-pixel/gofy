import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const ImageGallery = ({ images }) => {
  const swiperRef = useRef(null);
  const handleThumbnailClick = (index) => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(index);
    }
  };
  return (
    <div className="w-full flex lg:flex-row flex-col-reverse gap-5">
      <div className="flex lg:flex-col flex-row gap-2 w-full lg:w-24 h-full lg:h-24">
        {images.map((item, index) => (
          <div
            onClick={() => handleThumbnailClick(index)}
            className="w-full cursor-pointer bg-white rounded-2xl border border-gray-200"
            key={index}
          >
            <img src={item} className="w-full" alt={item.name} />
          </div>
        ))}
      </div>
      <div className="w-full lg:w-4/5">
        <div className="bg-[#e9f9fc] border border-gray-200 rounded-2xl">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            slidesPerView={1}
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item}
                  className="w-full object-cover"
                  alt={`Product image ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;

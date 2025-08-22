import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

const ImageGallery = ({ images }) => {
  const swiperRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleThumbnailClick = (index) => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(index);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setIsZoomed(false); // Reset zoom state when modal opens
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setCursorPos({ x, y });
  };

  return (
    <>
      <div className="w-full flex lg:flex-row flex-col-reverse gap-5">
        <div className="flex lg:flex-col flex-row gap-2 w-full lg:w-24 h-full lg:h-24">
          {images.map((item, index) => (
            <div
              onClick={() => handleThumbnailClick(index)}
              className="w-full cursor-pointer bg-white rounded-2xl border border-gray-200"
              key={index}
            >
              <img
                src={item}
                className="w-full"
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>
        <div className="w-full lg:w-4/5">
          <div className="bg-[#e9f9fc] border border-gray-200 rounded-2xl">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              slidesPerView={1}
              onMouseEnter={() => swiperRef.current.autoplay.stop()}
              onMouseLeave={() => swiperRef.current.autoplay.start()}
            >
              {images.map((item, index) => (
                <SwiperSlide key={index} onClick={() => handleImageClick(item)}>
                  <img
                    src={item}
                    className="w-full object-cover cursor-zoom-in"
                    alt={`Product image ${index + 1}`}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden max-w-full max-h-[90vh] cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full h-full relative"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              style={{ overflow: "hidden" }}
            >
              <img
                src={selectedImage}
                alt="Zoomed view"
                className="transition-transform duration-300 ease-in-out"
                style={{
                  transform: isZoomed ? `scale(1.5)` : `scale(1)`,
                  transformOrigin: `${cursorPos.x}% ${cursorPos.y}%`,
                  cursor: "crosshair",
                }}
              />
            </div>
            <button
              className="absolute top-2 right-4 text-3xl font-bold text-gray-700 hover:text-red-500"
              onClick={handleCloseModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;

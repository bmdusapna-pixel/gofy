import React, { useState } from "react";
import { DollarSign, Percent, Truck, Headphones, ArrowRight, Badge } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import banner_1 from "../assets/banner_1.png";
import banner_2 from "../assets/banner_2.png";
import banner_3 from "../assets/banner_3.png";

const banners_first = [
    {
        _id: 1,
        title: "Money Return",
        subtitle: "Back guarantee under 7 days",
        card_bg_color: "#FEF3E2",
        icon_bg_color: "#FB923C",
        icon: "DollarSign"
    },
    {
        _id: 2,
        title: "Member Discount",
        subtitle: "On every order over $2000",
        card_bg_color: "#E0E7FF",
        icon_bg_color: "#3B82F6",
        icon: "Percent"
    },
    {
        _id: 3,
        title: "Home Delivery",
        subtitle: "Free delivery to your home",
        card_bg_color: "#D1FAE5",
        icon_bg_color: "#10B981",
        icon: "Truck"
    },
    {
        _id: 4,
        title: "24/7 Support",
        subtitle: "Dedicated support in 24hrs",
        card_bg_color: "#FCE7F3",
        icon_bg_color: "#EC4899",
        icon: "Headphones"
    }
];

const banners_second = [
    {
        _id: 1,
        title: "Learning Toys For kids",
        subtitle: "Discover Amazing Offers!",
        bg_color: "#2563EB",
        imgae: banner_1,
    },
    {
        _id: 2,
        title: "Superhero Collection 2023",
        subtitle: "15% OFF on Kids' Toys and Gifts!",
        bg_color: "#06B6D4",
        imgae: banner_2,
    },
    {
        _id: 3,
        title: "Children Day Collection 2023",
        subtitle: "15% OFF on Kids' Toys and Gifts!",
        bg_color: "#DC2626",
        imgae: banner_3,
    },
    {
        _id: 4,
        title: "Learning Toys For kids",
        subtitle: "Discover Amazing Offers!",
        bg_color: "#2563EB",
        imgae: banner_1,
    },
    {
        _id: 5,
        title: "Superhero Collection 2023",
        subtitle: "15% OFF on Kids' Toys and Gifts!",
        bg_color: "#06B6D4",
        imgae: banner_2,
    },
    {
        _id: 6,
        title: "Children Day Collection 2023",
        subtitle: "15% OFF on Kids' Toys and Gifts!",
        bg_color: "#DC2626",
        imgae: banner_3,
    },
];

const iconMap = {
    DollarSign,
    Percent,
    Truck,
    Headphones
};

const Banners = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="lg:px-12 px-0 w-full mx-auto my-10">
      <div className="flex items-center justify-center flex-col gap-20 w-full lg:px-0 px-5">
        <div className="grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 w-full gap-5">
            {
                banners_first.map((item) => {
                    const IconComponent = iconMap[item.icon];
                    return (
                        <div key={item._id} style={{ backgroundColor: item.card_bg_color }} className="flex gap-2 md:gap-5 w-full rounded-2xl p-5 md:p-10 items-center">
                            <div className="w-full md:w-1/3 flex items-center justify-center">
                                <Badge className="w-20 h-20 rounded-full absolute z-5" style={{ color: item.icon_bg_color }} />
                                <div style={{ backgroundColor: item.icon_bg_color }} className="w-14 z-10 rounded-full p-2 h-14 flex items-center justify-center">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="w-full md:w-2/3 flex flex-col gap-2">
                                <p className="text-[20px] text-black leading-[30px] font-semibold">{item.title}</p>
                                <p className="text-[16px] text-gray-600 font-semibold leading-[24px]">{item.subtitle}</p>                           
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className="w-full">
            <Swiper spaceBetween={20} breakpoints={{320:{slidesPerView:1},640:{slidesPerView:2},768:{slidesPerView:3},1024:{slidesPerView:3}}}>
                {
                    banners_second.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div style={{ backgroundColor: item.bg_color }} className="w-full rounded-2xl flex lg:flex-row flex-col gap-2 items-center h-80">
                                <div className="lg:w-2/3 w-full px-8 py-10 flex flex-col gap-5">
                                    <p className="text-[27px] text-white leading-[40px] font-bold">{item.title}</p>
                                    <p className="text-[16px] text-gray-200 font-semibold leading-[24px]">{item.subtitle}</p>
                                    <button onMouseEnter={()=>setHoveredId(item._id)} onMouseLeave={() => setHoveredId(null)} style={{ '--hover-color': item.bg_color }} className="cursor-pointer text-black flex items-center gap-2 border border-transparent justify-center rounded-full w-40 h-10 bg-white transition-all duration-300 hover:[color:var(--hover-color)]">
                                        <p className="text-[16px] leading-[24px] font-semibold">See Collection</p>
                                        <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${ hoveredId === item._id ? "translate-x-1" : "translate-x-0" }`} />
                                    </button>
                                </div>
                                <div className="md:w-1/3 w-full">
                                    <img src={item.imgae} alt="" className="w-full" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
           </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Banners;

import React, { useState } from "react";
import { ArrowRight, Facebook, Linkedin, Mail, MapPin, Twitter, Youtube } from "lucide-react";
import logo from "../assets/logo.webp";
import footer_background from "../assets/footer-background.svg";
import footer_boy from "../assets/footer-boy.svg";
import footer_girl from "../assets/footer-girl.svg";
import { Link } from "react-router-dom";

const IconComponents = {
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  Youtube,
};


const footer_links = [
  {
    _id: 1,
    title: "Clothe Collections",
    url: "/",
  },
  {
    _id: 2,
    title: "Toys Collections",
    url: "/",
  },
  {
    _id: 3,
    title: "New Arrivals",
    url: "/new-arrivals",
  },
  {
    _id: 4,
    title: "Best Collections",
    url: "/",
  },
  {
    _id: 5,
    title: "Contact Us",
    url: "/contact",
  },
  {
    _id: 6,
    title: "Bulk Order",
    url: "/bulk-order",
  },
  {
    _id: 7,
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    _id: 8,
    title: "Refund and Returns",
    url: "/refund-returns",
  },
];

const footer_social = [
  {
    _id: 1,
    icon: "Facebook",
    url: "/",
  },
  {
    _id: 2,
    icon: "Linkedin",
    url: "/",
  },
  {
    _id: 3,
    icon: "Twitter",
    url: "/",
  },
  {
    _id: 4,
    icon: "Mail",
    url: "/",
  },
  {
    _id: 5,
    icon: "Youtube",
    url: "/",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const subsribeGofy = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="flex flex-col gap-14 lg:px-12 px-5 mx-auto w-full py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
          <div className="w-full flex flex-col gap-8">
            <img src={logo} alt="" className="w-40" />
            <p className="text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529]">Lorem ipsum dolor sit amet consectetur. Id fames there are many vulputate eget dolor.</p>
            <div className="flex gap-3 items-center">
              <MapPin className="w-5 h-5 text-[#198754]" />
              <p className="text-[16px] leading-[24px] text-[#212529]">Delhi, India</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[18px] leading-[27px] font-semibold text-black">Shop Now</p>
              <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              {
                footer_links.slice(0, 4).map((item) => (
                  <Link to={item.url} className="relative w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#00bbae] after:w-0 after:transition-all after:duration-300 hover:after:w-full text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529] cursor-pointer hover:opacity-100 transition-all duration-300 hover:text-[#00bbae]" key={item._id}>{item.title}</Link>
                ))
              }
            </div>
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[18px] leading-[27px] font-semibold text-black">Customer Support</p>
              <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              {
                footer_links.slice(4).map((item) => (
                  <Link to={item.url} className="relative w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#00bbae] after:w-0 after:transition-all after:duration-300 hover:after:w-full text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529] cursor-pointer hover:opacity-100 transition-all duration-300 hover:text-[#00bbae]" key={item._id}>{item.title}</Link>
                ))
              }
            </div>
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[18px] leading-[27px] font-semibold text-black">Subscribe Our NewsLetter</p>
              <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
            </div>
            <p className="text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529]">With our newsletter, you'll never miss an important update.</p>
            <form onSubmit={subsribeGofy} className="flex justify-between h-14 w-full items-center border transition-colors duration-300 border-gray-300 bg-white rounded-full focus-within:border-[#00bbae]">
              <div className="flex gap-1 items-center">
                <div className="py-3 pl-4 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-black" />
                </div>
                <input required value={email} name="email" onChange={(event) => setEmail(event.target.value)} type="text" className="py-3 px-2 w-full border-none outline-none" placeholder="Email Address" />
              </div>
              <button type="submit" className="bg-[#f88e0f] w-10 h-10 mr-2 flex items-center justify-center rounded-full cursor-pointer">
                <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {
            footer_social.map((item) => {
              const Icon = IconComponents[item.icon];
              return (
                <a href={item.url} target="_blank" key={item._id} className="w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#00bbae] text-black hover:text-white bg-[#e9ecef] p-1 rounded-full">
                  <Icon className="w-5 h-5" />
                </a>
              )
            })
          }
        </div>
      </div>
      <div className="w-full h-full relative bg-[#f8f9fa]">
        <img src={footer_background} alt="" className="w-full h-40 sm:h-full mt-60" />
        <div className="absolute -top-60 left-0 w-full flex justify-between items-start px-5 sm:px-12 z-10">
          <img src={footer_girl} alt="" className="w-40 md:w-52" />
          <img src={footer_boy} alt="" className="w-40 md:w-52" />
        </div>
        <p className="text-black font-semibold absolute bottom-5 text-center text-[14px] leading-[21px] w-full">©️ 2025 Gofy.app. All Rights Reserved Created by BMDU</p>
       </div>
    </div>
  );
};

export default Footer;

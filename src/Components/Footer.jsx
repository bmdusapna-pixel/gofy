import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faXTwitter,
  faFacebookF,
  faYoutube,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPinterest } from "react-icons/fa";
import logo from "../assets/logo.webp";
import footer_background from "../assets/footer-background.svg";
import footer_boy from "../assets/footer-boy.svg";
import footer_girl from "../assets/footer-girl.svg";
import { Link } from "react-router-dom";

const FaIconsComp = {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faPinterest,
  faYoutube,
};
const FaFooterSocial = [
  { _id: 1, icon: "faFacebookF", url: "/" },
  { _id: 2, icon: "faInstagram", url: "/" },
  { _id: 3, icon: "faXTwitter", url: "/" },
  { _id: 4, icon: "faPinterest", url: "/" },
  { _id: 5, icon: "faYoutube", url: "/" },
];

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
    title: "Bulk Order",
    url: "/bulk-order",
  },
  {
    _id: 6,
    title: "FAQ's",
    url: "/faq",
  },
  {
    _id: 7,
    title: "About Us",
    url: "/about",
  },
  {
    _id: 8,
    title: "Contact Us",
    url: "/contact",
  },
  {
    _id: 9,
    title: "Privacy Policy",
    url: "/privacy-policy",
  },
  {
    _id: 10,
    title: "Refund and Returns",
    url: "/refund-returns",
  },
  {
    _id: 11,
    title: "Blog",
    url: "/blog",
  },
  {
    _id: 12,
    title: "Terms and Conditions",
    url: "/terms-and-conditions",
  },
];

const Footer = () => {
  // const [email, setEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");

  const subscribeToWhatsapp = (event) => {
    event.preventDefault();
    // Here you would handle the submission of the WhatsApp number
    // For example, send it to an API endpoint
    console.log("Subscribing WhatsApp number:", whatsappNumber);
    alert(`Thank you for subscribing with ${whatsappNumber} on WhatsApp!`);
    setWhatsappNumber(""); // Clear the input after submission
  };

  // const subsribeGofy = (event) => {
  //   event.preventDefault();
  // };

  const length = footer_links?.length;
  const firstHalf = footer_links.slice(0, 6);
  const secondHalf = footer_links.slice(6, length);

  return (
    <div className="w-full bg-[#f8f9fa]">
      <div className="flex flex-col gap-14 lg:px-12 px-5 mx-auto w-full py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
          <div className="w-full flex flex-col gap-8">
            <img src={logo} alt="" className="w-40" />
            <p className="text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529]">
              Welcome to Gofy Kids Mall, Model Town – your one-stop destination
              for everything your little one needs! From trendy kidswear and
              comfortable footwear to a wide range of toys.
            </p>
            {/* <div className="flex gap-3 items-center">
              <MapPin className="w-5 h-5 text-[#198754]" />
              <p className="text-[16px] leading-[24px] text-[#212529]">
                Delhi, India
              </p>
            </div> */}
            <div className="flex gap-3 items-center">
              {FaFooterSocial.map((item) => {
                const Icon = FaIconsComp[item.icon];
                return (
                  <a
                    href={item.url}
                    target="_blank"
                    key={item._id}
                    className="w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#00bbae] text-black hover:text-white bg-[#e9ecef] p-1 rounded-full"
                  >
                    <FontAwesomeIcon icon={Icon} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[18px] leading-[27px] font-semibold text-black">
                Shop Now
              </p>
              <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              {firstHalf.map((item) => (
                <Link
                  to={item.url}
                  className="relative w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#00bbae] after:w-0 after:transition-all after:duration-300 hover:after:w-full text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529] cursor-pointer hover:opacity-100 transition-all duration-300 hover:text-[#00bbae]"
                  key={item._id}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[18px] leading-[27px] font-semibold text-black">
                Customer Support
              </p>
              <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              {secondHalf.map((item) => (
                <Link
                  to={item.url}
                  className="relative w-fit after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-[#00bbae] after:w-0 after:transition-all after:duration-300 hover:after:w-full text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529] cursor-pointer hover:opacity-100 transition-all duration-300 hover:text-[#00bbae]"
                  key={item._id}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          {/* <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[18px] leading-[27px] font-semibold text-black">
                Subscribe Our NewsLetter
              </p>
              <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
            </div>
            <p className="text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529]">
              With our newsletter, you'll never miss an important update.
            </p>
            <form
              onSubmit={subsribeGofy}
              className="flex justify-between h-14 w-full items-center border transition-colors duration-300 border-gray-300 bg-white rounded-full focus-within:border-[#00bbae]"
            >
              <div className="flex gap-1 items-center">
                <div className="py-3 pl-4 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-black" />
                </div>
                <input
                  required
                  value={email}
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  type="text"
                  className="py-3 px-2 w-full border-none outline-none"
                  placeholder="Email Address"
                />
              </div>
              <button
                type="submit"
                className="bg-[#f88e0f] w-10 h-10 mr-2 flex items-center justify-center rounded-full cursor-pointer"
              >
                <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 hover:translate-x-1" />
              </button>
            </form>
          </div> */}
          <div className="w-full flex flex-col gap-8">
            <div className="flex flex-col gap-2 w-full">
              <p className="text-[18px] leading-[27px] font-semibold text-black">
                Subscribe to Our WhatsApp Updates
              </p>
              <hr className="w-14 rounded-2xl bg-[#f88e0f] h-1 border-none" />
            </div>
            <p className="text-[16px] leading-[24px] font-semibold opacity-50 text-[#212529]">
              Get important updates directly on WhatsApp – you won't miss a
              thing!
            </p>
            <form
              onSubmit={subscribeToWhatsapp} // Updated onSubmit handler
              className="flex justify-between h-14 w-full items-center border transition-colors duration-300 border-gray-300 bg-white rounded-full focus-within:border-[#00bbae]"
            >
              <div className="flex gap-1 items-center">
                <div className="py-3 pl-4 flex items-center justify-center">
                  {/* Replace Mail with a Phone/WhatsApp icon if available */}
                  {/* If using lucide-react, it could be <Phone className="w-4 h-4 text-black" /> */}
                  {/* <Mail className="w-4 h-4 text-black" />{" "} */}
                  <IoLogoWhatsapp className="w-6 h-6 text-black text-green-500" />{" "}
                  {/* WhatsApp icon */}
                  {/* Placeholder, ideally replace with Phone or WhatsApp icon */}
                </div>
                <input
                  required
                  value={whatsappNumber}
                  name="whatsappNumber"
                  onChange={(event) => setWhatsappNumber(event.target.value)}
                  type="tel" // Use 'tel' type for phone numbers
                  className="py-3 px-2 w-full border-none outline-none"
                  placeholder="WhatsApp Number"
                />
              </div>
              <button
                type="submit"
                className="bg-[#f88e0f] w-10 h-10 mr-2 flex items-center justify-center rounded-full cursor-pointer"
              >
                <ArrowRight className="w-5 h-5 text-white transition-transform duration-300 hover:translate-x-1" />
              </button>
            </form>
          </div>
        </div>
        {/* <div className="flex gap-3 items-center">
          {footer_social.map((item) => {
            const Icon = IconComponents[item.icon];
            return (
              <a
                href={item.url}
                target="_blank"
                key={item._id}
                className="w-12 h-12 flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#00bbae] text-black hover:text-white bg-[#e9ecef] p-1 rounded-full"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div> */}
      </div>
      <div className="w-full h-full relative bg-[#f8f9fa]">
        <img
          src={footer_background}
          alt=""
          className="w-full h-40 sm:h-full mt-60"
        />
        <div className="absolute -top-60 left-0 w-full flex justify-between items-start px-5 sm:px-12 z-10">
          <img src={footer_girl} alt="" className="w-40 md:w-52" />
          <img src={footer_boy} alt="" className="w-40 md:w-52" />
        </div>
        <p className="text-[#000] font-semibold absolute bottom-5 text-center text-[14px] leading-[21px] w-full">
          © 2025 Gofy.app. All Rights Reserved Created by{" "}
          <a href="https://www.digitalutilization.com/" target="_blank">
            BMDU
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;

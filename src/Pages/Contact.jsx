import React, { useContext, useState } from "react";
import { Loader, Mail, MapPin, Phone } from "lucide-react";
import { CartContext } from "../Context/CartContext";

const Contact = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    cartItems,
    openCart,
    setOpenCart,
    totalItems,
    formSubmit,
  } = useContext(CartContext);
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    comment: "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="w-full lg:px-12 px-5 h-full mx-auto py-20">
        <div className="flex lg:flex-row flex-col gap-10 w-full">
          <div className="bg-white rounded-xl p-6 md:p-12 flex flex-col gap-5 w-full lg:w-2/5">
            <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold text-[#001430]">
              Contact
            </p>
            <p className="text-[16px] leading-[24px] text-[#69778a]">
              Lorem ipsum dolor sit amet consectetur. Fermentum facilisi id at
              adipiscing ametb ibendum quis vitae blandit.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <div className="border border-gray-200 rounded-xl p-5 md:p-10 flex items-start gap-5 cursor-pointer">
                <div className="md:w-20 md:h-20 w-14 h-14 bg-[#edfbfa] rounded-full flex items-center justify-center">
                  <Phone className="md:w-8 md:h-8 w-6 h-6 text-[#00bbae]" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] leading-[24px] text-[#69778a]">
                    Phone Number
                  </p>
                  <p className="text-[18px] leading-[27px] text-[#001430] font-semibold">
                    +91-9711322433
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 md:p-10 flex items-start gap-5 cursor-pointer">
                <div className="md:w-20 md:h-20 w-14 h-14 bg-[#edfbfa] rounded-full flex items-center justify-center">
                  <Mail className="md:w-8 md:h-8 w-6 h-6 text-[#00bbae]" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] leading-[24px] text-[#69778a]">
                    Mail ID
                  </p>
                  <p className="text-[18px] leading-[27px] text-[#001430] font-semibold">
                    gofykidsmall@gmail.com
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-5 md:p-10 flex items-start gap-5 cursor-pointer">
                <div className="md:w-20 md:h-20 w-14 h-14 bg-[#edfbfa] rounded-full flex items-center justify-center">
                  <MapPin className="md:w-8 md:h-8 w-6 h-6 text-[#00bbae]" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] leading-[22px] text-[#69778a]">
                    Address Placer
                  </p>
                  <p className="text-[18px] leading-[24px] text-[#001430] font-semibold">
                    B-13, Derawala Nagar, Model Town, Delhi - 110009
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 md:p-12 flex flex-col gap-4 w-full lg:w-3/5">
            <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] font-semibold text-[#001430]">
              Send Message
            </p>
            <p className="text-[16px] leading-[24px] text-[#69778a]">
              Lorem ipsum dolor sit amet consectetur. Fermentum facilisi id at
              adipiscing ametb ibendum quis vitae blandit.
            </p>
            <form onSubmit={submitForm} className="w-full flex flex-col gap-2">
              <div className="flex md:flex-row flex-col justify-between w-full items-center gap-2 sm:gap-5">
                <input
                  required
                  name="name"
                  onChange={inputChangeHandler}
                  value={contactData.name}
                  type="text"
                  placeholder="Your Name"
                  className="text-black text-[16px] leading-[24px] font-normal placeholder:text-gray-600 rounded-md py-3 px-5 outline-none border border-gray-200 focus:border-[#00bbae] transition-colors w-full"
                />
                <input
                  required
                  name="phone"
                  onChange={inputChangeHandler}
                  value={contactData.phone}
                  type="tel"
                  placeholder="Phone Number"
                  className="text-black text-[16px] leading-[24px] font-normal placeholder:text-gray-600 rounded-md py-3 px-5 outline-none border border-gray-200 focus:border-[#00bbae] transition-colors w-full"
                />
              </div>
              <div className="flex md:flex-row flex-col justify-between w-full items-center gap-5">
                <input
                  required
                  name="email"
                  onChange={inputChangeHandler}
                  value={contactData.email}
                  type="email"
                  placeholder="Email Address"
                  className="text-black text-[16px] leading-[24px] font-normal placeholder:text-gray-600 rounded-md py-3 px-5 outline-none border border-gray-200 focus:border-[#00bbae] transition-colors w-full"
                />
                <input
                  required
                  name="comment"
                  onChange={inputChangeHandler}
                  value={contactData.comment}
                  type="text"
                  placeholder="Subject"
                  className="text-black text-[16px] leading-[24px] font-normal placeholder:text-gray-600 rounded-md py-3 px-5 outline-none border border-gray-200 focus:border-[#00bbae] transition-colors w-full"
                />
              </div>
              <textarea
                placeholder="Write your comment here"
                name=""
                rows="10"
                id=""
                className="text-black text-[16px] leading-[24px] font-normal placeholder:text-gray-600 rounded-md py-3 px-5 outline-none border border-gray-200 focus:border-[#00bbae] transition-colors w-full"
              ></textarea>
              <button
                type="submit"
                className="rounded-full w-40 font-semibold text-white text-[16px] leading-[24px] flex items-center justify-center transition-colors duration-300 hover:bg-[#f88e0f] cursor-pointer p-3 bg-[#00bbae]"
              >
                {formSubmit ? (
                  <Loader className="w-6 h-6 text-white animate-spin" />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

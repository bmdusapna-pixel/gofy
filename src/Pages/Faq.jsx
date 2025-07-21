import React, { useState } from "react";
import { Minus, Plus, Search } from "lucide-react";
import clsx from "clsx";

const faq_items = [
  {
    _id: 1,
    question: "Is it possible to exchange an item I bought for a different color after a year?",
    answer: "Lorem ipsum dolor sit amet consectetur. Cursus quam pharetra semper sagittis mi semper sollicitudin. Dui ornare amet dignissim neque quam egestas. Tincidunt massa dolor varius quam a quis. Amet at fermentum suspendisse dictum suspendisse faucibus pulvinar pharetra. Rutrum at tempor fermentum dignissim facilisis. Sit tempus et metus adipiscing sagittis diam sed urna nunc. Morbi non blandit urna viverra purus. Sem auctor pharetra velit amet ac cursus turpis.",
  },
  {
    _id: 2, 
    question: "Can I return a product that has been opened and partially used?",
    answer: "Lorem ipsum dolor sit amet consectetur. Cursus quam pharetra semper sagittis mi semper sollicitudin. Dui ornare amet dignissim neque quam egestas. Tincidunt massa dolor varius quam a quis. Amet at fermentum suspendisse dictum suspendisse faucibus pulvinar pharetra. Rutrum at tempor fermentum dignissim facilisis. Sit tempus et metus adipiscing sagittis diam sed urna nunc. Morbi non blandit urna viverra purus. Sem auctor pharetra velit amet ac cursus turpis.",
  },
  {
    _id: 3,
    question: "Is it possible to exchange an item I bought for a different color after a year?",
    answer: "Lorem ipsum dolor sit amet consectetur. Cursus quam pharetra semper sagittis mi semper sollicitudin. Dui ornare amet dignissim neque quam egestas. Tincidunt massa dolor varius quam a quis. Amet at fermentum suspendisse dictum suspendisse faucibus pulvinar pharetra. Rutrum at tempor fermentum dignissim facilisis. Sit tempus et metus adipiscing sagittis diam sed urna nunc. Morbi non blandit urna viverra purus. Sem auctor pharetra velit amet ac cursus turpis.",
  },
  {
    _id: 4,
    question: "Is there a limit to the number of times I can return an item?",
    answer: "Lorem ipsum dolor sit amet consectetur. Cursus quam pharetra semper sagittis mi semper sollicitudin. Dui ornare amet dignissim neque quam egestas. Tincidunt massa dolor varius quam a quis. Amet at fermentum suspendisse dictum suspendisse faucibus pulvinar pharetra. Rutrum at tempor fermentum dignissim facilisis. Sit tempus et metus adipiscing sagittis diam sed urna nunc. Morbi non blandit urna viverra purus. Sem auctor pharetra velit amet ac cursus turpis.",
  },
]

const Faq = () => {
  const [isOpenItem, setIsOpenItem] = useState(null);

  const handleToggle = (id) => {
    setIsOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-[#f9f9f9]">
      <div className="flex flex-col gap-10 max-w-5xl mx-auto h-screen py-20 lg:px-0 px-5">
        <div className="flex flex-col gap-5 w-full items-center">
          <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-[#001430] font-semibold">How can we help you?</p>
          <p className="text-[16px] leading-[24px] text-[#69778a] lg:w-md w-full text-center">Lorem ipsum dolor sit amet consectetur. Fermentum facilisi id at adipiscing ametb ibendum quis vitae blandit.</p>
          <div className="flex gap-5 w-full items-center p-2 bg-white rounded-md shadow-xl">
            <input type="text" className="w-full outline-none p-3 border-none placeholder:font-semibold" placeholder="Type Your Products" />
            <button className="bg-[#00bbae] hover:bg-[#f88e0f] transition-colors duration-300 cursor-pointer flex items-center justify-center w-12 h-12 rounded-md">
              <Search className="w-5 h-5 text-white transition-transform duration-300 hover:scale-105" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full">
          {
            faq_items.map((faq) => {
              const isOpen = isOpenItem === faq?._id;
              return (
                <div className="flex flex-col gap-2 w-full cursor-pointer" key={faq._id} onClick={() => handleToggle(faq?._id)}>
                  <div className="flex gap-3 w-full items-center">
                    <p className="text-[18px] leading-[27px] font-semibold text-[#001430] w-full">{faq.question}</p>
                    <div className="relative w-5 h-5">
                      <div className="w-4 h-4 absolute inset-0">
                        <Plus className={clsx("w-full h-full text-gray-600 transition-all duration-300 ease-in-out transform", { "rotate-0 opacity-100": !isOpen, "rotate-90 opacity-0": isOpen })} /> 
                      </div>
                      <div className="w-4 h-4 absolute inset-0">
                        <Minus className={clsx("w-full h-full text-gray-600 transition-all duration-300 ease-in-out transform", { "rotate-0 opacity-100": isOpen, "rotate-90 opacity-0": !isOpen })} /> 
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-[0.5px] bg-[#69778a]"></div>
                  <div className={clsx("transition-all duration-500 ease-in-out overflow-hidden", isOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0")}>
                    <p className="text-[16px] leading-[24px] font-medium text-[#69778a] w-full">{faq?.answer}</p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Faq;

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AnimatedDropdown = ({ items}) => {

  return (
    <AnimatePresence>
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 6, opacity: 0 }} transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }} className="absolute top-7 left-0 border-[1px] border-gray-400 bg-white w-4xl rounded-md overflow-y-auto z-50 grid grid-cols-4 items-center">
        {
          items.map((item, index) => (
            <div key={index} className="flex gap-5 flex-col w-full cursor-pointer items-start justify-center p-8">
              <p className="text-[18px] px-4 leading-[22px] text-[#001430] transition-colors duration-300 hover:text-[#06a096] font-bold">{item.name}</p>
              <div className="flex flex-col gap-0.5 w-full items-center justify-center">
                {
                  item.toys.map((toy) => (
                    <div className="relative overflow-hidden group w-full px-4 py-2 rounded-md text-[#001430] hover:text-white transition-colors duration-500 items-start justify-center" key={toy._id}>
                      <span className="absolute top-0 left-0 w-full h-0 bg-[#00bbae] z-[-1] transition-all duration-500 group-hover:h-full" />
                      <p className="text-[16px] leading-[20px] font-semibold">{toy.name}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }
      </motion.div>
    </AnimatePresence>
  );
};

const FlipUnit = ({ value }) => {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
    }
  }, [value]);

  return (
    <div className="relative h-[30px] w-[40px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.p
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute w-full text-[#dc3545] font-semibold text-[18px] leading-[27px]"
        >
          {value.toString().padStart(2, "0")}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState(498 * 24 * 60 * 60 + 13 * 3600 + 56 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTimeParts = () => {
    const days = Math.floor(timeLeft / (24 * 3600));
    const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = getTimeParts();

  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="flex">
        <FlipUnit value={days} /> <span className="text-[#dc3545] font-semibold text-[16px] leading-[24px]">:</span>
      </div>
      <div className="flex">
        <FlipUnit value={hours} /> <span className="text-[#dc3545] font-semibold text-[16px] leading-[24px]">:</span>
      </div>
      <div className="flex">
        <FlipUnit value={minutes} /> <span className="text-[#dc3545] font-semibold text-[16px] leading-[24px]">:</span>
      </div>
      <FlipUnit value={seconds} />
    </div>
  );
};

const DropDownMobileTablet = ({ items }) => {

  return (
    <div className="w-full h-full bg-white grid grid-cols-2 p-2 border border-gray-200 rounded-xl md:grid-cols-3">
      {
        items.map((item) => (
          <div key={item._id} className="flex gap-5 flex-col w-full cursor-pointer items-start justify-center p-2">
            <p className="text-[16px] px-2 leading-[20px] text-[#001430] transition-colors duration-300 hover:text-[#06a096] font-semibold">{item.name}</p>
            <div className="flex flex-col gap-0.5 w-full items-start">
              {
                item.toys.map((toy) => (
                  <p key={toy._id} className="text-[16px] px-2 leading-[20px] font-semibold text-[#001430] transition-colors duration-300 hover:text-[#06a096]">{toy.name}</p>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export { AnimatedDropdown, Countdown, ScrollToTop, DropDownMobileTablet };
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import React from "react";


export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-5 z-50 w-10 h-10 bg-[#f88e0f] rounded-full flex items-center justify-center cursor-pointer"
    >
      <ArrowUp className="w-6 h-6 text-white" />
    </div>
  );
}

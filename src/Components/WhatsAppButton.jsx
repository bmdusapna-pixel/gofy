import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import WhatsAppContact from "./WhatsAppContact";
import React from "react";


export default function WhatsAppButton() {
  const [blink, setBlink] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setBlink((b) => !b);
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <WhatsAppContact show={open} onClose={() => setOpen(false)} />

      <div className="fixed bottom-22 z-50 right-5 w-14 h-14">
        <button
          onClick={() => setOpen(!open)}
          className={`w-full h-full bg-green-500 rounded-md flex items-center justify-center transition-transform ${
            blink ? "scale-110" : "scale-100"
          }`}
        >
          <FaWhatsapp className="w-12 h-12 text-white" />
        </button>
      </div>
    </>
  );
}

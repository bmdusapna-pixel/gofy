import React from "react";
import Origninal from "../assets/original.png";
import Quality from "../assets/quality.png";
import SecurePayment from "../assets/secure-payment.jpg";

const TrustIndicators = () => {
  const features = [
    {
      icon: <img src={Origninal} alt="Origninal" className="h-auto w-20" />,
      label: "Genuine Products",
    },
    {
      icon: <img src={Quality} alt="Quality" className="h-auto w-20" />,
      label: "7 Step Quality Check",
    },
    {
      icon: (
        <img src={SecurePayment} alt="SecurePayment" className="h-auto w-20" />
      ),
      label: "Secure Payments",
    },
  ];

  return (
    <div className="bg-transparent flex justify-between items-center gap-16 pt-8">
      {features.map((item, index) => (
        <div key={index} className="text-center text-[#3d3d4e]">
          <div className="flex justify-center">{item.icon}</div>
          <p className="text-md mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default TrustIndicators;

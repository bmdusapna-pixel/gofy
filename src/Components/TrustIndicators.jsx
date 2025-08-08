import React from "react";
import { FiAward, FiCheckCircle, FiShield } from "react-icons/fi";

const TrustIndicators = () => {
  const features = [
    {
      icon: <FiAward className="text-green-500 text-3xl mb-2" />,
      label: "Genuine Products",
    },
    {
      icon: <FiCheckCircle className="text-green-500 text-3xl mb-2" />,
      label: "7 Step Quality Check",
    },
    {
      icon: <FiShield className="text-green-500 text-3xl mb-2" />,
      label: "Secure Payments",
    },
  ];

  return (
    <div className="bg-transparent flex justify-center items-center gap-16 pt-8">
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

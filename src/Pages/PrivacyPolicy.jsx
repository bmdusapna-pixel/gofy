import React from "react";

const privacy_policy = [
  {
    heading: "Introduction",
    description:
      "At Gofy Kids Mall, Model Town, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our store or interact with our services.",
  },
  {
    heading: "Information We Collect",
    description:
      "We collect only the essential information necessary, such as your name, contact number, and email address, at the time of billing, inquiry, or participation in promotional events. This information is used solely for processing transactions, providing customer support, and sharing relevant offers or updates with your consent.",
  },
  {
    heading: "Data Sharing and Third Parties",
    description:
      "We do not sell, rent, or trade your data with any third parties. All customer data is stored securely and is accessible only to authorised personnel. Any third-party service providers we engage with are also bound to maintain the confidentiality of your information.",
  },
  {
    heading: "Data Security",
    description:
      "Our systems are designed to protect your data from unauthorized access, loss, or misuse. While we take all necessary steps to secure your information, you acknowledge that no method of data transmission over the internet or physical system is 100% secure.",
  },
  {
    heading: "Changes to This Policy",
    description:
      "This Privacy Policy may be updated from time to time to reflect changes in our practices or legal requirements. We encourage you to review this policy periodically to stay informed.",
  },
  {
    heading: "Your Consent",
    description:
      "By visiting Gofy Kids Mall or using our services, you agree to the terms of this Privacy Policy.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full mx-auto flex flex-col gap-8 px-5 lg:px-12">
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-black font-semibold">
          Privacy Policy
        </p>
        {privacy_policy.map((item, index) => (
          <div className="flex flex-col gap-1 w-full" key={index}>
            <p className="text-[#001430] text-[27px] leading-[40px] font-bold">
              {item.heading}
            </p>
            <p className="text-[#69778a] text-[16px] leading-[24px] font-medium">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from "react";
import TermBanner from "../assets/terms-conditions.png";

const TermsAndConditions = () => {
  const termsData = [
    {
      heading: "Introduction",
      description:
        "Welcome to Gofy Kids Mall, Model Town! By visiting our store or using our services, you agree to the following terms and conditions. We reserve the right to update or modify these terms at any time without prior notice. All products and services are subject to availability and may be changed or discontinued at our discretion.",
    },
    {
      heading: "Pricing and Product Information",
      description:
        "All prices are in **Indian Rupees (INR)** and inclusive of applicable taxes unless stated otherwise. Discounts, coupons, and promotional offers cannot be combined unless specifically mentioned and are valid only during the mentioned period, subject to stock availability. We strive for accuracy in product descriptions and pricing, though actual product colors, sizes, and packaging may vary slightly from displayed images.",
    },
    {
      heading: "Returns and Exchanges",
      description:
        "Returns and exchanges are accepted within **3 days of purchase**, provided the customer has the **original invoice**, and the product is unused, unwashed, and in its original condition with tags intact. Exchanges are only allowed for size issues or defective products. There will be **no refunds on sale items**. Due to hygiene reasons, baby care and personal care products are non-returnable.",
    },
    {
      heading: "Payment Information",
      description:
        "We accept various payment modes, including **UPI, credit/debit cards, net banking, and cash**. Customers are responsible for providing accurate billing details at the time of purchase, and billing discrepancies must be reported before leaving the store. No changes can be made once the invoice has been finalised.",
    },
    {
      heading: "Customer Conduct and Safety",
      description:
        "We expect all customers to behave respectfully toward our staff and other shoppers. Misconduct, theft, or intentional property damage will result in legal action and removal from the premises. Children must always be **accompanied by an adult**. While we ensure a safe and child-friendly environment, Gofy Kids Mall is not responsible for injuries caused due to lack of supervision.",
    },
    {
      heading: "Warranties and Liability",
      description:
        "Gofy Kids Mall does not provide warranties beyond what is offered by the manufacturer, if applicable. We are not liable for any indirect or consequential damages arising from product usage. We are only giving the manufacturer's Warranty, which is mentioned on the product.",
    },
    {
      heading: "Store Operations and Contact",
      description:
        "Our store operates from **10:00 AM to 10:00 PM, all days of the week**. Entry may be restricted temporarily in case of overcrowding or safety concerns. For further queries or assistance, please reach us at **gofywebsite@gmail.com**.",
    },
  ];

  return (
    <div>
      {/* <div className="flex flex-col items-center">
        <img
          src={TermBanner}
          alt="term banner"
          className="w-full object-cover mb-8"
        />
      </div> */}
      <div className="w-full h-full py-10 bg-[#f8f9fa]">
        <div className="w-full mx-auto flex flex-col gap-8 px-5 lg:px-12">
          <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-black font-semibold">
            Terms and Conditions
          </p>
          {termsData.map((item, index) => (
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
    </div>
  );
};

export default TermsAndConditions;

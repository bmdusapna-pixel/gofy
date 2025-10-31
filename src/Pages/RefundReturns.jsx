import React from "react";
import {
  RotateCcw,
  FileWarning,
  Ban,
  RefreshCcw,
  Truck,
  Package,
  Headphones,
  PencilLine,
  CircleCheck,
  CircleX,
} from "lucide-react";

const refund_returns = [
  {
    icon: <RotateCcw className="w-6 h-6 text-[#001430]" />,
    heading: "Overview",
    description: `At Gofy Kids Mall, customer satisfaction is our priority. We ensure all products are thoroughly checked and packed before dispatch. However, if you face any genuine issue with the product, we are here to assist you with returns or refunds as per the policy below.

We do not offer order cancellation once the order is placed.`,
  },
  {
    icon: <FileWarning className="w-6 h-6 text-[#001430]" />,
    heading: "Return Eligibility",
    list: [
      "Wrong product received",
      "Damaged or defective product received",
      "Missing items from the order",
      "Product received in different size/color than ordered (for applicable items like fashion & footwear)",
    ],
  },
  {
    icon: <Ban className="w-6 h-6 text-[#001430]" />,
    heading: "Conditions for Return",
    list: [
      "It is unused and in original condition",
      "All original tags, labels, box/packaging, and freebies (if any) are intact",
      "Return request is raised within 48 hours of delivery",
      "Damaged/defective proof (unboxing video & product photos) is provided",
      "Unboxing video is mandatory to process damaged/defective claims",
    ],
  },
  {
    icon: <CircleX className="w-6 h-6 text-[#d9534f]" />,
    heading: "Items Not Eligible for Return",
    list: [
      "Products without unboxing video",
      "Used or damaged products by customer",
      "Products bought during clearance/sale",
      "Hygiene products (baby care, personal care, feeders, toothbrushes, etc.)",
      "Customised or personalised products",
      "Toys or items damaged due to rough handling by the customer",
      "Gift sets once opened",
    ],
    listIcon: <CircleX className="w-4 h-4 mt-1 text-red-500" />,
  },
  {
    icon: <RefreshCcw className="w-6 h-6 text-[#001430]" />,
    heading: "Refund Process",
    list: [
      "Once the returned product passes quality check, refund will be issued to the original mode of payment.",
      "Processing time: 5–7 business days.",
      "If the product fails quality check, refund/return will not be processed, and the item will be sent back to the customer (courier charge applicable).",
    ],
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-[#001430]" />,
    heading: "Exchange Policy",
    description:
      "Exchanges are allowed only for size or defective items (if stock is available). If replacement is not available, a refund will be provided as per policy.",
  },
  {
    icon: <Truck className="w-6 h-6 text-[#001430]" />,
    heading: "Return Shipping",
    list: [
      "For damaged/incorrect items → Free return pickup",
      "For size exchanges/customer reasons (if allowed) → Return shipping may be borne by customer",
    ],
  },
  {
    icon: <Package className="w-6 h-6 text-[#001430]" />,
    heading: "Product Packaging",
    description:
      "Please ensure the package is properly secured for return transit. We are not responsible for products damaged during return shipping due to poor packaging.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-[#001430]" />,
    heading: "Contact Support",
    list: [
      "Email: gofykidsmall@gmail.com",
      "Phone/WhatsApp: 9711322443",
      "Support hours: 10 AM – 7 PM (Mon–Sat)",
    ],
  },
  {
    icon: <PencilLine className="w-6 h-6 text-[#001430]" />,
    heading: "Policy Amendments",
    description:
      "Gofy Kids Mall reserves the right to amend this policy at any time without prior notice. The latest policy will always be available on our website.",
  },
];

const RefundReturns = () => {
  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full mx-auto flex flex-col gap-8 px-5 lg:px-12">
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-black font-semibold">
          Refund & Return Policy
        </p>

        {refund_returns.map((item, index) => (
          <div className="flex flex-col gap-3 w-full" key={index}>
            <div className="flex items-center gap-2">
              {item.icon}
              <p className="text-[#001430] text-[24px] leading-[36px] font-bold">
                {item.heading}
              </p>
            </div>

            {item.description && (
              <p className="text-[#69778a] text-[16px] leading-[26px] font-medium whitespace-pre-line">
                {item.description}
              </p>
            )}

            {item.list && (
              <ul className="flex flex-col gap-2 pl-2">
                {item.list.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    {item.listIcon || (
                      <CircleCheck className="w-4 h-4 mt-1 text-green-600" />
                    )}
                    <span className="text-[#69778a] text-[16px] leading-[24px] font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RefundReturns;

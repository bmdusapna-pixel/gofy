import React from "react";
import {
  Truck,
  Timer,
  FileText,
  RotateCcw,
  PackageCheck,
  CreditCard,
  MapPin,
  AlertTriangle,
  Clock,
  Headphones,
  CircleCheck,
  CircleX,
} from "lucide-react";

const shipping_policy = [
  {
    icon: <Timer className="w-6 h-6 text-[#001430]" />,
    heading: "Order Processing",
    description: `All orders are processed within 1–2 business days after payment confirmation.

Orders placed after business hours, weekends, or public holidays will be processed on the next working day.`,
  },
  {
    icon: <Truck className="w-6 h-6 text-[#001430]" />,
    heading: "Shipping Timeline",
    description: `Estimated delivery time after dispatch:

• Within City (Local): 1–2 business days
• Within State: 2–4 business days
• Metro Cities: 3–7 business days
• Rest of India: 4–10 business days

Delivery timelines may vary due to weather, festivals, operational delays, or logistics issues.`,
  },
  {
    icon: <FileText className="w-6 h-6 text-[#001430]" />,
    heading: "Tracking Details",
    description: `Once your order is shipped, you will receive an SMS/Email/WhatsApp with the tracking number and link.

You can track your shipment online using the tracking link provided.`,
  },
  {
    icon: <RotateCcw className="w-6 h-6 text-[#001430]" />,
    heading: "Delivery Attempts",
    description: `Our courier partner will attempt delivery up to 2–3 times.

If the package is undelivered due to customer unavailability, incorrect address, or contact details, re-shipping charges may apply.`,
  },
  {
    icon: <PackageCheck className="w-6 h-6 text-[#001430]" />,
    heading: "Shipping Charges",
    description: `Shipping charges may vary based on order value, product weight, and delivery location.

Any applicable delivery fee will be shown at checkout before payment.`,
  },
  {
    icon: <CreditCard className="w-6 h-6 text-[#001430]" />,
    heading: "Cash on Delivery (COD)",
    description: `COD may be available for select products and pin codes.

COD orders may include a small service fee (if applicable).

Refusing a COD order after dispatch may result in future COD service being blocked.`,
  },
  {
    icon: <MapPin className="w-6 h-6 text-[#001430]" />,
    heading: "Address & Contact Details",
    description: `Customers must provide accurate and complete shipping address along with an active mobile number.

We are not responsible for non-delivery due to incorrect or incomplete information.`,
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-[#d9534f]" />,
    heading: "Damaged Package on Delivery",
    list: [
      "Do not accept the package if it appears physically damaged or tampered.",
      "Inform us immediately with photos or video evidence.",
      "We will arrange resolution as per our return policy.",
    ],
    listIcon: <CircleX className="w-4 h-4 mt-1 text-red-500" />,
  },
  {
    icon: <Clock className="w-6 h-6 text-[#001430]" />,
    heading: "Delivery Delays",
    list: [
      "Logistics or transport issues",
      "Natural calamities",
      "Strikes or festive rush",
      "Service restrictions in certain areas",
    ],
    description:
      "We always aim to deliver on time, but rare delays may occur due to the reasons above. We appreciate your patience and understanding.",
  },
  {
    icon: <Headphones className="w-6 h-6 text-[#001430]" />,
    heading: "Contact for Shipping Queries",
    list: [
      "Email: gofykidsmall@gmail.com",
      "Phone/WhatsApp: +91-9711322433",
      "Support hours: 10 AM – 7 PM (Mon–Sat)",
    ],
  },
];

const ShippingPolicy = () => {
  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full mx-auto flex flex-col gap-8 px-5 lg:px-12">
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-black font-semibold">
          Shipping & Delivery Policy
        </p>

        {shipping_policy.map((item, index) => (
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

export default ShippingPolicy;

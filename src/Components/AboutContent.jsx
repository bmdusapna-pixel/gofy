import React from "react";
import childPlay from "../assets/about_01.jpg";

const AboutContent = () => {
  const aboutSections = [
    // {
    //   heading: "Welcome to Gofy Kids Mall!",
    //   description:
    //     "Welcome to Gofy Kids Mall, Model Town – your one-stop destination for everything your little one needs! From trendy kidswear and comfortable footwear to a wide range of toys, games, and baby care essentials, we bring the best of quality and fun under one colorful roof.",
    // },
    // {
    //   heading: "Our Philosophy",
    //   description:
    //     "At Gofy Kids Mall, we believe that childhood should be celebrated with joy, creativity, and comfort. That’s why every product we offer is carefully curated to meet the highest standards of safety, durability, and style. Whether you're shopping for a newborn or a growing child, our mall is designed to make your experience smooth, playful, and family-friendly.",
    // },
    {
      heading: "What You'll Find at Gofy:", // Updated heading for clarity
      listItems: [
        "Kids Clothing – Trendy, colorful, and comfortable clothes for babies, toddlers, and kids, including exclusive daily wear and festive collections.",
        "Footwear – Shoes, sandals, and slippers made for small feet with care.",
        "Toys – Fun, safe, and educational toys for all age groups, including a thoughtfully selected range of educational and fun toys.",
        "Baby Care Products – Diapers, creams, shampoos, and everything new parents need, ensuring reliable and gentle care.",
        "School Supplies – Bags, bottles, lunchboxes, stationery, and more.",
      ],
    },
    {
      heading: "Why Parents Love Gofy:", // Added a section for "Why Parents Love Gofy"
      listItems: [
        "Good Quality Products",
        "Pocket-Friendly Prices",
        "Friendly Staff and Clean Store",
        "Wide Variety in Every Category",
        "Valet Parking for your comfort",
      ],
    },
    {
      heading: "Our Commitment",
      description:
        "Our team is dedicated to offering a warm and helpful shopping experience. With spacious aisles, child-friendly sections, and regular promotional offers, Gofy Kids Mall is more than just a store – it’s a vibrant space where shopping becomes a happy memory.",
    },
    // {
    //   heading: "Visit Us Today!",
    //   description:
    //     "We invite you to step in and explore a world designed just for kids – because at Gofy, growing up is a celebration! Come and explore Gofy Kids Mall – where every child smiles, and every parent relaxes. Gofy Kids Mall – Your Child’s Favourite Store.",
    // },
  ];

  return (
    <div className="w-full h-full py-10">
      <div className="w-full mx-auto flex gap-8 px-5 lg:px-12">
        <div className="md:w-2/3">
          {aboutSections.map((section, index) => (
            <div className="flex flex-col gap-1 w-full" key={index}>
              <p className="text-[#001430] text-[27px] leading-[40px] font-bold">
                {section.heading}
              </p>
              {section.description && (
                <p className="text-[#69778a] text-[16px] leading-[24px] font-medium">
                  {section.description}
                </p>
              )}
              {section.listItems && (
                <ul className="list-disc pl-5 text-[#69778a] text-[16px] leading-[24px] font-medium">
                  {section.listItems.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="md:w-1/3 hidden md:block">
          <img
            src={childPlay}
            alt="About Us"
            className="w-auto h-full rounded-lg object-cover shadow-md"
            style={{
              clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutContent;

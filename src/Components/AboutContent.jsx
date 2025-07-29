import React from "react";

const AboutContent = () => {
  const aboutSections = [
    {
      heading: "Welcome to Gofy Kids Mall!",
      description:
        "Welcome to Gofy Kids Mall, Model Town – your one-stop destination for everything your little one needs! From trendy kidswear and comfortable footwear to a wide range of toys, games, and baby care essentials, we bring the best of quality and fun under one colorful roof.",
    },
    {
      heading: "Our Philosophy",
      description:
        "At Gofy Kids Mall, we believe that childhood should be celebrated with joy, creativity, and comfort. That’s why every product we offer is carefully curated to meet the highest standards of safety, durability, and style. Whether you're shopping for a newborn or a growing child, our mall is designed to make your experience smooth, playful, and family-friendly.",
    },
    {
      heading: "Our Model Town store offers:", // This is the heading for the list
      listItems: [
        "An exclusive range of kids’ fashion – from daily wear to festive collections.",
        "A thoughtfully selected range of educational and fun toys.",
        "Reliable and gentle baby care products.",
        "Stylish, comfortable footwear for all kids.",
      ],
    },
    {
      heading: "Our Commitment",
      description:
        "Our team is dedicated to offering a warm and helpful shopping experience. With spacious aisles, child-friendly sections, and regular promotional offers, Gofy Kids Mall is more than just a store – it’s a vibrant space where shopping becomes a happy memory.",
    },
    {
      heading: "Visit Us!",
      description:
        "We invite you to step in and explore a world designed just for kids – because at Gofy, growing up is a celebration!",
    },
  ];

  return (
    <div className="w-full h-full py-10">
      <div className="w-full mx-auto flex flex-col gap-8 px-5 lg:px-12">
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
    </div>
  );
};

export default AboutContent;

import { Link } from "react-router-dom";
import React from "react";
const product = {
  name: "Outdoor Swing Set",
  price: 1199,
  images: [
    "https://www.radiustheme.com/demo/wordpress/themes/toyup/wp-content/uploads/2024/01/product_17.png",
  ],
};

export default function FloatingProductCard({ open }) {
  return (
    <div
      className="w-72 transition-transform duration-500 ease-in-out rounded-md h-32 fixed left-10 z-40 bottom-5 bg-white"
      style={{
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        transform: open
          ? "translateX(0)"
          : "translateX(calc(-100% - 2.5rem))",
      }}
    >
      <div className="flex w-full items-center">
        <div className="w-44 h-32 flex items-center justify-center">
          <img src={product.images[0]} className="w-full" alt={product.name} />
        </div>
        <div className="py-4 flex flex-col gap-2 w-full items-center">
          <Link
            to="/product-details"
            className="text-[16px] font-semibold hover:text-[#00bbae]"
          >
            {product.name}
          </Link>
          <p className="font-semibold">₹{product.price}</p>
        </div>
      </div>
    </div>
  );
}

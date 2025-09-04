import React, { useState, useEffect } from "react";

const colorsDemo = [
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Black", value: "#000000" },
];

export default function ColorFilter({ selectedColor, setVariant, variants }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [colors, setColors] = useState([]);
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await fetch(`${baseUrl}/color/colors`);
        const result = await response.json();
        setColors(result);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };
    fetchColors();
  }, [baseUrl]);

  return (
    <div className="flex items-center gap-3">
      {!variants &&
        colorsDemo.map((color) => (
          <button
            key={color.value}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-200 border-gray-300`}
            style={{ backgroundColor: color.value }}
          />
        ))}
      {variants &&
        variants.length > 1 &&
        variants.map((v) => (
          <button
            key={v._id}
            onClick={() => setVariant(v)}
            className={`w-6 h-6 rounded-full border-2 transition-all duration-200 
            ${
              selectedColor === v.color
                ? "border-gray-800 scale-110"
                : "border-gray-300"
            }
          `}
            style={{
              backgroundColor: colors.find((c) => c._id === v.color._id)
                ?.hexCode,
            }}
          />
        ))}
    </div>
  );
}

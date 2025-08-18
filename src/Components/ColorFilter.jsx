import React, { useState } from "react";

const colors = [
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Black", value: "#000000" },
];

export default function ColorFilter() {
  const [selectedColor, setSelectedColor] = useState(null);

  return (
    <div className="flex items-center gap-3">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => setSelectedColor(color.value)}
          className={`w-10 h-10 rounded-full border-2 transition-all duration-200 
            ${
              selectedColor === color.value
                ? "border-gray-800 scale-110"
                : "border-gray-300"
            }
          `}
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  );
}

import React, { useState, useEffect } from "react";

const colorsDemo = [
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Black", value: "#000000" },
];

export default function ColorFilter({ 
  selectedColor, 
  setVariant, 
  variants, 
  setSelectedAgeGroup 
}) {
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

  const handleColorChange = (variant) => {
    setVariant(variant);
    // Set the first available age group when color changes
    if (variant.ageGroups && variant.ageGroups.length > 0) {
      // Find first available age group (stock > 0) or fallback to first one
      const availableAgeGroup = variant.ageGroups.find(ag => ag.stock > 0) || variant.ageGroups[0];
      if (setSelectedAgeGroup) {
        setSelectedAgeGroup(availableAgeGroup);
      }
    }
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {!variants &&
        colorsDemo.map((color) => (
          <button
            key={color.value}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 border-gray-300 hover:scale-110`}
            style={{ backgroundColor: color.value }}
          />
        ))}
      {variants &&
        variants.length > 1 &&
        variants.map((v) => {
          const isSelected = selectedColor?._id === v.color?._id;
          const colorHex = colors.find((c) => c._id === v.color._id)?.hexCode || "#000000";
          
          return (
            <button
              key={v.color._id}
              onClick={() => handleColorChange(v)}
              className={`w-10 h-10 rounded-md border-2 transition-all duration-200 ${
                isSelected
                  ? "border-black scale-110 shadow-md"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              style={{
                backgroundColor: colorHex,
              }}
              title={v.color.name}
            />
          );
        })}
      {variants && variants.length === 1 && (
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-md border-2 border-gray-300"
            style={{
              backgroundColor: colors.find((c) => c._id === variants[0].color._id)?.hexCode || "#000000",
            }}
          />
          <span className="text-sm text-gray-700 font-medium">
            {variants[0].color.name}
          </span>
        </div>
      )}
    </div>
  );
}

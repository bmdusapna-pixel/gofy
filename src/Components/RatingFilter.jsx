import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const RatingFilter = ({
  headingTitle,
  selectedRating,
  setSelectedRating,
  groupName,
}) => {
  const ratingOptions = [
    { value: "All", label: "All" },
    { value: "5", label: "5 Stars & Up" },
    { value: "4", label: "4 Stars & Up" },
    { value: "3", label: "3 Stars & Up" },
    { value: "2", label: "2 Stars & Up" },
    { value: "1", label: "1 Star & Up" },
  ];

  // The state is now managed by the parent, so we only need a way to track the open/close state locally.
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleRatingChange = (event) => {
    setSelectedRating(event.target.value);
    console.log("Selected Rating:", event.target.value);
  };

  return (
    <div className="border border-gray-200 rounded-xl bg-white flex flex-col shadow-sm">
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex flex-col gap-2 w-full">
          <p className="text-[18px] leading-[27px] font-semibold text-gray-800">
            {headingTitle}
          </p>
        </div>
        <ChevronDown
          className={`h-6 w-6 text-gray-500 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] p-4 pt-0" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          {ratingOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer text-gray-700"
            >
              <input
                type="radio"
                name={groupName}
                value={option.value}
                checked={selectedRating === option.value}
                onChange={handleRatingChange}
                className="form-radio h-4 w-4 text-orange-500 border-gray-300 focus:ring-orange-500 mr-2"
              />
              <span className="text-base">
                {option.label}
                {option.value !== "All" && (
                  <span className="ml-1 text-yellow-400">
                    {"★".repeat(Number(option.value))}
                  </span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;

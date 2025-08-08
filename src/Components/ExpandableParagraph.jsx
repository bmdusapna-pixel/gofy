import React, { useState } from "react";

const ExpandableParagraph = ({ text, ref }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(" ");
  const firstTwoLines = words.slice(0, 100).join(" ") + "...";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div ref={ref}>
      <p>{isExpanded ? text : firstTwoLines}</p>
      <button onClick={toggleExpand} className="text-blue-500">
        {isExpanded ? "Show Less" : "Read More"}
      </button>
    </div>
  );
};

export default ExpandableParagraph;

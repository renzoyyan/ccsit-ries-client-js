import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full h-1.5 bg-gray-200 rounded-md transition-all duration-300 ease-in-out">
      <div
        className="h-1.5 bg-bc-tertiary rounded-md transition-all duration-300 ease-in-out"
        style={{ width: String(percentage) + "%" }}
      ></div>
    </div>
  );
};

export default ProgressBar;

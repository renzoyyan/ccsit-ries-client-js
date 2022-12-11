import React from "react";

const SuccessMessage = ({ message }) => {
  return (
    <div className="px-4 py-3 mb-2 font-medium text-green-600 bg-green-100 border-l-4 border-green-500 gap-x-2">
      <p>{message}</p>
    </div>
  );
};

export default SuccessMessage;

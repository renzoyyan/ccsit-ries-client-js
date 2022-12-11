import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="px-4 py-3 mb-2 bg-red-100 border-l-4 border-red-500 error-msg gap-x-2">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;

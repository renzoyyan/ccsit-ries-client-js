import React from "react";

const FormContainer = ({ children }) => {
  return (
    <div className="px-6 py-8 bg-white rounded-md shadow-sm ring-1 ring-gray-100">
      {children}
    </div>
  );
};

export default FormContainer;

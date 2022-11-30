import { classNames } from "@/utils/utils";
import React from "react";

const FormContainer = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "px-6 py-8 mb-10 bg-white rounded-md shadow-sm ring-1 ring-gray-100",
        className
      )}
    >
      {children}
    </div>
  );
};

export default FormContainer;

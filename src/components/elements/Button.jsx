import React from "react";
import { classNames } from "../../utils/utils";

const Button = ({ className, type, children, ...props }) => {
  return (
    <button
      className={classNames(className)}
      type={type || "button"}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

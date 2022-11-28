import React from "react";

const ModalBody = ({ className = "", children, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export default ModalBody;

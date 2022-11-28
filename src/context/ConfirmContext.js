import React, { createContext, useState } from "react";

export const ConfirmContext = createContext();

const ConfirmProvider = ({ children }) => {
  const [confirm, setConfirm] = useState({
    prompt: "",
    title: "",
    isOpen: false,
    proceed: null,
    cancel: null,
  });

  return (
    <ConfirmContext.Provider value={[confirm, setConfirm]}>
      {children}
    </ConfirmContext.Provider>
  );
};
export default ConfirmProvider;

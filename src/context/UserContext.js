import useModal from "@/hooks/useModal";
import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { isOpen, toggleModal } = useModal();

  const handleGetUserId = (user_id) => {
    setSelectedUserId(user_id);
  };

  let contextValue = {
    selectedUserId,
    setSelectedUserId,
    isOpen,
    toggleModal,
    handleGetUserId,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
export default UserProvider;

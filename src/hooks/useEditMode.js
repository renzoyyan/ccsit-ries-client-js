import { useState } from "react";

const useEditMode = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditPersonal, setIsEditPersonal] = useState(false);

  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };

  const handleEditAccount = () => {
    if (isEditPersonal) {
      setIsEditPersonal((prev) => !prev);
    }

    setIsEdit((prev) => !prev);
  };

  const handleEditPersonal = () => {
    if (isEdit) {
      setIsEdit((prev) => !prev);
    }

    setIsEditPersonal((prev) => !prev);
  };

  return {
    isEdit,
    setIsEdit,
    handleEdit,
    isEditPersonal,
    setIsEditPersonal,
    handleEditPersonal,
    handleEditAccount,
  };
};

export default useEditMode;

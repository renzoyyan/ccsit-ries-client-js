import { useContext, useEffect, useState } from "react";
import { ConfirmContext } from "@/context/ConfirmContext";

const useConfirm = () => {
  const [confirm, setConfirm] = useContext(ConfirmContext);
  const [needsCleanup, setNeedsCleanup] = useState(false);

  const isConfirmed = (prompt, title) => {
    const promise = new Promise((resolve, reject) => {
      setConfirm({
        prompt,
        title,
        isOpen: true,
        proceed: resolve,
        cancel: reject,
      });
    });

    const reset = () => {
      setConfirm({ prompt: "", proceed: null, cancel: null, isOpen: false });
      setNeedsCleanup(false);
    };

    return promise.then(
      () => {
        reset();
        return true;
      },
      () => {
        reset();
        return false;
      }
    );
  };

  useEffect(() => {
    return () => {
      if (confirm.cancel && needsCleanup) {
        confirm.cancel();
      }
    };
  }, [confirm, needsCleanup]);

  return {
    ...confirm,
    isConfirmed,
  };
};

export default useConfirm;

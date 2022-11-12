import api from "@/utils/api";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const useProponent = () => {
  const [proponents, setProponents] = useState(null);

  const { access_token, current_user } = useAuth();

  const getAllProponents = async () => {
    try {
      const res = await api.get("/api/users/proponents", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const _proponents = res.data;

      if (!_proponents) return null;

      setProponents(_proponents);
      return _proponents;
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProponents = proponents?.docs?.filter(
    (proponent) => proponent._id !== current_user
  );

  const proponentOptions = filteredProponents?.map((proponent) => {
    const name = `${proponent.first_name} ${proponent.last_name}`;

    return { value: String(proponent._id), label: name };
  });

  return {
    proponents,
    current_user,
    getAllProponents,
    proponentOptions,
  };
};

export default useProponent;

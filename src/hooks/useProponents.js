import { useQuery } from "@tanstack/react-query";
import api from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

const useProponents = () => {
  const { access_token, current_user } = useAuth();

  const getAllProponents = async () => {
    const { data } = await api.get("/api/users/proponents", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["proponents"],
    queryFn: () => getAllProponents(),
  });

  const filteredVerified = data?.docs?.filter(
    (proponent) => proponent.email_verified !== false
  );

  const proponentOptions = filteredVerified?.map((proponent) => {
    const name = `${proponent.first_name} ${proponent.last_name}`;

    return { value: String(proponent._id), label: name };
  });

  return {
    proponentOptions,
    isLoading,
    isError,
    error,
    data,
  };
};

export default useProponents;

import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

const useUsers = () => {
  const { access_token } = useAuth();

  const getUsers = async () => {
    const { data } = await api.get("/api/users", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const getUserById = async (user_id) => {
    const { data } = await api.get(`/api/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const addUser = async (user) => {
    const { data } = await api.post(`/api/users`, user, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const updateUserById = async (user_id) => {
    const { data } = await api.patch(`/api/users/${user_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  return {
    getUsers,
    getUserById,
    addUser,
    updateUserById,
  };
};

export default useUsers;

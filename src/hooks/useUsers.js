import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useUsers = () => {
  const { access_token } = useAuth();

  const getUsers = async () => {
    const { data } = await api.get("/api/users?page=1&limit=10", {
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

  const addUser = async (values) => {
    const {
      image,
      role,
      first_name,
      last_name,
      suffix,
      doctorate_degree,
      username,
      password,
    } = values;

    let formData = new FormData();

    formData.append("role", role);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("suffix", suffix);
    formData.append("doctorate_degree", doctorate_degree);
    formData.append("username", username);
    formData.append("password", password);
    if (isFile(image)) formData.append("image", image);

    const { data } = await api.post(`/api/users/new`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const updateUserById = async (user_id, values) => {
    const {
      image,
      role,
      first_name,
      last_name,
      suffix,
      doctorate_degree,
      username,
    } = values;

    let formData = new FormData();

    formData.append("role", role);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("suffix", suffix);
    formData.append("doctorate_degree", doctorate_degree);
    formData.append("username", username);
    if (isFile(image)) formData.append("image", image);

    const { data } = await api.patch(`/api/users/${user_id}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  // update user by id without file or image
  const updateUserDetails = async (user_id, values) => {
    const { data } = await api.patch(`/api/users/${user_id}`, values, {
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
    updateUserDetails,
  };
};

export default useUsers;

import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useUsers = () => {
  const { access_token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const getUsers = async (params) => {
    const { data } = await api.get("/api/users", {
      params,
      ...config,
    });

    return data;
  };

  const getUserById = async (user_id) => {
    const { data } = await api.get(`/api/users/${user_id}`, config);

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
      email,
    } = values;

    let formData = new FormData();

    formData.append("role", role);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("suffix", suffix);
    formData.append("doctorate_degree", doctorate_degree);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    if (isFile(image)) formData.append("image", image);

    const { data } = await api.post(`/api/users/new`, formData, config);

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

    const { data } = await api.patch(`/api/users/${user_id}`, formData, config);

    return data;
  };

  // update user by id without file or image
  const updateUserDetails = async (user_id, values) => {
    const { data } = await api.patch(`/api/users/${user_id}`, values, config);

    return data;
  };

  const sendEmailVerificationLink = async (email) => {
    const { data } = await api.post(
      `/api/users/send/email-verification`,
      { email },
      config
    );

    return data;
  };

  return {
    getUsers,
    getUserById,
    addUser,
    updateUserById,
    updateUserDetails,
    sendEmailVerificationLink,
  };
};

export default useUsers;

import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";

const useNotification = () => {
  const { access_token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const getNotifications = async () => {
    const { data } = await api.get("/api/notification", config);

    return data;
  };

  const getUserNotifications = async () => {
    const { data } = await api.get("/api/notification/current-user", config);

    return data;
  };

  const sendNotification = async (values, params) => {
    const { data } = await api.post("/api/notification/new", values, {
      params,
      ...config,
    });

    return data;
  };

  const updateNotification = async (notification_id) => {
    const { data } = await api.patch(
      `/api/notification/read/${notification_id}`,
      {
        isRead: true,
      },
      config
    );

    return data;
  };

  return {
    getNotifications,
    getUserNotifications,
    sendNotification,
    updateNotification,
  };
};

export default useNotification;

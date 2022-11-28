import api from "@/utils/api";

const getNotifications = async () => {
  const { data } = await api.get("/api/notification");

  return data;
};

const getUserNotifications = async () => {
  const { data } = await api.get("/api/notification/current-user");

  return data;
};

const sendNotification = async (values, params) => {
  const { data } = await api.post("/api/notification/new", values, { params });

  return data;
};

const notificationApi = {
  sendNotification,
  getUserNotifications,
  getNotifications,
};

export default notificationApi;

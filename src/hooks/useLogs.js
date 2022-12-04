import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useLogs = () => {
  const { access_token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  const getLogById = async (log_id) => {
    const { data } = await api.get(`/api/log/${log_id}`, config);

    return data;
  };

  const updateLogById = async (log_id, values) => {
    const { log_title, date_completion, ongoing, file } = values;

    let formData = new FormData();

    formData.append("log_title", log_title);
    formData.append("date_completion", date_completion);
    formData.append("ongoing", ongoing);
    if (isFile(file)) formData.append("file", file);

    const { data } = await api.patch(`/api/log/${log_id}`, formData, config);

    return data;
  };

  return {
    getLogById,
    updateLogById,
  };
};

export default useLogs;

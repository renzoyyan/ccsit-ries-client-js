import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useLogs = () => {
  const { access_token } = useAuth();

  const createResearchLog = async (research_id, values) => {
    const { log_title, date_completion, file } = values;

    let formData = new FormData();

    formData.append("log_title", log_title);
    formData.append("date_completion", date_completion);
    if (isFile(file)) formData.append("file", file);

    const { data } = await api.post(
      `/api/log/new?research_id=${research_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    console.log([data, values]);

    return data;
  };

  const createExtensionLog = async (extension_id, values) => {
    const { log_title, date_completion, file } = values;

    let formData = new FormData();

    formData.append("log_title", log_title);
    formData.append("date_completion", date_completion);
    if (isFile(file)) formData.append("file", file);

    const { data } = await api.post(
      `/api/log/new?extension_id=${extension_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  };
  const getResearchLogsById = async (id) => {
    const { data } = await api.get(`/api/log/research/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };
  const getExtensionLogsById = async (id) => {
    const { data } = await api.get(`/api/log/extension/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  return {
    getResearchLogsById,
    getExtensionLogsById,
    createResearchLog,
    createExtensionLog,
  };
};

export default useLogs;

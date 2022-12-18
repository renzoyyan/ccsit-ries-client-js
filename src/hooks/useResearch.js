import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useResearch = () => {
  const { access_token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  // RESEARCH API

  const createResearch = async (values) => {
    const {
      flag,
      file,
      research_title,
      research_agenda,
      proponents,
      project_duration,
      project_budget,
      implementing_agencies,
      collaborating_agencies,
      status,
      keywords,
    } = values;

    let formData = new FormData();

    const statusValue = flag === "new" ? "pending" : status;

    if (isFile(file)) formData.append("file", file);
    formData.append("flag", flag);
    formData.append("research_title", research_title);
    formData.append("research_agenda", research_agenda);
    formData.append("proponents", JSON.stringify(proponents));
    formData.append("project_duration", project_duration);
    formData.append("project_budget", project_budget);
    formData.append("status", statusValue);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append(
      "implementing_agencies",
      JSON.stringify(implementing_agencies)
    );
    formData.append(
      "collaborating_agencies",
      JSON.stringify(collaborating_agencies)
    );

    const { data } = await api.post("/api/research/new", formData, config);

    return data;
  };

  const getAllResearch = async (params) => {
    const { data } = await api.get("/api/research", {
      params,
      ...config,
    });

    return data;
  };

  const getCurrentUserResearchProjects = async (params) => {
    const { data } = await api.get("/api/research/user-research", {
      params,
      ...config,
    });

    return data;
  };

  const getResearchById = async (research_id) => {
    const { data } = await api.get(`/api/research/${research_id}`, config);

    return data;
  };

  const updateResearchById = async (research_id, values) => {
    const { data } = await api.patch(
      `/api/research/${research_id}`,
      values,
      config
    );

    return data;
  };

  const updateResearchStatus = async (research_id, status) => {
    const { data } = await api.patch(
      `/api/research/change-status/${research_id}`,
      { status: status },
      config
    );

    return data;
  };

  // COMMENTS API

  const getComments = async (research_id) => {
    const { data } = await api.get(
      `/api/comment/research/${research_id}`,
      config
    );

    return data;
  };

  const createComment = async (research_id, values) => {
    const { data } = await api.post(
      `/api/comment/research/${research_id}`,
      values,
      config
    );

    return data;
  };

  // RESEARCH LOG API

  const createResearchLog = async (research_id, values) => {
    const { log_title, date_completion, ongoing, file } = values;

    let formData = new FormData();

    formData.append("log_title", log_title);
    formData.append("date_completion", date_completion);
    formData.append("ongoing", ongoing);
    if (isFile(file)) formData.append("file", file);

    const { data } = await api.post(
      `/api/log/new?research_id=${research_id}`,
      formData,
      config
    );

    return data;
  };
  const getResearchLogsById = async (id) => {
    const { data } = await api.get(`/api/log/research/${id}`, config);

    return data;
  };
  return {
    access_token,
    createResearch,
    createComment,
    createResearchLog,
    getAllResearch,
    getResearchById,
    getCurrentUserResearchProjects,
    getComments,
    getResearchLogsById,
    updateResearchById,
    updateResearchStatus,
  };
};

export default useResearch;

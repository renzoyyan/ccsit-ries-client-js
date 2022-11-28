import api from "@/utils/api";
import { isFile } from "@/utils/utils";

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
  formData.append(
    "implementing_agencies",
    JSON.stringify(implementing_agencies)
  );
  formData.append(
    "collaborating_agencies",
    JSON.stringify(collaborating_agencies)
  );

  const { data } = await api.post("/api/research/new", formData);

  return data;
};

const getAllResearch = async () => {
  const { data } = await api.get("/api/research");

  return data;
};

const getCurrentUserResearchProjects = async (page = 1, limit = 10) => {
  const { data } = await api.get("/api/research/current-user", {
    params: {
      page,
      limit,
    },
  });

  return data;
};

const getResearchById = async (research_id) => {
  const { data } = await api.get(`/api/research/${research_id}`);

  return data;
};

const updateResearchById = async (research_id, values) => {
  const { data } = await api.patch(`/api/research/${research_id}`, values);

  return data;
};

const updateResearchStatus = async (research_id, status) => {
  const { data } = await api.patch(
    `/api/research/change-status/${research_id}`,
    { status: status }
  );

  return data;
};

// COMMENTS API

const getComments = async (research_id) => {
  const { data } = await api.get(`/api/comment/research/${research_id}`);

  return data;
};

const createComment = async (research_id, values) => {
  const { data } = await api.post(
    `/api/comment/research/${research_id}`,
    values
  );

  return data;
};

// LOGS API SPECIFICALLY RESEARCH

const createResearchLog = async (research_id, values) => {
  const { log_title, date_completion, file } = values;

  let formData = new FormData();

  formData.append("log_title", log_title);
  formData.append("date_completion", date_completion);
  if (isFile(file)) formData.append("file", file);

  const { data } = await api.post(
    `/api/log/new?research_id=${research_id}`,
    formData
    // {
    //   headers: {
    //     Authorization: `Bearer ${access_token}`,
    //   },
    // }
  );

  return data;
};
const getResearchLogsById = async (id) => {
  const { data } = await api.get(`/api/log/research/${id}`);

  return data;
};

const researchApi = {
  createResearch,
  createComment,
  createResearchLog,
  getAllResearch,
  getCurrentUserResearchProjects,
  getResearchById,
  getResearchLogsById,
  getComments,
  updateResearchById,
  updateResearchStatus,
};

export default researchApi;

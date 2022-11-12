import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useResearch = () => {
  const { access_token } = useAuth();

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

    const { data } = await api.post("/api/research/new", formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const getAllResearch = async () => {
    const { data } = await api.get("/api/research", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const getCurrentUserResearchProjects = async () => {
    const { data } = await api.get(
      "/api/research/user-research?page=1&limit=10",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  };

  const getResearchById = async (research_id) => {
    const { data } = await api.get(`/api/research/${research_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const updateResearchById = async (research_id, values) => {
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

    if (isFile(file)) formData.append("file", file);
    formData.append("flag", flag);
    formData.append("research_title", research_title);
    formData.append("research_agenda", research_agenda);
    formData.append("proponents", JSON.stringify(proponents));
    formData.append("project_duration", project_duration);
    formData.append("project_budget", project_budget);
    formData.append(
      "implementing_agencies",
      JSON.stringify(implementing_agencies)
    );
    formData.append(
      "collaborating_agencies",
      JSON.stringify(collaborating_agencies)
    );
    formData.append("status", status);

    const { data } = await api.patch(`/api/research/${research_id}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  return {
    createResearch,
    getAllResearch,
    getResearchById,
    getCurrentUserResearchProjects,
    updateResearchById,
  };
};

export default useResearch;

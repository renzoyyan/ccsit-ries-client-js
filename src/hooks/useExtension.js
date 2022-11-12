import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useExtension = () => {
  const { access_token } = useAuth();

  const createExtension = async (values) => {
    const {
      file,
      flag,
      extension_type,
      extension_title,
      extension_agenda,
      project_duration,
      project_budget,
      proponents,
      implementing_agencies,
      collaborating_agencies,
      project_sites,
      target_beneficiaries,
      keywords,
      sdg,
      status,
    } = values;

    const formData = new FormData();
    const statusValue = flag === "new" ? "pending" : status;

    if (isFile(file)) formData.append("file", file);
    formData.append("flag", flag);
    formData.append("extension_type", extension_type);
    formData.append("extension_title", extension_title);
    formData.append("extension_agenda", extension_agenda);
    formData.append("proponents", JSON.stringify(proponents));
    formData.append("project_duration", project_duration);
    formData.append("project_budget", project_budget);
    formData.append("sdg", sdg);
    formData.append("status", status);
    formData.append("keywords", JSON.stringify(keywords));
    formData.append(
      "implementing_agencies",
      JSON.stringify(implementing_agencies)
    );
    formData.append(
      "collaborating_agencies",
      JSON.stringify(collaborating_agencies)
    );
    formData.append("project_sites", JSON.stringify(project_sites));
    formData.append(
      "target_beneficiaries",
      JSON.stringify(target_beneficiaries)
    );

    const res = await api.post("/api/extension/new", formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    console.log(res);
    const data = res.data;
    return data;
  };

  const getAllExtension = async () => {
    const { data } = await api.get("/api/extension", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const getCurrentUserExtensionProjects = async () => {
    const { data } = await api.get(
      "/api/extension/user-extensions?page=1&limit=10",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  };

  const getExtensionById = async (extension_id) => {
    const { data } = await api.get(`/api/extension/${extension_id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return data;
  };

  const updateExtensionById = async (extension_id, values) => {
    const {
      file,
      flag,
      extension_type,
      extension_title,
      extension_agenda,
      project_duration,
      project_budget,
      proponents,
      implementing_agencies,
      collaborating_agencies,
      project_sites,
      target_beneficiaries,
      sdg,
      status,
      keywords,
    } = values;

    let formData = new FormData();

    if (isFile(file)) formData.append("file", file);
    formData.append("flag", flag);
    formData.append("extension_type", extension_type);
    formData.append("extension_title", extension_title);
    formData.append("extension_agenda", extension_agenda);
    formData.append("proponents", JSON.stringify(proponents));
    formData.append("project_duration", project_duration);
    formData.append("project_budget", project_budget);
    formData.append("sdg", sdg);
    formData.append("status", status);
    formData.append("keywords", JSON.stringify(keywords));

    formData.append(
      "implementing_agencies",
      JSON.stringify(implementing_agencies)
    );
    formData.append(
      "collaborating_agencies",
      JSON.stringify(collaborating_agencies)
    );
    formData.append("project_sites", JSON.stringify(project_sites));
    formData.append(
      "target_beneficiaries",
      JSON.stringify(target_beneficiaries)
    );

    const { data } = await api.patch(
      `/api/extension/${extension_id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return data;
  };

  return {
    createExtension,
    getAllExtension,
    getCurrentUserExtensionProjects,
    getExtensionById,
    updateExtensionById,
  };
};

export default useExtension;

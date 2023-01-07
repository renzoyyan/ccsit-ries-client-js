import { useAuth } from "@/context/AuthContext";
import api from "@/utils/api";
import { isFile } from "@/utils/utils";

const useExtension = () => {
  const { access_token } = useAuth();

  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };

  // EXTENSION API
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

    console.log(values);
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

    const { data } = await api.post("/api/extension/new", formData, config);

    return data;
  };

  const getAllExtension = async (params) => {
    const { data } = await api.get("/api/extension", {
      params,
      ...config,
    });

    return data;
  };

  const getCurrentUserExtensionProjects = async (params) => {
    const { data } = await api.get("/api/extension/user-extensions", {
      params,
      ...config,
    });

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
    const { data } = await api.patch(
      `/api/extension/${extension_id}`,
      values,
      config
    );

    return data;
  };

  const updateExtensionStatus = async (extension_id, values) => {
    const { data } = await api.patch(
      `/api/extension/change-status/${extension_id}`,
      values,
      config
    );

    return data;
  };

  // EXTENSION LOG API
  const createExtensionLog = async (extension_id, values) => {
    const { log_title, date_completion, publication_url, file } = values;

    let formData = new FormData();

    formData.append("log_title", log_title);
    formData.append("date_completion", date_completion);
    formData.append("publication_url", publication_url);
    if (isFile(file)) formData.append("file", file);

    const { data } = await api.post(
      `/api/log/new?extension_id=${extension_id}`,
      formData,
      config
    );

    return data;
  };
  const getExtensionLogsById = async (id) => {
    const { data } = await api.get(`/api/log/extension/${id}`, config);

    return data;
  };

  // EXTENSION COMMENTS API

  const getComments = async (extension) => {
    const { data } = await api.get(
      `/api/comment/extension/${extension}`,
      config
    );

    return data;
  };

  const createComment = async (extension, values) => {
    const { data } = await api.post(
      `/api/comment/extension/${extension}`,
      values,
      config
    );

    return data;
  };

  const exportExtensionPDF = (pdfRef, params) => {
    const date = new Date();
    api
      .get(`${process.env.CCSIT_RIES}/api/extension/export-pdf`, {
        params,
        ...config,
        responseType: "blob",
        "Content-Type": "application/pdf",
        Accept: "application/pdf",
      })
      .then((response) => response.data)
      .then((blob) => {
        const href = window.URL.createObjectURL(blob);
        const a = pdfRef.current;
        a.download = `extension-services-${
          params?.date || params?.status || date.getFullYear()
        }.pdf`;
        a.href = href;
        a.click();
        a.href = "";
      })

      .catch((error) => console.error(error));
  };

  return {
    createExtension,
    createExtensionLog,
    createComment,
    getAllExtension,
    getCurrentUserExtensionProjects,
    getExtensionById,
    getComments,
    getExtensionLogsById,
    updateExtensionById,
    updateExtensionStatus,
    exportExtensionPDF,
  };
};

export default useExtension;

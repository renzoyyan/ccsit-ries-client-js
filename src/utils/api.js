import axios from "axios";

const api = axios.create({
  baseURL: process.env.CCSIT_RIES,
});

export default api;

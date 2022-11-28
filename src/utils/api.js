import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.CCSIT_RIES,
});

// api.interceptors.request.use(
//   async (config) => {
//     const session = await getSession();

//     if (session) {
//       config.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default api;

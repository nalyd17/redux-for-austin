import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";

const API_BASE_URL =
  "https://d6v0f3fd57.execute-api.us-east-1.amazonaws.com/main";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await fetchAuthSession();
    const { accessToken } = session.tokens ?? {};

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  // TODO: Add the base URL of the API from the environment variables
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const { config, response } = error;

    if (response?.status === 401) {
      try {
        await apiClient.post("/auth/refresh-token");
        return apiClient(config as AxiosRequestConfig);
      } catch (refreshError) {
        localStorage.removeItem("user");
        window.location.href = window.location.origin + "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
  withCredentials: true, // Ensures cookies are sent with every request
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

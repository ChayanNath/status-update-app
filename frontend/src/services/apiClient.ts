import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api", // Adjusted base URL
  withCredentials: true, // Ensures cookies are sent with every request
});

// Add a response interceptor to handle token refreshing
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the response if it is successful
    return response;
  },
  async (error: AxiosError) => {
    const { config, response } = error;

    // Check if the error status code is 401 (Unauthorized)
    if (response?.status === 401) {
      try {
        // Call the refresh token endpoint
        await apiClient.post("/auth/refresh-token");

        // Retry the original request with the same configuration
        return apiClient(config as AxiosRequestConfig);
      } catch (refreshError) {
        // const logout = useLogout();
        // logout();
        localStorage.removeItem("user");
        window.location.href = window.location.origin + "/login";
        return Promise.reject(error);
      }
    }

    // Reject the promise if the error is not handled
    return Promise.reject(error);
  }
);

export default apiClient;

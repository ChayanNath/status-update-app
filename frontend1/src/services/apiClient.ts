import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your API base URL
  withCredentials: true, // This ensures cookies are sent with every request
});

export default apiClient;

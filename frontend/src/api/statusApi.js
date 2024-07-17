import api from "../api";

export const updateStatus = async (statusData) => {
  const response = await api.post("/api/status/add", statusData);
  return response.data;
};

export default api;

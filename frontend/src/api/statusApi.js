import api from "../api";

export const updateStatus = async (statusData) => {
  const response = await api.post("/api/status/add", statusData);
  return response.data;
};

export const getTeamStatus = async (id) => {
  const response = await api.get(`/api/status/get?teamId=${id}`);
  return response.data;
};

export default api;

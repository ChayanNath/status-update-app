import api from "../api";

// Register user
export const getTeams = async () => {
  const response = await api.get("/api/team/getallteams");
  return response.data;
};

export default api;

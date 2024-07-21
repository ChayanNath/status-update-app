import api from "./api";

// Register user
export const getTeams = async () => {
  const response = await api.get("/api/team/getallteams");
  return response.data;
};

export const addTeam = async (values) => {
  const response = await api.post("/api/team/create", values);
  return response.data;
};

export const deleteTeam = async (teamId) => {
  const response = await api.delete(`/api/team/${teamId}`);
  return response.data;
};

export const updateTeam = async (teamId, teamData) => {
  const response = await api.put(`/api/team/${teamId}`, teamData);
  return response.data;
};

export default api;

import api from "../api";

// Register user
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

// Login user
export const loginUser = async (userData) => {
  const response = await api.post("/api/auth/login", userData);
  return response.data;
};

export const logoutUser = async () => {
  await api.post("/api/auth/logout");
};

export const getUsersWithoutTeam = async () => {
  const response = await api.get("/api/users/without-team");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/api/users/all");
  return response.data;
};

export default api;

import apiClient from "./apiClient";
import { User } from "../hooks/useUser";

export const login = async (username: string, password: string) => {
  const response = await apiClient.post("/auth/login", { username, password });
  return response.data;
};

export const register = async (userData: User) => {
  const response = await apiClient.post("/register", userData);
  return response.data;
};

export const logout = async () => {
  await apiClient.post("/logout");
};

export const getUsersWithoutTeam = async () => {
  const response = await apiClient.get("/users/without-team");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get("/users/all");
  return response.data;
};

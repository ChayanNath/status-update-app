import { AddTeam } from "@/types/team";
import apiClient from "./apiClient";

interface UpdateTeamData {
  name: string;
  description: string;
  members: string[];
}

export const getTeams = async () => {
  const response = await apiClient.get("/team/getallteams");
  return response.data;
};

export const addTeam = async (values: AddTeam) => {
  const response = await apiClient.post("/team/create", values);
  return response.data;
};

export const deleteTeam = async (teamId: string) => {
  const response = await apiClient.delete(`/team/${teamId}`);
  return response.data;
};

export const updateTeam = async (teamId: string, values: UpdateTeamData) => {
  const response = await apiClient.put(`/team/${teamId}`, {
    name: values.name,
    description: values.description,
    teamMembers: values.members,
  });
  return response.data;
};

export const exportStatuses = async (
  startDate: string,
  endDate: string,
  teamId: string
) => {
  const response = await apiClient.get(
    `/status/export?startDate=${startDate}&endDate=${endDate}&teamId=${teamId}`,
    {
      responseType: "blob",
    }
  );
  return response.data;
};

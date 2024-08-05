import { DateRange } from "@/types/user";
import apiClient from "./apiClient";

export const fetchUserWithIds = async (userIds: string[]) => {
  const response = await apiClient.post("/users/users-with-ids", {
    users: userIds,
  });
  return response.data;
};

export const getUserUpdates = async (userId: string, dateRange?: DateRange) => {
  // Convert dateRange to ISO string if provided, otherwise use defaults
  const startDate = dateRange?.from
    ? new Date(dateRange.from).toISOString()
    : undefined;
  const endDate = dateRange?.to
    ? new Date(dateRange.to).toISOString()
    : undefined;

  // Construct query parameters
  const queryParams = new URLSearchParams({
    userId,
    ...(startDate && { startDate }),
    ...(endDate && { endDate }),
  });

  // Make the GET request
  const response = await apiClient.get(
    `/status/getUserUpdates?${queryParams.toString()}`
  );
  return response.data;
};

export const getUsersWithoutTeam = async () => {
  const response = await apiClient.get("/users/without-team");
  return response.data;
};

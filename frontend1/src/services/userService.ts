import apiClient from "./apiClient";

export const fetchUserWithIds = async (userIds: string[]) => {
  const response = await apiClient.post("/users/users-with-ids", {
    users: userIds,
  });
  return response.data;
};

export const getUserUpdates = async (
  userId: string,
  dateRange?: { startDate: Date; endDate: Date }
) => {
  // Convert dateRange to ISO string if provided, otherwise use defaults
  const startDate = dateRange?.startDate
    ? new Date(dateRange.startDate).toISOString()
    : undefined;
  const endDate = dateRange?.endDate
    ? new Date(dateRange.endDate).toISOString()
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

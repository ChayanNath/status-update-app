import { IStatusUpdate } from "@/types/status";
import apiClient from "./apiClient";

export const updateStatus = async (statusData: IStatusUpdate) => {
  const response = await apiClient.post("/status/add", statusData);
  return response.data;
};

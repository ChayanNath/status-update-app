import { IStatusUpdate } from "@/types/status";
import apiClient from "./apiClient";

export const updateStatus = async (statusData: IStatusUpdate) => {
  const response = await apiClient.post("/status/add", statusData);
  return response.data;
};

export const getStatus = async (date: Date) => {
  const response = await apiClient.get("/status/get-status", {
    params: {
      date,
    },
  });
  return response.data;
};

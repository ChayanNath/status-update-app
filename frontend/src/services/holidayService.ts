import apiClient from "./apiClient";

export const downloadHolidayTemplate = async () => {
  const response = await apiClient.get("/holidays/download-holiday-template", {
    responseType: "blob",
  });
  return response.data;
};

export const getHolidays = async () => {
  const response = await apiClient.get("/holidays/get-holidays");
  return response.data;
};

export const uploadHolidays = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/holidays/upload-holidays", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

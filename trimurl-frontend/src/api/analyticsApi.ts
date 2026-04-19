import api from "./axios";

export const getAnalytics = async (linkId: string) => {
  const response = await api.get(`/analytics/${linkId}`);
  return response.data;
};
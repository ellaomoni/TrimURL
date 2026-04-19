import api from "./axios";

export type CreateLinkPayload = {
  longUrl: string;
  customAlias?: string;
  expiresAt?: string;
};

export const createLink = async (payload: CreateLinkPayload) => {
  const response = await api.post("/links", payload);
  return response.data;
};

export const getLinks = async (page = 1, limit = 10) => {
  const response = await api.get(`/links?page=${page}&limit=${limit}`);
  return response.data;
};

export const getLinkById = async (id: string) => {
  const response = await api.get(`/links/${id}`);
  return response.data;
};

export const deleteLink = async (id: string) => {
  const response = await api.delete(`/links/${id}`);
  return response.data;
};
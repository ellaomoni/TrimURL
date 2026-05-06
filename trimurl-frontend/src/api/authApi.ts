import api from "./axios";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export type VerifyEmailPayload = {
  email: string;
  code: string;
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
  const response = await api.post("/auth/verify-email", payload);
  return response.data;
};
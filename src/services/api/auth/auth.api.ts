import api from "../axios";
import { fetcher } from "../fetcher";
import type { LoginRequest, RegisterRequest, User } from "./auth.types";

export const loginApi = async (data: LoginRequest) =>
  fetcher<User>(api.post("/auth/login", data));

export const registerApi = async (data: RegisterRequest) =>
  fetcher<User>(api.post("/auth/register", data));

export const logoutApi = async () => fetcher(api.post("/auth/logout"));

export const meApi = async () => fetcher<User>(api.get("/auth/me"));

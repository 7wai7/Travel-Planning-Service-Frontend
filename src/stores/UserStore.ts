import { create } from "zustand";
import type {
  LoginRequest,
  RegisterRequest,
  User,
} from "../services/api/auth/auth.types";
import {
  loginApi,
  logoutApi,
  meApi,
  registerApi,
} from "../services/api/auth/auth.api";

interface IUserState {
  user: User | null;
  setUser: (user: User | null) => void;
  register: (data: RegisterRequest) => Promise<User>;
  login: (data: LoginRequest) => Promise<User>;
  logout: () => void;
  me: () => Promise<User>;
}

const useUserStore = create<IUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  register: async (data: RegisterRequest) => {
    const user = await registerApi(data);
    set({ user });
    return user;
  },
  login: async (data: LoginRequest) => {
    const user = await loginApi(data);
    set({ user });
    return user;
  },
  logout: async () => {
    await logoutApi();
    set({ user: null });
  },
  me: async () => {
    const user = await meApi();
    set({ user });
    return user;
  },
}));

export default useUserStore;

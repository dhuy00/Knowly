import { create } from "zustand";

import { loginApi, registerApi, getMeApi } from "../services/auth.service";

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,

  isAuthenticated: false,

  loading: false,

  // LOGIN
  login: async (payload) => {
    try {
      set({ loading: true });

      const data = await loginApi(payload);

      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      set({ loading: false });
    }
  },

  // REGISTER
  register: async (payload) => {
    try {
      set({ loading: true });

      const data = await registerApi(payload);

      localStorage.setItem("token", data.token);

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Register failed",
      };
    } finally {
      set({ loading: false });
    }
  },

  // GET CURRENT USER
  fetchMe: async () => {
    try {
      const token = get().token;

      if (!token) return;

      set({ loading: true });

      const data = await getMeApi();

      set({
        user: data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;

import { deleteToken, getToken, saveToken } from "@/helpers/secureStore";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loadAuth: () => Promise<void>;
  setAuth: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkTokenExpiration: () => boolean;
}

export const useAuth = create<AuthState>((set, get) => ({
  token: null,
  isAuthenticated: false,

  loadAuth: async () => {
    const token = await getToken("access_token");

    if (token) {
      // Check if token is expired
      const isExpired = get().checkTokenExpiration();
      if (isExpired) {
        await get().logout();
        return;
      }
    }

    set({ token, isAuthenticated: !!token });
  },

  setAuth: async (token) => {
    await saveToken("access_token", token);
    set({ token, isAuthenticated: true });
  },

  logout: async () => {
    // Clear user data from user store
    try {
      const UserAuth = require("./user.store").default;
      UserAuth.getState().removeUser();
    } catch (error) {
      console.log("Error clearing user store:", error);
    }

    // Clear tokens
    await deleteToken("access_token");

    set({
      token: null,
      isAuthenticated: false,
    });
  },

  checkTokenExpiration: () => {
    const { token } = get();
    if (!token) return false;

    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const isExpired = exp * 1000 < Date.now();

      if (isExpired) {
        console.log("Token expired, logging out...");
        get().logout();
        return true;
      }

      return false;
    } catch (error) {
      console.log("Invalid token, logging out...");
      get().logout();
      return true;
    }
  },
}));

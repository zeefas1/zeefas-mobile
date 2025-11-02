import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface StatusState {
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean) => void;
  isExpired: boolean;
  setIsExpired: (status: boolean) => void;
}

export const useStatusStore = create<StatusState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (status) => set({ isAuthenticated: status }),
      isExpired: false,
      setIsExpired: (status) => set({ isExpired: status }),
    }),
    {
      name: "auth-status-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

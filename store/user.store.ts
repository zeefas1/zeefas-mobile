import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  id: string;
  accountId: string;
  email: string;
  fullName: string;
  verified: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;
}

const UserAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set(() => ({ user })),
      removeUser: () => set(() => ({ user: null })),
    }),
    {
      name: "ritemails-user-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default UserAuth;

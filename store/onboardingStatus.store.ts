import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface onboardingStatusStore {
  onboardingStatus: boolean;
  setOnboardingStatus: (onboardingStatus: boolean) => void;
}

const useOnboardingStatus = create<onboardingStatusStore>()(
  persist(
    (set) => ({
      onboardingStatus: false,
      setOnboardingStatus: (onboardingStatus: boolean) =>
        set({ onboardingStatus }),
    }),
    {
      name: "rendcore-onboarding-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useOnboardingStatus;

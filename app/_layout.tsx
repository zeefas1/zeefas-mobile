import GlobalBanners from "@/components/GlobalBanners";
import { BannerProvider } from "@/contexts/BannerContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuth } from "@/store/auth.store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import "react-native-reanimated";

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { loadAuth, isAuthenticated } = useAuth();
  const [authLoaded, setAuthLoaded] = useState(false);

  const [loaded] = useFonts({
    InterRegular: require("../assets/fonts/Inter_18pt-Regular.ttf"),
    InterMedium: require("../assets/fonts/Inter_18pt-Medium.ttf"),
    InterSemiBold: require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    InterBold: require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    const initializeAuth = async () => {
      await loadAuth();
      setAuthLoaded(true);
    };

    initializeAuth();
  }, [loadAuth]);

  useEffect(() => {
    if (loaded && authLoaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, authLoaded]);

  if (!loaded || !authLoaded) {
    // Wait for both fonts and auth to load
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <BannerProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
              <KeyboardProvider>
                <Stack>
                  <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                  </Stack.Protected>

                  <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen
                      name="onboarding"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(auth)"
                      options={{ headerShown: false }}
                    />
                  </Stack.Protected>
                </Stack>
                <StatusBar style="auto" />
                <GlobalBanners />
              </KeyboardProvider>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </BannerProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

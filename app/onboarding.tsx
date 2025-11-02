import { icons } from "@/assets/icons";
import OAuthBtn from "@/components/OAuthBtn";
import Wrapper from "@/components/Wrapper";
import { FontSizes } from "@/constants/FontSizes";
import useOnboardingStatus from "@/store/onboardingStatus.store";

import { Image } from "expo-image";
import { Redirect, useRouter } from "expo-router";

import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AuthOnboarding = () => {
  const router = useRouter();
  const { onboardingStatus } = useOnboardingStatus();

  if (!onboardingStatus) {
    return <Redirect href="/login" />;
  }

  return (
    <Wrapper paddingHorizontal={22} bg="#fff">
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image source={icons.roundLogo} style={styles.image} />

          <View style={styles.buttonContainer}>
            <OAuthBtn
              iconName={icons.googleIcon}
              title="Continue with Google"
              onPress={() => {}}
            />

            <OAuthBtn
              iconName={icons.appleIcon}
              title="Continue with Apple"
              onPress={() => {}}
            />
          </View>

          <View style={styles.signContainer}>
            <Text style={styles.signDesc}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.signUpText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 100,
  },

  button: {
    width: 200,
    height: 44,
  },

  image: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    width: "100%",
    marginTop: 50,
  },

  signContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 50,
    gap: 2,
  },

  signDesc: {
    fontSize: FontSizes.md,
    lineHeight: 16,
    fontFamily: "PublicSansRegular",
    color: "#151515",
  },

  signUpText: {
    fontSize: FontSizes.lg,
    lineHeight: 16,
    fontFamily: "PublicSansSemiBold",
    color: "#0CE194",
    // textDecorationLine: "underline",
  },
});

export default AuthOnboarding;

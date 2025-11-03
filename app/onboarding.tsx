import { icons } from "@/assets/icons";
import Button from "@/components/Button";
import OAuthBtn from "@/components/OAuthBtn";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import useOnboardingStatus from "@/store/onboardingStatus.store";

import { Image } from "expo-image";
import { useRouter } from "expo-router";

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

  //   if (!onboardingStatus) {
  //     return <Redirect href="/login" />;
  //   }

  return (
    <Wrapper paddingHorizontal={24} bg="#fff" showBottomImage>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Image source={icons.roundLogo} style={styles.image} />

          <View style={{ marginTop: 32 }}>
            <Text style={styles.title}>Welcome to ZeeFas</Text>
            <Text style={styles.subtitle}>
              Create an account to start seamless shopping experience on Zeefas
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <OAuthBtn
              iconName={icons.googleIcon}
              title="Sign up with Google"
              onPress={() => {}}
            />

            <OAuthBtn
              iconName={icons.appleIcon}
              title="Sign up with Apple"
              onPress={() => {}}
            />

            <Button
              title="Sign up with email"
              onPress={() => router.push("/register")}
              type="primary"
            />
          </View>

          <View style={[styles.signContainer, { marginTop: 110 }]}>
            <Text style={styles.signDesc}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.signUpText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            <View style={[styles.signContainer, styles.center]}>
              <Text style={styles.signDesc}>
                By Signing up, you agree to our
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.signUpText}>terms</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text style={styles.signUpText}>of services </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 70,
  },

  title: {
    fontSize: 32,
    lineHeight: 46,
    fontFamily: FontFamily.SemiBold,
    color: "#1F2937",
  },

  subtitle: {
    fontSize: FontSizes.lg,
    lineHeight: 24,
    fontFamily: FontFamily.Regular,
    color: "#6B7280",
  },

  button: {
    width: 200,
    height: 44,
  },

  image: {
    width: 72,
    height: 72,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    width: "100%",
    marginTop: 42,
  },

  signContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 2,
    flexWrap: "wrap",
  },

  signDesc: {
    fontSize: FontSizes.lg,
    lineHeight: 24,
    fontFamily: FontFamily.Regular,
    color: "#323232",
  },

  signUpText: {
    fontSize: FontSizes.lg,
    lineHeight: 16,
    fontFamily: FontFamily.Medium,
    color: "#4BB96C",
    // textDecorationLine: "underline",
  },

  center: {
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
});

export default AuthOnboarding;

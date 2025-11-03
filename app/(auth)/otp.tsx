import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { OtpInput } from "react-native-otp-entry";

import { icons } from "@/assets/icons";
import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { useBanner } from "@/contexts/BannerContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import useTimer from "@/hooks/useTimer";
import { useAuth } from "@/store/auth.store";
import { useStatusStore } from "@/store/status.store";
import UserAuth from "@/store/user.store";
import { Image } from "expo-image";
import AuthGoBack from "../../components/AuthGoBack";

const OTP = () => {
  const router = useRouter();
  const { email, type, statusCode } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = UserAuth();
  const { setAuth } = useAuth();
  const { setIsAuthenticated } = useStatusStore();
  const { getErrorMessage } = useErrorHandler();
  const { showErrorBanner, showSuccessBanner } = useBanner();

  useEffect(() => {
    if (statusCode === "422") {
      handleResendEmail();
    }
  }, [statusCode]);

  const { time, formattedTime, resetTimer } = useTimer({
    initialTime: 60, // Set initial time in seconds
    onTimerEnd: () => {
      console.log("Timer has ended!");
    },
  });

  const handleOTPComplete = async () => {
    // Error banner will be handled by centralized system
    router.push({
      pathname: "/(auth)/reset-password",
      params: {
        email,
        type,
        code,
      },
    });
  };

  const handleResendEmail = async () => {};

  return (
    <Wrapper bg="#fff" showBottomImage>
      <AuthGoBack />
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <Image
              source={icons.otpIcon}
              style={styles.image}
              contentFit="cover"
            />

            <View>
              <Text style={styles.title}>Forgot password </Text>
              <Text style={styles.subtitle}>
                Insert the 4 digit code sent to 0801234567 Via SMS and WhatsApp
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 24, width: "100%" }}>
            <OtpInput
              autoFocus
              onTextChange={(code) => setCode(code)}
              numberOfDigits={6}
              type="numeric"
              focusColor="#4BB96C"
              secureTextEntry={false}
              theme={{
                containerStyle: {
                  width: "100%",
                },
                pinCodeContainerStyle: {
                  width: 50,
                  height: 50,
                  borderRadius: 4.5,
                  borderWidth: 1,
                  borderColor: "#E2E8F0",
                  backgroundColor: "#F8FAFC",
                },
              }}
            />

            <View>
              <View style={styles.signContainer}>
                <Text style={styles.signDesc}>Didn’t get the code?</Text>

                <TouchableOpacity
                  onPress={handleResendEmail}
                  disabled={time > 0}
                >
                  <Text style={styles.signUpText}>Resend</Text>
                </TouchableOpacity>
              </View>

              {time > 0 && (
                <Text style={[styles.signUpText, { marginTop: 16 }]}>
                  {time > 0 && formattedTime}
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={{ marginTop: 20, width: "100%" }}>
          <Button
            title="Verify number"
            onPress={handleOTPComplete}
            type="primary"
            loading={loading}
            disabled={code.length !== 6}
          />
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginBottom: 54,
  },

  header: {
    marginTop: 20,
    gap: 10,
  },

  image: {
    width: 40,
    height: 72,
  },

  title: {
    fontSize: 24,
    fontFamily: FontFamily.SemiBold,
    color: "#1F2937",
  },

  subtitle: {
    fontSize: FontSizes.lg,
    lineHeight: 24,
    fontFamily: FontFamily.Regular,
    color: "#6B7280",
  },

  errorText: {
    marginTop: 10,
    color: "#CE0000",
    fontSize: FontSizes.xs,
    fontFamily: FontFamily.Medium,
    textAlign: "center",
  },

  signContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginTop: 20,
    gap: 4,
  },

  signDesc: {
    fontSize: FontSizes.sm,
    lineHeight: 16,
    fontFamily: FontFamily.Medium,
    color: "#111827",
  },

  signUpText: {
    fontSize: FontSizes.sm,
    lineHeight: 16,
    fontFamily: FontFamily.Medium,
    color: "#4BB96C",
  },
});

export default OTP;

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { OtpInput } from "react-native-otp-entry";

import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { FontSizes } from "@/constants/FontSizes";
import { useBanner } from "@/contexts/BannerContext";
import api from "@/helpers/api";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import useTimer from "@/hooks/useTimer";
import { useAuth } from "@/store/auth.store";
import { useStatusStore } from "@/store/status.store";
import UserAuth from "@/store/user.store";
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

    const data = {
      email: email,
      otp: code,
      type: "ACCOUNT_VERIFICATION",
    };

    try {
      setLoading(true);
      const { data: res } = await api.post("/auth/verify-otp", data);

      console.log(JSON.stringify(res, null, 2));
      console.log(JSON.stringify(res?.data?.accessToken, null, 2));

      await setAuth(res?.data?.accessToken);
      setUser(res?.data?.user);
      showSuccessBanner("Account verified successfully! Welcome!");
      router.replace("/");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showErrorBanner(
        typeof errorMessage === "string"
          ? errorMessage
          : "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    const data = {
      email,
      type: "ACCOUNT_VERIFICATION",
    };

    try {
      setLoading(true);
      await api.post(`/auth/resend-otp`, data);
      showSuccessBanner("OTP resent successfully! Please check your email.");
      resetTimer(60);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showErrorBanner(
        typeof errorMessage === "string"
          ? errorMessage
          : "Failed to resend OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper bg="#fff">
      <AuthGoBack />
      <View
        style={styles.container}
        // showsHorizontalScrollIndicator={false}
        // showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>OTP</Text>
          <Text style={styles.subText}>
            Please enter the code sent to your email address
          </Text>
        </View>

        <View style={{ marginTop: 24, width: "100%", alignItems: "center" }}>
          <OtpInput
            autoFocus
            onTextChange={(code) => setCode(code)}
            numberOfDigits={6}
            type="numeric"
            focusColor="#0CE194"
            secureTextEntry={false}
            theme={{
              containerStyle: {
                width: "100%",
              },
              pinCodeContainerStyle: {
                width: 50,
                height: 50,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#E9E9E9",
              },
            }}
          />

          <View style={{ marginTop: 20, width: "100%" }}>
            <Button
              title="Confirm"
              onPress={handleOTPComplete}
              type="primary"
              loading={loading}
              disabled={code.length !== 6}
            />
          </View>

          <TouchableOpacity onPress={handleResendEmail} disabled={time > 0}>
            <View style={styles.signContainer}>
              <Text style={styles.signDesc}>I did not get the code.</Text>
              <Text style={styles.signUpText}>
                {time > 0 ? formattedTime : "Resend"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    gap: 10,
  },
  headerText: {
    fontSize: FontSizes["2xl"],
    fontFamily: "PublicSansSemiBold",
    color: "#151515",
  },
  subText: {
    fontSize: FontSizes.md,
    fontFamily: "PublicSansRegular",
    color: "#808080",
  },

  errorText: {
    marginTop: 10,
    color: "#CE0000",
    fontSize: FontSizes.xs,
    fontFamily: "MontserratMedium",
    textAlign: "center",
  },

  signContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 4,
  },

  signDesc: {
    fontSize: FontSizes.sm,
    lineHeight: 16,
    fontFamily: "MontserratMedium",
    color: "#4D4D4D",
  },

  signUpText: {
    fontSize: FontSizes.sm,
    lineHeight: 16,
    fontFamily: "MontserratMedium",
    color: "#5E42D9",
  },
});

export default OTP;

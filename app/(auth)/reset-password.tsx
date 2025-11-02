import AuthGoBack from "@/components/AuthGoBack";
import Button from "@/components/Button";
import PasswordInputComponent from "@/components/PasswordInput";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { useBanner } from "@/contexts/BannerContext";
import api from "@/helpers/api";
import { parseZodFieldErrors } from "@/helpers/parseZodErrors";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { resetPasswordSchema } from "@/validator/auth.validator";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

const ResetPassword = () => {
  const { email, type, otpCode } = useLocalSearchParams();
  const router = useRouter();
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { getErrorMessage } = useErrorHandler();
  const { showErrorBanner, showSuccessBanner } = useBanner();

  const handlePasswordUpdate = async () => {
    // Error banner will be handled by centralized system
    if (userData.password !== userData.confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    const _parsed = resetPasswordSchema.safeParse({
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    });

    if (!_parsed.success) {
      const errorMessages = parseZodFieldErrors(
        _parsed.error.flatten().fieldErrors
      );
      setError(errorMessages);
      console.log(errorMessages);
      return;
    }

    const data = {
      email: email,
      otpCode: otpCode,
      newPassword: userData.password,
    };

    try {
      setLoading(true);
      await api.post("/auth/reset-password", data);
      showSuccessBanner(
        "Password reset successfully! Please login with your new password."
      );
      router.push("/login");
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      showErrorBanner(
        typeof errorMessage === "string"
          ? errorMessage
          : "Password reset failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper bg="#fff">
      <AuthGoBack />

      <KeyboardAvoidingView style={styles.container}>
        <View style={{ marginTop: 22 }}>
          <Text style={styles.title}>Reset Password </Text>
          <Text style={styles.subtitle}>Enter the new password</Text>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            width: "100%",
            flex: 1,
            marginBottom: 54,
          }}
        >
          <View style={{ marginTop: 40, width: "100%" }}>
            <PasswordInputComponent
              label="Password"
              value={userData.password}
              onChangeText={(text) =>
                setUserData((prevState) => ({
                  ...prevState,
                  password: text,
                }))
              }
              placeholder="input password"
              iconName="lock-closed"
              autoCapitalize="none"
              error={error && error?.password}
              editable={!loading}
            />
            <View style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>
                Min 8 chars, 1 number & symbol
              </Text>
            </View>

            <PasswordInputComponent
              label="Confirm password"
              value={userData.confirmPassword}
              onChangeText={(text) =>
                setUserData((prevState) => ({
                  ...prevState,
                  confirmPassword: text,
                }))
              }
              placeholder="input password"
              iconName="lock-closed"
              autoCapitalize="none"
              error={error && error?.confirmPassword}
              editable={!loading}
            />
          </View>

          <View style={{ marginTop: 40, width: "100%" }}>
            <Button
              title="Proceed"
              onPress={handlePasswordUpdate}
              type="primary"
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 30,
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

  forgotPassword: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginTop: 0,
  },

  forgotPasswordText: {
    color: "#808080",
    fontSize: FontSizes.sm,
    fontFamily: "PublicSansItalic",
  },
});

export default ResetPassword;

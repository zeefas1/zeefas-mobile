import Button from "@/components/Button";
import PasswordInputComponent from "@/components/PasswordInput";
import Wrapper from "@/components/Wrapper";
import { FontSizes } from "@/constants/FontSizes";
import { useBanner } from "@/contexts/BannerContext";
import api from "@/helpers/api";
import { parseZodFieldErrors } from "@/helpers/parseZodErrors";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { resetPasswordSchema } from "@/validator/auth.validator";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

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
      <KeyboardAwareScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>New password</Text>
          <Text style={styles.subText}>Setup a new password</Text>
        </View>

        <View style={{ marginTop: 40, width: "100%" }}>
          <PasswordInputComponent
            label="Enter new password"
            value={userData.password}
            onChangeText={(text) =>
              setUserData((prevState) => ({
                ...prevState,
                password: text,
              }))
            }
            placeholder="Enter your password"
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
            label="Confirm new password"
            value={userData.confirmPassword}
            onChangeText={(text) =>
              setUserData((prevState) => ({
                ...prevState,
                confirmPassword: text,
              }))
            }
            placeholder="Re-enter your password "
            iconName="lock-closed"
            autoCapitalize="none"
            error={error && error?.confirmPassword}
            editable={!loading}
          />

          <View style={{ marginTop: 40, width: "100%" }}>
            <Button
              title="Proceed"
              onPress={handlePasswordUpdate}
              type="primary"
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },

  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
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

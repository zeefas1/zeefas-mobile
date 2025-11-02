import Button from "@/components/Button";
import TextInputComponent from "@/components/TextInput";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { useBanner } from "@/contexts/BannerContext";
import api from "@/helpers/api";
import { parseZodFieldErrors } from "@/helpers/parseZodErrors";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { resetSchema } from "@/validator/auth.validator";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import AuthGoBack from "../../components/AuthGoBack";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const { getErrorMessage } = useErrorHandler();
  const { showErrorBanner, showSuccessBanner } = useBanner();

  const handleResetPassword = async () => {
    setError({});
    // Error banner will be handled by centralized system
    setLoading(true);

    try {
      const data = { email };
      const _parsed = resetSchema.safeParse({
        email: email.trim(),
      });

      if (!_parsed.success) {
        const errorMessages = parseZodFieldErrors(
          _parsed.error.flatten().fieldErrors
        );
        setError(errorMessages);
        console.log(errorMessages);
        return;
      }

      setLoading(true);

      await api.post("/auth/forgot-password", data);

      showSuccessBanner("Password reset email sent! Please check your inbox.");
      router.push({
        pathname: "/otp",
        params: {
          email: email,
          type: "FORGOT_PASSWORD",
        },
      });
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
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter the email address you registered with
          </Text>
        </View>

        <View
          style={{
            marginTop: 24,
            justifyContent: "space-between",
            width: "100%",
            flex: 1,
            marginBottom: 54,
          }}
        >
          <TextInputComponent
            label="Email address"
            value={email}
            onChangeText={setEmail}
            placeholder="Input your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error?.email}
          />

          <View style={{ marginTop: 20, width: "100%" }}>
            <Button
              title="Proceed"
              onPress={handleResetPassword}
              type="primary"
              disabled={!email}
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
    paddingHorizontal: 20,
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
});

export default ForgotPassword;

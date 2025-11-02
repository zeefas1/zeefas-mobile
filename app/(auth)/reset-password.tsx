import { icons } from "@/assets/icons";
import AuthGoBack from "@/components/AuthGoBack";
import Button from "@/components/Button";
import CustomBottomSheet, { SheetRef } from "@/components/CustomBottomSheet";
import PasswordInputComponent from "@/components/PasswordInput";
import SuccessBottomSheet from "@/components/SuccessBottomSheet";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { useBanner } from "@/contexts/BannerContext";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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

  const SuccessSheet = useRef<SheetRef>(null);

  const handlePasswordUpdate = async () => {
    SuccessSheet.current?.show();
  };

  return (
    <Wrapper bg="#fff">
      <AuthGoBack />

      <KeyboardAvoidingView style={styles.container}>
        <View style={{ marginTop: 22 }}>
          <Text style={styles.title}>Reset Password </Text>
          <Text style={styles.subtitle}>Enter the new password</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={{ marginTop: 30, width: "100%" }}>
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

      <CustomBottomSheet ref={SuccessSheet} snapPoint={55}>
        <SuccessBottomSheet
          desc="Your password have been reset successfully, you can now log into point of sale with your email and new password."
          title="Password reset successful"
          showBtn
          onPress={() => SuccessSheet.current?.hide()}
          btnTitle="Login to my account"
          image={icons.successIcon}
          headerTitle="Password reset"
          close={() => SuccessSheet.current?.hide()}
        />
      </CustomBottomSheet>
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

  formContainer: {
    justifyContent: "space-between",
    width: "100%",
    flex: 1,
    marginBottom: 54,
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

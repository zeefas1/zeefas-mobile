import { icons } from "@/assets/icons";
import AuthGoBack from "@/components/AuthGoBack";
import Button from "@/components/Button";
import PasswordInputComponent from "@/components/PasswordInput";
import TextInputComponent from "@/components/TextInput";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

const Register = () => {
  const router = useRouter();

  const [userData, setUserData] = useState({
    phoneNumber: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});

  const isDisabled =
    !userData.fullName ||
    !userData.email ||
    !userData.phoneNumber ||
    !userData.password ||
    !userData.confirmPassword;

  const handleChange = (key: keyof typeof userData) => (value: string) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Wrapper bg="#fff" showBottomImage>
      <AuthGoBack />
      <KeyboardAwareScrollView
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 24 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={icons.logoIcon}
            style={styles.image}
            contentFit="contain"
          />

          <View>
            <Text style={styles.title}>Lets Get Started</Text>
            <Text style={styles.subtitle}>
              Create an account to start seamless shopping experience on Zeefas
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 24, width: "100%" }}>
          <View style={styles.row}>
            <View style={styles.countryBlock}>
              <Text style={styles.label}>Country</Text>
              <TouchableOpacity style={styles.countryPicker} disabled>
                <Text style={styles.countryEmoji}>🇳🇬</Text>
                <AntDesign name="down" size={14} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.phoneBlock}>
              <TextInputComponent
                label="Phone number"
                value={userData.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                placeholder="Input your number"
                keyboardType="phone-pad"
                autoCapitalize="none"
                error={error && error?.phoneNumber}
                editable={!loading}
              />
            </View>
          </View>

          <TextInputComponent
            label="Full name"
            value={userData.fullName}
            onChangeText={handleChange("fullName")}
            placeholder="Input your name"
            autoCapitalize="words"
            error={error && error?.fullName}
            editable={!loading}
          />

          <TextInputComponent
            label="email address"
            value={userData.email}
            onChangeText={handleChange("email")}
            placeholder="Input your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error && error?.email}
            editable={!loading}
          />

          <PasswordInputComponent
            value={userData.password}
            onChangeText={handleChange("password")}
            label="Password"
            placeholder="Input password"
            iconName="lock-closed"
            error={error && error?.password}
            editable={!loading}
          />

          <PasswordInputComponent
            value={userData.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            label="Confirm password"
            placeholder="Confirm password"
            iconName="lock-closed"
            error={error && error?.confirmPassword}
            editable={!loading}
          />

          <View style={{ marginTop: 40, width: "100%" }}>
            <Button
              title="Sign up"
              onPress={() => {}}
              type="primary"
              loading={loading}
              disabled={isDisabled}
            />
          </View>

          <View style={styles.signContainer}>
            <Text style={styles.signDesc}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.signUpText}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center", marginTop: 24 }}>
            <View style={[styles.signContainer, styles.center]}>
              <Text style={styles.signDesc}>
                By Signing up, you agree to our
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.signUpText}>terms</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.signUpText}>of services</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    gap: 10,
  },

  image: {
    width: 133,
    height: 29,
  },

  title: {
    fontSize: 30,
    lineHeight: 46,
    fontFamily: FontFamily.SemiBold,
    color: "#111827",
  },

  subtitle: {
    fontSize: FontSizes.lg,
    lineHeight: 24,
    fontFamily: FontFamily.Regular,
    color: "#6B7280",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "100%",
  },

  countryBlock: {
    width: 80,
  },

  phoneBlock: {
    flex: 1,
  },

  label: {
    marginBottom: 5,
    color: "#2D2D2D",
    fontSize: FontSizes.base,
    fontFamily: "PublicSansMedium",
  },

  countryPicker: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 6,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  countryEmoji: {
    fontSize: 20,
  },

  signContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 2,
    flexWrap: "wrap",
    marginTop: 16,
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
  },

  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Register;

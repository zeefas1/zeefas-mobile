import { icons } from "@/assets/icons";
import Button from "@/components/Button";
import OAuthBtn from "@/components/OAuthBtn";
import PasswordInputComponent from "@/components/PasswordInput";
import TextInputComponent from "@/components/TextInput";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Record<string, string>>({});
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <Wrapper paddingHorizontal={24} bg="#fff">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image source={icons.roundLogo} style={styles.image} />

          <View style={{ marginTop: 22 }}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>
              Login to continue your experience on Zeefas
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 24, width: "100%" }}>
          <TextInputComponent
            label="email address"
            value={email}
            onChangeText={setEmail}
            placeholder="Input your email"
            keyboardType="email-address"
            autoCapitalize="none"
            error={error && error?.email}
            editable={!loading}
            autoFocus={true}
          />
          <PasswordInputComponent
            value={password}
            onChangeText={setPassword}
            label="password"
            placeholder="Input password"
            iconName="lock-closed"
            error={error && error?.password}
            editable={!loading}
          />

          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => router.push("/forgot-password")}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 40, width: "100%" }}>
            <Button
              title="Login"
              onPress={() => {}}
              type="primary"
              loading={loading}
              disabled={!email || !password}
            />
          </View>

          <View style={styles.signContainer}>
            <Text style={styles.signDesc}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/register")}>
              <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <OAuthBtn
              iconName={icons.googleIcon}
              title="Login with Google"
              onPress={() => {}}
            />

            <OAuthBtn
              iconName={icons.appleIcon}
              title="Login with Apple"
              onPress={() => {}}
            />
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    gap: 10,
  },

  image: {
    width: 72,
    height: 72,
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
    marginTop: 6,
  },

  forgotPasswordText: {
    color: "#4BB96C",
    fontSize: FontSizes.md,
    fontFamily: FontFamily.Medium,
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
    // textDecorationLine: "underline",
  },

  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    width: "100%",
    marginTop: 50,
  },
});

export default Login;

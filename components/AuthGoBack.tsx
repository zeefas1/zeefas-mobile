import { icons } from "@/assets/icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";

interface AuthGoBackProps {
  marginTop?: number;
  marginHorizontal?: number;
  color?: string;
}

const AuthGoBack = ({
  marginTop = Platform.OS === "ios" ? 10 : 0,
  color = "#000",
  marginHorizontal = 20,
}: AuthGoBackProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={[
        styles.container,
        { marginTop: marginTop, marginHorizontal: marginHorizontal },
      ]}
    >
      <Image source={icons.back} style={{ height: 32, width: 32 }} />
    </TouchableOpacity>
  );
};

export default AuthGoBack;

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    borderRadius: 100,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#F5F5F5",
  },
});

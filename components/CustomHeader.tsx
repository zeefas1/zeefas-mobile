import { FontSizes } from "@/constants/FontSizes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthGoBack from "./AuthGoBack";

interface CustomHeaderProps {
  title?: string;
  showBack?: boolean;
  showRight?: boolean;
}

const CustomHeader = ({
  title,
  showBack = true,
  showRight = false,
}: CustomHeaderProps) => {
  return (
    <View style={styles.header}>
      {showBack ? (
        <AuthGoBack marginTop={0} marginHorizontal={0} />
      ) : (
        <View style={{ width: 32 }} />
      )}
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={{ width: 32 }} />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: FontSizes["2xl"],
    fontFamily: "PublicSansSemiBold",
    color: "#000",
    letterSpacing: 0.15,
  },

  icon: {
    width: 20,
    height: 20,
  },
});

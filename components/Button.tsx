import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  type?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  type,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === "primary" && styles.primaryButton,
        type === "secondary" && styles.secondaryButton,
        style,
        (disabled || loading) && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[
            type === "primary" && styles.text,
            type === "secondary" && styles.secText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#0C503F",
  },
  secondaryButton: {
    backgroundColor: "#FCF7FF",
  },
  disabledButton: {
    backgroundColor: "#d8f7eb",
  },
  text: {
    color: "#fff",
    fontSize: FontSizes.lg,
    fontFamily: FontFamily.Medium,
  },
  secText: {
    color: "#5E42D9",
    fontSize: FontSizes.md,
    fontFamily: FontFamily.Medium,
  },
});

export default Button;

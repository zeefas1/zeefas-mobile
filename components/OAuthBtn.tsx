import { FontFamily } from "@/constants/FontFamily";
import { Image } from "expo-image";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  iconName?: string;
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
  height?: number;
  width?: number;
}

const OAuthBtn: React.FC<ButtonProps> = ({
  iconName,
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  height = 20,
  width = 20,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles.primaryButton,
        style,
        (disabled || loading) && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color="#0A6361" />
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingLeft: 40,
            }}
          >
            <Image
              source={iconName}
              cachePolicy="memory-disk"
              style={{ height: height, width: width }}
              contentFit="contain"
            />
          </View>

          <Text
            style={[styles.text, textStyle]}
            numberOfLines={1}
            // adjustsFontSizeToFit
          >
            {title}
          </Text>
        </View>
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
    backgroundColor: "#F3F4F6",
  },
  disabledButton: {
    backgroundColor: "#F1F4F4",
  },
  text: {
    color: "#374151",
    fontSize: 14,
    fontFamily: FontFamily.Medium,
    width: 160,
  },
});

export default OAuthBtn;

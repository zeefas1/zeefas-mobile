import { FontSizes } from "@/constants/FontSizes";
import { Image } from "expo-image";
import React from "react";
import { ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

interface SuccessBottomSheetProps {
  desc: string;
  showBtn?: boolean;
  onPress?: () => void;
  title?: string;
  image?: ImageSourcePropType;
}

const SuccessBottomSheet = ({
  desc,
  showBtn,
  onPress,
  title,
  image,
}: SuccessBottomSheetProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} alt="icon" style={styles.icon} />
      <Text style={styles.desc}>{desc}</Text>

      {showBtn && (
        <Button
          title={title || "Continue"}
          onPress={onPress}
          type="primary"
          style={{ marginTop: 30 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  icon: {
    width: 113,
    height: 120,
    marginTop: 10,
  },

  desc: {
    color: "#1E1E1E",
    fontFamily: "PublicSansSemiBold",
    fontSize: FontSizes["2xl"],
    marginTop: 24,
    textAlign: "center",
  },
});

export default SuccessBottomSheet;

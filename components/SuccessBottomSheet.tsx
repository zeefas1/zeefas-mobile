import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import React from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "./Button";

interface SuccessBottomSheetProps {
  desc: string;
  showBtn?: boolean;
  onPress?: () => void;
  close?: () => void;
  title?: string;
  image?: ImageSourcePropType;
  btnTitle?: string;
  headerTitle?: string;
}

const SuccessBottomSheet = ({
  headerTitle,
  desc,
  showBtn,
  close,
  onPress,
  title,
  image,
  btnTitle,
}: SuccessBottomSheetProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{headerTitle}</Text>

        <TouchableOpacity style={styles.iconContainer} onPress={close}>
          <AntDesign name="close" size={14} color="#111827" />
        </TouchableOpacity>
      </View>

      <View
        style={{ alignItems: "center", justifyContent: "center", width: 346 }}
      >
        <Image
          source={image}
          alt="icon"
          style={styles.icon}
          contentFit="contain"
        />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>

        {showBtn && (
          <Button
            title={btnTitle || "Continue"}
            onPress={onPress}
            type="primary"
            style={{ marginTop: 40 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  icon: {
    width: 118,
    height: 118,
    marginBottom: 32,
  },

  title: {
    fontSize: FontSizes.xl,
    fontFamily: FontFamily.SemiBold,
    color: "#111827",
  },

  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
  },

  desc: {
    color: "#676767",
    fontFamily: FontFamily.Regular,
    fontSize: FontSizes.md,
    marginTop: 12,
    textAlign: "center",
  },
});

export default SuccessBottomSheet;

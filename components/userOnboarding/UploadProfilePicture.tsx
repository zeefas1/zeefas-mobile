import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../Button";

interface UploadProfilePictureProps {
  username: string;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  username,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  }, []);

  return (
    <>
      <View style={{ marginTop: 24 }}>
        <Text style={styles.title}>Upload Profile Picture</Text>
        <Text style={styles.subtitle}>
          Put a face to your profile, you can upload image or select avatar
        </Text>
      </View>

      <View style={styles.circleWrapper}>
        <View style={styles.bigCircle}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              contentFit="cover"
              transition={200}
            />
          ) : (
            <View style={styles.innerCircle}>
              <Ionicons name="camera-outline" size={28} color="#6B7280" />
            </View>
          )}
        </View>
        <Text style={styles.uploadText}>Upload picture</Text>
      </View>

      {!!username && <Text style={styles.usernameText}>{username}</Text>}

      <View style={{ flex: 1 }} />

      <View style={{ marginBottom: 24 }}>
        <Button
          title="Select profile Picture"
          type="primary"
          onPress={pickImage}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FontSizes["5xl"],
    lineHeight: 42,
    fontFamily: FontFamily.SemiBold,
    color: "#111827",
  },
  subtitle: {
    marginTop: 8,
    fontSize: FontSizes.lg,
    lineHeight: 22,
    fontFamily: FontFamily.Regular,
    color: "#6B7280",
  },
  circleWrapper: {
    marginTop: 80,
    alignItems: "center",
  },
  bigCircle: {
    height: 200,
    width: 200,
    borderRadius: 115,
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
  },
  innerCircle: {
    height: 56,
    width: 56,
    borderRadius: 28,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 115,
  },
  uploadText: {
    marginTop: 16,
    fontSize: FontSizes.md,
    fontFamily: FontFamily.Medium,
    color: "#6B7280",
  },
  usernameText: {
    marginTop: 24,
    textAlign: "center",
    fontSize: FontSizes["4xl"],
    fontFamily: FontFamily.SemiBold,
    color: "#0C503F",
  },
});

export default UploadProfilePicture;

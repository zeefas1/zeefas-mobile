import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomModal from "../BottomModal";
import Button from "../Button";

interface UploadProfilePictureProps {
  username: string;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({
  username,
}) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [visible, setVisible] = useState(false);

  const AVATARS = [
    "😀",
    "😎",
    "🙂",
    "🧑‍💻",
    "🧑‍🎨",
    "🧑‍🚀",
    "🧑‍🍳",
    "🧑‍🔬",
    "🧑‍🏫",
    "🧑‍⚕️",
    "🧑‍🎤",
    "🧑‍✈️",
  ];

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

  const onClose = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

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
          ) : selectedAvatar ? (
            <View
              style={{
                height: 200,
                width: 200,
                borderRadius: 115,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 64 }}>{selectedAvatar}</Text>
            </View>
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
          onPress={() => setVisible(true)}
        />
      </View>

      <BottomModal
        visible={visible}
        onClose={onClose}
        height={393}
        overlayOnClose
      >
        <View>
          <View
            style={{
              borderBottomColor: "#f2f2f2",
              borderBottomWidth: 1,
              padding: 13,
            }}
          >
            <Text style={styles.sheetHeader}>
              {showAvatarPicker
                ? "Select an emoji for your avatar"
                : "Set your profile picture"}
            </Text>
          </View>

          {!showAvatarPicker ? (
            <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.choiceCard}
                  activeOpacity={0.8}
                >
                  <View style={styles.choiceCircle}>
                    <Ionicons name="image-outline" size={22} color="#6B7280" />
                  </View>
                  <Text style={styles.choiceLabel}>Use Picture</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowAvatarPicker(true)}
                  style={styles.choiceCard}
                  activeOpacity={0.8}
                >
                  <View style={styles.choiceCircle}>
                    <Text style={{ fontSize: 24 }}>🧑‍💻</Text>
                  </View>
                  <Text style={styles.choiceLabel}>Use avatar</Text>
                </TouchableOpacity>
              </View>

              <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
                <Button
                  title="Close"
                  type="secondary"
                  onPress={() => {
                    setShowAvatarPicker(false);
                    onClose();
                  }}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Upload Image"
                  type="primary"
                  onPress={pickImage}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          ) : (
            <View style={{ marginTop: 12, paddingHorizontal: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 16,
                }}
              >
                {AVATARS.map((emoji) => (
                  <TouchableOpacity
                    key={emoji}
                    style={styles.avatarItem}
                    onPress={() => {
                      setSelectedAvatar(emoji);
                      setImageUri(null);
                      setShowAvatarPicker(false);
                      onClose();
                    }}
                    activeOpacity={0.9}
                  >
                    <Text style={{ fontSize: 28 }}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ flexDirection: "row", gap: 12, marginTop: 24 }}>
                <Button
                  title="Close"
                  type="secondary"
                  onPress={() => {
                    setShowAvatarPicker(false);
                    onClose();
                  }}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          )}
        </View>
      </BottomModal>
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
  sheetHeader: {
    fontSize: FontSizes.lg,
    fontFamily: FontFamily.Medium,
    color: "#111827",
    textAlign: "center",
  },
  choiceCard: {
    height: 128,
    width: 148,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  choiceCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2F7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  choiceLabel: {
    fontSize: FontSizes.md,
    fontFamily: FontFamily.Medium,
    color: "#6B7280",
  },
  avatarItem: {
    height: 62,
    width: 62,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
});

export default UploadProfilePicture;

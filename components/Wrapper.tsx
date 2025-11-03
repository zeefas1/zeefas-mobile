import { icons } from "@/assets/icons";
import { Image } from "expo-image";
import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface WrapperProps {
  children: React.ReactNode;
  bg?: string;
  paddingHorizontal?: number;
  showBottomImage?: boolean;
}

const Wrapper = ({
  children,
  bg,
  paddingHorizontal,
  showBottomImage,
}: WrapperProps) => {
  const { top } = useSafeAreaInsets();
  const value = Platform.OS === "ios" ? 5 : 0;
  const paddingTop = top > 0 ? top + value : 30;
  return (
    <View
      style={{
        flex: 1,
        paddingTop,
        backgroundColor: bg,
        paddingHorizontal: paddingHorizontal,
        zIndex: 2,
      }}
    >
      <View style={{ zIndex: 1, flex: 1 }}>{children}</View>

      {showBottomImage && (
        <Image
          source={icons.wrapperBottomImage}
          alt="wrapper-bottom-image"
          style={{
            position: "absolute",
            bottom: -10,
            right: -10,
            width: 200,
            height: 200,
            zIndex: 0,
            transform: [{ rotate: "-0deg" }],
          }}
          pointerEvents="none"
          contentFit="contain"
        />
      )}
    </View>
  );
};

export default Wrapper;

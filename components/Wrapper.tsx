import React from "react";
import { Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface WrapperProps {
  children: React.ReactNode;
  bg?: string;
  paddingHorizontal?: number;
}

const Wrapper = ({ children, bg, paddingHorizontal }: WrapperProps) => {
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
      }}
    >
      {children}
    </View>
  );
};

export default Wrapper;

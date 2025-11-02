import { FontSizes } from "@/constants/FontSizes";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface SuccessBannerProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number; // Auto-dismiss duration in milliseconds
}

const SuccessBanner: React.FC<SuccessBannerProps> = ({
  message,
  visible,
  onDismiss,
  duration = 3000, // Default 3 seconds
}) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (visible) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Slide in animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto-dismiss after specified duration
      timeoutRef.current = window.setTimeout(() => {
        handleDismiss();
      }, duration);
    } else {
      handleDismiss();
    }

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, duration]);

  const handleDismiss = () => {
    // Slide out animation
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss();
    });
  };

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.banner}>
        <Text style={styles.successText}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 20,
    paddingTop: 50, // Account for status bar
  },
  banner: {
    backgroundColor: "#eafaf1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successText: {
    color: "#0CE194",
    fontSize: FontSizes.md,
    fontFamily: "PublicSansMedium",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default SuccessBanner;

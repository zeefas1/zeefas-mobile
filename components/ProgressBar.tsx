import React from "react";
import { View } from "react-native";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 6,
}) => {
  const progress = Math.max(0, Math.min(currentStep / totalSteps, 1));

  return (
    <View
      style={{
        height: 12,
        flex: 1,
        backgroundColor: "#E5E7EB",
        borderRadius: 100,
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          backgroundColor: "#4BB96C",
          borderRadius: 100,
        }}
      />
    </View>
  );
};

export default ProgressBar;

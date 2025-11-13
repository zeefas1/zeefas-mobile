import AuthGoBack from "@/components/AuthGoBack";
import ProgressBar from "@/components/ProgressBar";
import AccountType from "@/components/userOnboarding/AccountType";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Wrapper showBottomImage bg="#fff" paddingHorizontal={24}>
      <View style={styles.headerTop}>
        <AuthGoBack marginTop={0} marginHorizontal={0} />
        <ProgressBar currentStep={currentStep} />
      </View>

      {currentStep === 1 && <AccountType setCurrentStep={setCurrentStep} />}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default UserOnboarding;

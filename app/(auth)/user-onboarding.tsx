import AuthGoBack from "@/components/AuthGoBack";
import ProgressBar from "@/components/ProgressBar";
import AccountType from "@/components/userOnboarding/AccountType";
import ChooseUsername from "@/components/userOnboarding/ChooseUsername";
import UploadProfilePicture from "@/components/userOnboarding/UploadProfilePicture";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

const UserOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [username, setUsername] = useState("");

  return (
    <Wrapper showBottomImage bg="#fff" paddingHorizontal={24}>
      <View style={styles.headerTop}>
        <AuthGoBack marginTop={0} marginHorizontal={0} />
        <ProgressBar currentStep={currentStep} />
      </View>

      {currentStep === 1 && <AccountType setCurrentStep={setCurrentStep} />}

      {currentStep === 2 && (
        <ChooseUsername
          setCurrentStep={setCurrentStep}
          setUsername={setUsername}
        />
      )}

      {currentStep === 3 && <UploadProfilePicture username={username} />}
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

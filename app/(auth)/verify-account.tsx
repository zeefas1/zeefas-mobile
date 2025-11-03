import Wrapper from "@/components/Wrapper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const VerifyAccount = () => {
  return (
    <Wrapper bg="#fff" showBottomImage>
      <View style={styles.container}>
        <Text>VerifyAccount</Text>
      </View>
    </Wrapper>
  );
};

export default VerifyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

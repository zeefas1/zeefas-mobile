import Wrapper from "@/components/Wrapper";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Register = () => {
  return (
    <Wrapper bg="#fff" showBottomImage>
      <View style={styles.container}>
        <Text>Register</Text>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Register;

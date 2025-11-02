import Button from "@/components/Button";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Onboarding = () => {
  const router = useRouter();
  return (
    <>
      <Wrapper bg="#133D51">
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/onboarding-img.png")}
            style={styles.image}
            contentFit="contain"
          />

          <View style={styles.bottom}>
            {/* <Image
              source={icons.logo}
              style={styles.icon}
              contentFit="contain"
            /> */}

            <Text style={styles.title}>
              Payroll doesn’t have to be stressful.
            </Text>
            <Text style={styles.desc}>
              Get a clear overview of your payroll expenses and run salaries.
            </Text>

            <Button title="Get Started" onPress={() => router.push("/login")} />
          </View>
        </View>
      </Wrapper>
      <StatusBar style="light" />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    marginTop: 50,
  },

  icon: {
    width: 56,
    height: 44,
  },

  title: {
    color: "#fff",
    fontSize: FontSizes["4xl"],
    fontFamily: FontFamily.Bold as string,
    textAlign: "center",
    marginTop: 24,
    paddingHorizontal: 24,
  },

  desc: {
    color: "#fff",
    fontSize: FontSizes.md,
    fontFamily: FontFamily.Medium as string,
    textAlign: "center",
    marginBottom: 74,
    marginTop: 4,
  },

  bottom: {
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Onboarding;

import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../Button";

interface ChooseUsernameProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

const ChooseUsername = ({ setCurrentStep, setUsername }: ChooseUsernameProps) => {
  const [username, setLocalUsername] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = useMemo(() => {
    // 3–20 chars, letters, numbers, underscore; no leading/trailing underscore
    const re = /^(?!_)[A-Za-z0-9_]{3,20}(?<!_)$/;
    return re.test(username);
  }, [username]);

  const error = useMemo(() => {
    if (!touched) return "";
    if (!username) return "Username is required";
    if (username.length < 3) return "Minimum 3 characters";
    if (username.length > 20) return "Maximum 20 characters";
    const re = /^(?!_)[A-Za-z0-9_]{3,20}(?<!_)$/;
    if (!re.test(username)) return "Use letters, numbers, and underscore only";
    return "";
  }, [username, touched]);

  const handleProceed = () => {
    setTouched(true);
    if (!isValid) return;
    setUsername(username);
    setCurrentStep(3);
  };

  return (
    <>
      <View style={{ marginTop: 24 }}>
        <Text style={styles.title}>Choose Your Username</Text>
        <Text style={styles.subtitle}>
          What would you like to be called on Zeefas community
        </Text>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          value={username}
          onChangeText={setLocalUsername}
          onBlur={() => setTouched(true)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Type Username"
          placeholderTextColor="#9CA3AF"
          style={styles.bigInput}
        />
        {!!error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      <View style={{ flex: 0.95 }} />

      <View style={{ marginBottom: 24 }}>
        <Button
          title="Proceed"
          type="primary"
          disabled={!isValid}
          onPress={handleProceed}
        />
      </View>
    </>
  );
};

export default ChooseUsername;

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
  inputWrapper: {
    marginTop: 160,
    alignItems: "center",
  },
  bigInput: {
    width: "100%",
    textAlign: "center",
    fontSize: FontSizes["6xl"],
    fontFamily: FontFamily.SemiBold,
    color: "#0C503F",
  },
  errorText: {
    marginTop: 12,
    fontSize: FontSizes.sm,
    fontFamily: FontFamily.Medium,
    color: "#CE0000",
  },
});

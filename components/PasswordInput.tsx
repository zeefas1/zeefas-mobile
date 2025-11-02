import { icons } from "@/assets/icons";
import { FontSizes } from "@/constants/FontSizes";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface PasswordInputComponentProps extends TextInputProps {
  label: string;
  error?: string;
  iconName: any;
}

const PasswordInputComponent: React.FC<PasswordInputComponentProps> = ({
  label,
  error,
  iconName,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.focusedContainer,
          error && styles.errorBorder,
        ]}
      >
        <TextInput
          style={styles.input}
          secureTextEntry={isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // placeholderTextColor="#0A0A0A0A"
          {...props}
        />

        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Image
            source={isPasswordVisible ? icons.eyeOff : icons.eye}
            style={styles.icon2}
            contentFit="contain"
            transition={200}
          />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    marginBottom: 5,
    color: "#2D2D2D",
    fontSize: FontSizes.base,
    fontFamily: "PublicSansRegular",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D5DD",
    fontSize: FontSizes.base,
    borderRadius: 6,
    height: 48,
    backgroundColor: "#fff",
    fontFamily: "PublicSansRegular",
  },
  errorBorder: {
    borderColor: "#CE0000",
  },

  errorText: {
    marginTop: 4,
    color: "#CE0000",
    fontSize: FontSizes.xs,
    fontFamily: "PublicSansMedium",
  },

  focusedContainer: {
    borderColor: "#0C503F",
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontFamily: "PublicSansRegular",
    fontSize: FontSizes.base,
    color: "#151515",
    height: "100%",
  },
  icon: {
    marginHorizontal: 10,
    height: 20,
    width: 20,
  },

  icon2: {
    marginRight: 20,
    height: 20,
    width: 20,
  },
});

export default PasswordInputComponent;

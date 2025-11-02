import { FontSizes } from "@/constants/FontSizes";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TextInputComponentProps extends TextInputProps {
  label: string;
  error?: string;
  disabled?: boolean;
}

const TextInputComponent: React.FC<TextInputComponentProps> = ({
  label,
  error,
  disabled,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          disabled && styles.disabledContainer,
          isFocused && styles.focusedContainer,
          error && styles.errorBorder,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              color: disabled ? "#A0A0A0" : "#151515",
            },
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          // placeholderTextColor="#0A0A0A0A"
          {...props}
        />
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
    fontFamily: "PublicSansMedium",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0C503F",
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
    borderColor: "#0CE194",
  },

  disabledContainer: {
    backgroundColor: "#F5F5F5",
  },

  input: {
    flex: 1,
    paddingHorizontal: 24,
    fontFamily: "PublicSansRegular",
    fontSize: FontSizes.base,
    height: "100%",
    color: "#151515",
  },
  icon: {
    marginHorizontal: 10,
    height: 20,
    width: 20,
  },
});

export default TextInputComponent;

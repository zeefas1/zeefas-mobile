import AuthGoBack from "@/components/AuthGoBack";
import Button from "@/components/Button";
import ProgressBar from "@/components/ProgressBar";
import Wrapper from "@/components/Wrapper";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AccountType = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selected, setSelected] = useState<"customer" | "vendor" | null>(null);

  const handleProceed = () => {
    if (!selected) return;
    setCurrentStep(2);
  };

  return (
    <Wrapper showBottomImage bg="#fff" paddingHorizontal={24}>
      <View style={styles.headerTop}>
        <AuthGoBack marginTop={0} marginHorizontal={0} />
        <ProgressBar currentStep={currentStep} />
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={styles.title}>Select Account type</Text>
        <Text style={styles.subtitle}>
          Choose the type of account you want to create on Zeefas
        </Text>
      </View>

      <View style={{ marginTop: 24, gap: 16 }}>
        <SelectCard
          title="Customer account"
          description="Shop or Hire great talents on Zeefas"
          selected={selected === "customer"}
          onPress={() => setSelected("customer")}
        />
        <SelectCard
          title="Vendor / Service provider"
          description="Sell product or provide service to people"
          selected={selected === "vendor"}
          onPress={() => setSelected("vendor")}
        />
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ marginBottom: 24 }}>
        <Button
          title="Proceed"
          type="primary"
          disabled={!selected}
          onPress={handleProceed}
        />
      </View>
    </Wrapper>
  );
};

const SelectCard = ({
  title,
  description,
  selected,
  onPress,
}: {
  title: string;
  description: string;
  selected?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardIcon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerTop: {
    gap: 16,
  },

  title: {
    fontSize: FontSizes["6xl"],
    lineHeight: 42,
    fontFamily: FontFamily.SemiBold,
    color: "#1F2937",
  },

  subtitle: {
    marginTop: 8,
    fontSize: FontSizes.lg,
    lineHeight: 22,
    fontFamily: FontFamily.Regular,
    color: "#6B7280",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
  },

  cardTitle: {
    fontSize: FontSizes["2xl"],
    fontFamily: FontFamily.SemiBold,
    color: "#111827",
  },

  cardDesc: {
    marginTop: 4,
    fontSize: FontSizes.base,
    fontFamily: FontFamily.Regular,
    color: "#6B7280",
  },

  radio: {
    width: 24,
    height: 24,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },

  radioSelected: {
    backgroundColor: "#0C503F",
    borderColor: "#0C503F",
  },
});

export default AccountType;

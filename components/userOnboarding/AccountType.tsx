import { icons } from "@/assets/icons";
import { FontFamily } from "@/constants/FontFamily";
import { FontSizes } from "@/constants/FontSizes";
import { Image } from "expo-image";
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Button from "../Button";

interface AccountTypeProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}

const AccountType = ({ setCurrentStep }: AccountTypeProps) => {
  const [selected, setSelected] = useState<"customer" | "vendor" | null>(null);

  const handleProceed = () => {
    if (!selected) return;
    setCurrentStep(2);
  };
  return (
    <>
      <View style={{ marginTop: 24 }}>
        <Text style={styles.title}>Select Account type</Text>
        <Text style={styles.subtitle}>
          Choose the type of account you want to create on Zeefas
        </Text>
      </View>

      <View style={{ marginTop: 24, gap: 16 }}>
        <SelectCard
          icon={icons?.customerBagIcon}
          title="Customer account"
          description="Shop or Hire great talents on Zeefas"
          selected={selected === "customer"}
          onPress={() => setSelected("customer")}
        />
        <SelectCard
          icon={icons?.vendorHouseIcon}
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
    </>
  );
};

const SelectCard = ({
  title,
  description,
  selected,
  onPress,
  icon,
}: {
  title: string;
  description: string;
  selected?: boolean;
  onPress?: () => void;
  icon: ImageSourcePropType;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.cardIcon}>
        <Image source={icon} style={styles.icon} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDesc}>{description}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
    </TouchableOpacity>
  );
};

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

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 18,
    backgroundColor: "#fff",
    height: 86,
  },

  cardIcon: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    backgroundColor: "#4BB96C1F",
  },

  icon: {
    width: 30,
    height: 30,
  },

  cardTitle: {
    fontSize: FontSizes["lg"],
    fontFamily: FontFamily.Medium,
    color: "#000",
  },

  cardDesc: {
    marginTop: 4,
    fontSize: FontSizes.base,
    fontFamily: FontFamily.Regular,
    color: "#6B7280",
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  radioSelected: {
    borderColor: "#4BB96C",
  },

  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4BB96C",
  },
});

export default AccountType;

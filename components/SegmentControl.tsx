import { FontSizes } from "@/constants/FontSizes";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
  marginTop?: number;
};

const SegmentedControl: React.FC<SegmentedControlProps> = React.memo(
  ({ options, selectedOption, onOptionPress, marginTop }) => {
    const { width: windowWidth } = useWindowDimensions();

    const internalPadding = 0;
    const segmentedControlWidth = windowWidth - 40;

    const itemWidth =
      (segmentedControlWidth - internalPadding) / options.length;

    const rStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(
          itemWidth * options.indexOf(selectedOption) + internalPadding / 2
        ),
      };
    }, [selectedOption, options, itemWidth]);

    return (
      <View
        style={[
          styles.container,
          {
            width: segmentedControlWidth,
            borderRadius: 0,
            paddingLeft: internalPadding / 2,
            marginTop: marginTop ?? 0,
          },
        ]}
      >
        <Animated.View
          style={[
            {
              width: itemWidth,
            },
            rStyle,
            styles.activeBox,
          ]}
        />
        {options.map((option) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onOptionPress?.(option);
              }}
              key={option}
              style={[
                {
                  width: itemWidth,
                },
                styles.labelContainer,
              ]}
            >
              <Text
                style={[
                  styles.label,
                  selectedOption === option
                    ? styles.activeText
                    : styles.nonActiveText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

SegmentedControl.displayName = "SegmentedControl";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 30,
    borderBottomWidth: 1,
    borderColor: "#E9E9E9",
  },
  activeBox: {
    position: "absolute",
    borderRadius: 0,
    shadowColor: "black",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0.1,
    // elevation: 3,
    height: "100%",
    // top: "10%",
    borderBottomWidth: 1,
    borderColor: "#0CE194",
  },
  labelContainer: { justifyContent: "center", alignItems: "center" },
  label: {
    fontFamily: "ManropeMedium",
    fontSize: FontSizes.base,
  },

  nonActiveText: {
    color: "#151515",
    marginBottom: 4,
  },

  activeText: {
    color: "#151515",
    marginBottom: 4,
  },
});

export { SegmentedControl };

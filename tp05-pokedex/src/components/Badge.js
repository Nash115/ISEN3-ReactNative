import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";

export default function Badge({ label, color, style }) {
  return (
    <View
      style={{
        ...styles.badge,
        ...style,
      }}
    >
      <Text
        style={{ ...styles.badgeLabel, ...{ color: color || theme.black } }}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 100,
    width: "fit-content",
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: "light",
  },
});

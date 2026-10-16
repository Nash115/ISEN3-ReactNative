import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";

export default function TypeBadge({ label }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: theme.whiteTranslucent,
    borderRadius: 100,
    width: "fit-content",
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: "light",
  },
});

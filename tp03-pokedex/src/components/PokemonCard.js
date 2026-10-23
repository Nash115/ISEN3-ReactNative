import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Badge from "../components/Badge";
import theme, { TYPE_COLORS } from "../theme";

export default function PokemonCard({
  name,
  number,
  type,
  image,
  captured,
  onToggle,
}) {
  return (
    <View
      style={{
        ...styles.card,
        ...{ backgroundColor: captured ? TYPE_COLORS[type] : theme.white },
      }}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.rightSide}>
        <View style={styles.data}>
          <Text style={styles.number}>{`#${number}`}</Text>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.tagRow}>
            <Badge
              label={type}
              style={{
                backgroundColor: captured
                  ? theme.whiteTranslucent
                  : TYPE_COLORS[type],
              }}
            />
          </View>
        </View>
        <Pressable
          style={
            captured
              ? {
                  padding: 5,
                  backgroundColor: theme.white,
                  borderColor: TYPE_COLORS[type],
                  borderWidth: 1,
                  borderRadius: 5,
                  width: "fit-content",
                }
              : {
                  padding: 5,
                  backgroundColor: TYPE_COLORS[type],
                  borderRadius: 5,
                  width: "fit-content",
                }
          }
          onPress={onToggle}
        >
          <Text
            style={
              captured ? { color: TYPE_COLORS[type] } : { color: theme.black }
            }
          >
            {captured ? "Captured ✓" : "Capture"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: theme.cardRadius,
    width: "100%",
    marginBottom: 5,
  },
  data: { flex: 1, gap: 3 },
  rightSide: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: { width: 60, height: 60, borderRadius: 100 },
  number: { fontSize: 12, fontWeight: "light" },
  name: { fontSize: 16, fontWeight: "bold" },
  tagRow: {
    flexDirection: "row",
  },
});

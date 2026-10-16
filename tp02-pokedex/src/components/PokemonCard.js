import { Image, StyleSheet, Text, View } from "react-native";
import TypeBadge from "../components/TypeBadge";
import theme, { TYPE_COLORS } from "../theme";

export default function PokemonCard({ name, number, type, image }) {
  return (
    <View style={{ ...styles.card, ...{ backgroundColor: TYPE_COLORS[type] } }}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.data}>
        <Text style={styles.number}>{`#${number}`}</Text>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.tagRow}>
          <TypeBadge label={type} />
        </View>
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
  image: { width: 60, height: 60, borderRadius: 100 },
  number: { fontSize: 12, fontWeight: "light" },
  name: { fontSize: 16, fontWeight: "bold" },
  tagRow: {
    flexDirection: "row",
  },
});

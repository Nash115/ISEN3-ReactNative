import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import theme, { TYPE_COLORS } from "../theme";

const API_POKEMON = "https://pokeapi.co/api/v2/pokemon/";

export default function PokemonCard({
  name,
  number,
  image,
  captured,
  onToggle,
}) {
  const [type, setType] = useState(null);

  async function load_info() {
    const type_response = await fetch(`${API_POKEMON}${number}/`);
    const type_data = await type_response.json();
    setType(type_data.types[0].type.name);
  }
  useEffect(() => {
    load_info();
  }, []);

  if (type == null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <Pressable
      style={{
        ...styles.card,
        ...{ backgroundColor: captured ? TYPE_COLORS[type] : theme.white },
      }}
      onPress={() => router.push(`/pokemon/${number}`)}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.rightSide}>
        <View style={styles.data}>
          <Text style={styles.number}>{`#${number}`}</Text>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.tagRow}>
            {/* <Badge
              label={type}
              style={{
                backgroundColor: captured
                  ? theme.whiteTranslucent
                  : TYPE_COLORS[type],
              }}
            />*/}
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
                    borderWidth: 1,
                    borderColor: TYPE_COLORS[type],
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
    </Pressable>
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
    marginBottom: 5,
    flex: 1,
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

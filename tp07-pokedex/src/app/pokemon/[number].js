import { ActivityIndicator, View, Text, Image, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import Badge from "../../components/Badge";

import theme, { TYPE_COLORS } from "../../theme";

const API_POKEMON = "https://pokeapi.co/api/v2/pokemon/";
const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function FichePokemon() {
  const { number } = useLocalSearchParams();

  const [pokemon, setPokemon] = useState(null);

  async function load_info() {
    const response = await fetch(`${API_POKEMON}${number}/`);
    const data = await response.json();
    setPokemon(data);
  }
  useEffect(() => {
    load_info();
  }, [number]);

  if (pokemon == null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const color_type = TYPE_COLORS[pokemon.types[0].type.name];

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 24 }}>
      <Stack.Screen options={{ title: pokemon.name }} />
      <Image
        source={{ uri: `${ARTWORK}${pokemon.id}.png` }}
        style={styles.image}
      />
      <Badge
        label={`#${pokemon.id}`}
        style={{
          backgroundColor: theme.lightGray,
        }}
      />
      <Text>{pokemon.name}</Text>
      <Text>Height : {pokemon.height / 10} m</Text>
      <Text>Weight : {pokemon.weight / 10} kg</Text>
      <Badge
        label={pokemon.types[0].type.name}
        style={{
          backgroundColor: color_type,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },
});

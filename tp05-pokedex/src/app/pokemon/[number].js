import { View, Text, Image, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import Badge from "../../components/Badge";

import theme, { TYPE_COLORS } from "../../theme";
import POKEMONS from "../../data/pokemons";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function FichePokemon() {
  const { number } = useLocalSearchParams();
  const pokemon = POKEMONS.find((p) => p.number == Number(number));
  const color_type = TYPE_COLORS[pokemon.type];
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 24 }}>
      <Stack.Screen options={{ title: pokemon.name }} />
      <Image
        source={{ uri: `${ARTWORK}${pokemon.number}.png` }}
        style={styles.image}
      />
      <Badge
        label={`#${pokemon.number}`}
        style={{
          backgroundColor: theme.lightGray,
        }}
      />
      <Text>{pokemon.name}</Text>
      <Badge
        label={pokemon.type}
        style={{
          backgroundColor: TYPE_COLORS[pokemon.type],
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

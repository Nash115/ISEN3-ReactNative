import { Text, View, StyleSheet, ScrollView } from "react-native";
import PokemonCard from "../components/PokemonCard";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

const POKEMONS = [
  { number: 1, name: "Bulbizarre", type: "Plante" },
  { number: 4, name: "Salamèche", type: "Feu" },
  { number: 7, name: "Carapuce", type: "Eau" },
  { number: 25, name: "Pikachu", type: "Électrik" },
  { number: 37, name: "Goupix", type: "Feu" },
  { number: 43, name: "Mystherbe", type: "Plante" },
];

// const FIRE_POKEMONS = POKEMONS.filter((pokemon) => pokemon.type == "Feu");

export default function Index() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nao's Pokedex</Text>
      <Text style={styles.subtitle}>{`${POKEMONS.length} pokemons`}</Text>
      {POKEMONS.map((pokemon) => (
        <PokemonCard
          key={pokemon.number}
          name={pokemon.name}
          number={pokemon.number}
          type={pokemon.type}
          image={`${ARTWORK}${pokemon.number}.png`}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "thin",
    marginBottom: 12,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});

import {
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import Help from "../components/Help";
import Badge from "../components/Badge";
import theme, { TYPE_COLORS } from "../theme";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

const POKEMONS = [
  { number: 1, name: "Bulbasaur", type: "Grass" },
  { number: 4, name: "Charmander", type: "Fire" },
  { number: 7, name: "Squirtle", type: "Water" },
  { number: 25, name: "Pikachu", type: "Electric" },
  { number: 37, name: "Vulpix", type: "Fire" },
  { number: 43, name: "Oddish", type: "Grass" },
];

export default function Index() {
  const [captured, setCaptured] = useState([]);
  const [filter, setFilter] = useState(false);
  const [search, setSearch] = useState("");

  function toggle(number) {
    if (captured.includes(number)) {
      setCaptured(captured.filter((n) => n !== number));
    } else {
      setCaptured([...captured, number]);
    }
  }

  const filterResult = filter
    ? POKEMONS.filter((p) => p.type === "Fire")
    : POKEMONS;

  const searchResult = search
    ? filterResult.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      )
    : filterResult;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Nao's Pokedex</Text>
      <Text
        style={styles.subtitle}
      >{`${POKEMONS.length} pokemons • ${captured.length} captured`}</Text>
      <View style={styles.filters}>
        <Pressable onPress={() => setFilter(!filter)}>
          <Badge
            label={filter ? "Disable filter" : "Show only Fire Pokémons"}
            color={filter ? theme.white : TYPE_COLORS["Fire"]}
            style={
              filter
                ? { backgroundColor: TYPE_COLORS["Fire"] }
                : { borderWidth: 1, borderColor: TYPE_COLORS["Fire"] }
            }
          />
        </Pressable>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 100,
            paddingHorizontal: 7,
            width: "100%",
          }}
          placeholder="Search for a pokemon"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      {searchResult.map((pokemon) => (
        <PokemonCard
          key={pokemon.number}
          name={pokemon.name}
          number={pokemon.number}
          type={pokemon.type}
          image={`${ARTWORK}${pokemon.number}.png`}
          captured={captured.includes(pokemon.number)}
          onToggle={() => toggle(pokemon.number)}
        />
      ))}
      <Help />
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
  filters: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
});

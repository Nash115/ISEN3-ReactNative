import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PokemonCard from "../../components/PokemonCard";
import Help from "../../components/Help";
import Badge from "../../components/Badge";

import theme, { TYPE_COLORS } from "../../theme";

const API = "https://pokeapi.co/api/v2/pokemon?limit=151";
const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function Index() {
  const [pokemons, setPokemons] = useState(null);
  const [captured, setCaptured] = useState([]);
  const [capturedFilter, setCapturedFilter] = useState(false);
  const [search, setSearch] = useState("");

  async function load_captures() {
    const loaded = await AsyncStorage.getItem("captures");
    if (loaded !== null) {
      setCaptured(JSON.parse(loaded));
    }
  }
  useEffect(() => {
    load_captures();
  }, []);

  async function load_pokemons() {
    const response = await fetch(API);
    const data = await response.json();
    const list = data.results.map((p, i) => ({ number: i + 1, name: p.name }));
    setPokemons(list);
  }
  useEffect(() => {
    load_pokemons();
  }, []);

  if (pokemons == null) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  async function toggleCaptured(number) {
    let captures = [];
    if (captured.includes(number)) {
      captures = captured.filter((n) => n !== number);
    } else {
      captures = [...captured, number];
    }
    setCaptured(captures);
    await AsyncStorage.setItem("captures", JSON.stringify(captures));
  }

  const pokeTypes = Object.keys(TYPE_COLORS);

  let filterResult = capturedFilter
    ? pokemons.filter((p) => captured.includes(p.number))
    : pokemons;

  const searchResult = search
    ? filterResult.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      )
    : filterResult;

  const HEADER = (
    <View>
      <View>
        <Text style={styles.title}>Nao's Pokedex</Text>
        <Help />
      </View>
      <Text
        style={styles.subtitle}
      >{`${pokemons.length} pokemons • ${captured.length} captured`}</Text>
      <View style={styles.filters}>
        <Pressable onPress={() => setCapturedFilter(!capturedFilter)}>
          <Badge
            label={capturedFilter ? "Show all" : "My Captures"}
            color={capturedFilter ? theme.white : theme.primary}
            style={
              capturedFilter
                ? {
                    borderWidth: 1,
                    borderColor: theme.primary,
                    backgroundColor: theme.primary,
                  }
                : { borderWidth: 1, borderColor: theme.primary }
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
    </View>
  );

  return (
    <FlatList
      data={searchResult}
      extraData={captured}
      numColumns={2}
      columnWrapperStyle={{ gap: 12 }}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      ListHeaderComponent={HEADER}
      ListEmptyComponent={
        <Text>
          {captured.length == 0
            ? "You have not captured any Pokémons for now"
            : "Nothing found corresponding to the selected filters"}
        </Text>
      }
      ListFooterComponent={
        <Pressable
          style={captured.length == 0 ? styles.hidden : styles.buttonSecondary}
          onPress={() => setCaptured([])}
        >
          <Text style={styles.text}>Uncapture all</Text>
        </Pressable>
      }
      keyExtractor={(item) => String(item.number)}
      renderItem={({ item }) => (
        <PokemonCard
          id={item.number}
          name={item.name}
          number={item.number}
          image={`${ARTWORK}${item.number}.png`}
          captured={captured.includes(item.number)}
          onToggle={() => toggleCaptured(item.number)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  hidden: {
    display: "None",
  },
  buttonSecondary: {
    padding: 5,
    backgroundColor: theme.white,
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 5,
    width: "fit-content",
  },
  text: {
    color: theme.primary,
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

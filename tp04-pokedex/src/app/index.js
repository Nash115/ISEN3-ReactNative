import {
  FlatList,
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

import POKEMONS from "../data/pokemons";

const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function Index() {
  const [captured, setCaptured] = useState([]);
  const [capturedFilter, setCapturedFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState("");
  const [search, setSearch] = useState("");

  function toggleCaptured(number) {
    if (captured.includes(number)) {
      setCaptured(captured.filter((n) => n !== number));
    } else {
      setCaptured([...captured, number]);
    }
  }

  function toggleTypeFilter(type) {
    if (typeFilter == type) {
      setTypeFilter("");
    } else {
      setTypeFilter(type);
    }
  }

  const pokeTypes = Object.keys(TYPE_COLORS);

  let filterResult = capturedFilter
    ? POKEMONS.filter((p) => captured.includes(p.number))
    : POKEMONS;

  filterResult =
    typeFilter != ""
      ? filterResult.filter((p) => p.type == typeFilter)
      : filterResult;

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
      >{`${POKEMONS.length} pokemons • ${captured.length} captured`}</Text>
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
      <View style={styles.typeFiltersContainer}>
        {pokeTypes.map((t) => (
          <Pressable key={t} onPress={() => toggleTypeFilter(t)}>
            <Badge
              label={t}
              color={typeFilter == t ? theme.black : theme.black}
              style={
                typeFilter == t
                  ? {
                      borderWidth: 1,
                      backgroundColor: TYPE_COLORS[t],
                      borderColor: TYPE_COLORS[t],
                    }
                  : {
                      borderWidth: 1,
                      borderColor: TYPE_COLORS[t],
                    }
              }
            />
          </Pressable>
        ))}
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
          type={item.type}
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
  typeFiltersContainer: {
    flexDirection: "row",
    gap: 3,
    flexWrap: "wrap",
  },
});

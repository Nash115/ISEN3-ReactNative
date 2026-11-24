import { Image, StyleSheet, Text, View } from "react-native";
import Badge from "../../components/Badge";
import theme, { TYPE_COLORS } from "../../theme";

const FAVORITE_POKEMON = { number: 25, name: "Pikachu", type: "Électrik" };

const API = "https://pokeapi.co/api/v2/pokemon?limit=151";
const ARTWORK =
  "https://raw.githubusercontent.com/PokeAPI/sprites" +
  "/master/sprites/pokemon/other/official-artwork/";

export default function Profile() {
  const tags = ["Lvl. 42", "Player", "ISEN"];
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={{ uri: "https://nash115.fr/favicon.png" }}
            style={styles.image}
          />
          <Text style={styles.title}>Nash115</Text>
          <View style={styles.tags}>
            {tags.map((tag) => (
              <Badge
                key={tag}
                label={tag}
                color={theme.white}
                style={{
                  backgroundColor: theme.primary,
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.favouritePokemon}>
          <Text>Favourite pokemon</Text>
          <Image
            source={{ uri: `${ARTWORK}${FAVORITE_POKEMON.number}.png` }}
            style={{ width: 120, height: 120 }}
          />
          <Badge
            label={FAVORITE_POKEMON.name}
            color={theme.black}
            style={{
              backgroundColor: TYPE_COLORS[FAVORITE_POKEMON.type],
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    paddingTop: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "95%",
    gap: 10,
  },
  hero: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: theme.cardRadius,
    width: "100%",
  },
  image: { width: 120, height: 120, borderRadius: 100 },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  tags: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  favouritePokemon: {
    padding: 10,
    backgroundColor: theme.white,
    borderRadius: theme.cardRadius,
    marginBottom: 10,
    alignItems: "center",
  },
});

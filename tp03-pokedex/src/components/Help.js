import { Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import theme, { items } from "../theme";

export default function Help() {
  const [help, setHelp] = useState(false);
  return (
    <View style={styles.help}>
      <Pressable onPress={() => setHelp(!help)} style={styles.helpButton}>
        <Text style={styles.helpLabel}>{help ? "Hide help" : "Show help"}</Text>
      </Pressable>
      {help && (
        <Text style={styles.helpMessage}>
          Click on Capture to add a Pokémon in you pokedex
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  help: {
    marginTop: 25,
    alignItems: "center",
  },
  helpButton: {
    padding: 5,
    backgroundColor: theme.white,
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 5,
    width: "fit-content",
  },
  helpLabel: {
    color: theme.primary,
  },
  helpMessage: {
    color: theme.gray,
  },
});

import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View style={styles.hero}>
          <Image
            source={{ uri: "https://nash115.fr/favicon.png" }}
            style={styles.image}
          />
          <Text style={styles.title}>Hugo MILLION-ROUSSEAU</Text>
          <Text style={styles.sub}>Étudiant ingénieur • 1ere année</Text>
          <View style={styles.tags}>
            <Text style={styles.tag}>Code</Text>
            <Text style={styles.tag}>Cyber</Text>
            <Text style={styles.tag}>ISEN</Text>
          </View>
          <Pressable
            style={styles.button}
            onPress={() =>
              Alert.alert("Contact", "hugo.million-rousseau@isen.yncrea.fr")
            }
          >
            <Text style={styles.buttonText}>Me contacter</Text>
          </Pressable>
        </View>
        <ScrollView
          style={styles.projectsList}
          contentContainerStyle={styles.projectsListContent}
        >
          <View style={styles.projectCard}>
            <Text style={styles.projectTitle}>Pseudocode Interpreter</Text>
            <Text style={styles.projectText}>
              Have you ever wanted to execute pseudocode? This project, built in
              Rust, allows you to execute pseudocode (English) and French
              pseudo-code.
            </Text>
          </View>
          <View style={styles.projectCard}>
            <Text style={styles.projectTitle}>Kamer Debat App</Text>
            <Text style={styles.projectText}>
              Contribution to a Proof of Concept for the Dutch Ministry of the
              Interior and Kingdom Relations: An internal web solution to
              improve the debate process.
            </Text>
          </View>
          <View style={styles.projectCard}>
            <Text style={styles.projectTitle}>Makengine</Text>
            <Text style={styles.projectText}>
              CLI tool that simplifies C project workflows by automating
              compilation, execution, and project setup making it ideal for
              developers and students.
            </Text>
          </View>
          <View style={styles.projectCard}>
            <Text style={styles.projectTitle}>OpenTFA</Text>
            <Text style={styles.projectText}>
              An open-source re-implementation of TowerFall Ascension, developed
              in Rust with Bevy Engine.
            </Text>
          </View>
          <View style={styles.projectCard}>
            <Text style={styles.projectTitle}>French ATC for MSFS2020</Text>
            <Text style={styles.projectText}>
              An air traffic control service available in French, allowing you
              to communicate verbally for a better immersion in your flights.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const theme = {
  primary: "#000042",
  white: "#ffffff",
  gray: "#676767",
  cardRadius: 21,
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: theme.primary,
  },
  container: {
    flex: 1,
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
  sub: {
    fontSize: 16,
    color: theme.gray,
    marginTop: 8,
  },
  tags: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  tag: {
    padding: 3,
    color: theme.primary,
    borderColor: theme.primary,
    borderWidth: 1,
    borderRadius: 100,
  },
  button: {
    marginTop: 20,
    padding: 3,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    padding: 8,
    color: theme.white,
  },
  projectsList: {
    width: "100%",
    flex: 1,
  },
  projectsListContent: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  projectCard: {
    padding: 10,
    backgroundColor: theme.white,
    borderRadius: theme.cardRadius,
    width: "100%",
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.primary,
  },
  projectText: {
    color: theme.primary,
  },
});

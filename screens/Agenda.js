import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from "react-native";

import Fifi from "../components/Fifi";
import Calendrier from "../components/Calendrier";

export default function Agenda() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.entete}>
        <Fifi />
        <Text style={styles.titre}>
          Agenda
        </Text>
      </View>

      <Calendrier />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EF",
  },

  content: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 32,
  },

  entete: {
    alignItems: "center",
    marginBottom: 25,
  },

  titre: {
    fontSize: 28,
    fontWeight: "700",
    color: "#555",
    marginTop: 10,
  },
});

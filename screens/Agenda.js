import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import Calendrier from "../components/Calendrier";

export default function Agenda() {
  return (
    <View style={styles.container}>

      {/* En-tête */}
      <View style={styles.entete}>
        <Text style={styles.icone}>🗓️</Text>

        <Text style={styles.titre}>
          Agenda
        </Text>
      </View>

      {/* Calendrier + rendez-vous de la semaine */}
      <View style={styles.contenu}>
        <Calendrier />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F8F5EF",
  },

  entete: {
    height: 72,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingTop: 40,
  },

  icone: {
    fontSize: 25,
    marginRight: 10,
  },

  titre: {
    fontSize: 24,
    fontWeight: "700",
    color: "#5A4030",
  },

  contenu: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 8,
  },

});
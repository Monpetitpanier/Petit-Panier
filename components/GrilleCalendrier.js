import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import JourCalendrier from "./JourCalendrier";

const JOURS = [
  "L",
  "M",
  "M",
  "J",
  "V",
  "S",
  "D",
];

export default function GrilleCalendrier({
  jours,
  dateSelectionnee,
  onSelectionJour,
}) {

  return (
    <View>

      <View style={styles.entete}>
        {JOURS.map((jour) => (
          <Text
            key={jour}
            style={styles.jour}
          >
            {jour}
          </Text>
        ))}
      </View>

      <View style={styles.grille}>
        {jours.map((jour) => (

          <View
            key={jour.date}
            style={styles.case}
          >

            <JourCalendrier
              jour={{
                ...jour,
                estSelectionne:
                  jour.date === dateSelectionnee,
              }}
              onPress={() =>
                onSelectionJour(jour.date)
              }
            />

          </View>

        ))}
      </View>

    </View>
  );

}

const styles = StyleSheet.create({

  entete: {
    flexDirection: "row",
    marginBottom: 10,
  },

  jour: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
    color: "#777",
  },

  grille: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  case: {
    width: "14.2857%",
  },

});
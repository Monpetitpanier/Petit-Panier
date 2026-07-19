import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

const MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export default function EnteteCalendrier({
  date,
  precedent,
  suivant,
  aujourdHui,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={precedent}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={28}
          color={Colors.primary}
        />
      </TouchableOpacity>

      <View style={styles.centre}>
        <Text style={styles.mois}>
          {MOIS[date.getMonth()]}
        </Text>

        <Text style={styles.annee}>
          {date.getFullYear()}
        </Text>

        <TouchableOpacity
          style={styles.bouton}
          onPress={aujourdHui}
        >
          <Text style={styles.texteBouton}>
            Aujourd'hui
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={suivant}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={28}
          color={Colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },

  centre: {
    alignItems: "center",
  },

  mois: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
  },

  annee: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  bouton: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },

  texteBouton: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
});
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function CarteJournee() {
  return (
    <View style={styles.carte}>

      <Text style={styles.titre}>
        🌿 Aujourd'hui
      </Text>

      <Text style={styles.ligne}>
        📅 Deux rendez-vous
      </Text>

      <Text style={styles.ligne}>
        🏡 Quelques courses
      </Text>

      <Text style={styles.ligne}>
        ❤️ Rien à signaler
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  carte: {

    backgroundColor: Colors.card,

    borderRadius: Radius.large,

    padding: Spacing.lg,

    marginTop: Spacing.lg,

    ...Shadow.card,

  },

  titre: {

    fontSize: 22,

    fontWeight: "700",

    color: Colors.text,

    marginBottom: 15,

  },

  ligne: {

    fontSize: 16,

    color: Colors.subtitle,

    marginBottom: 10,

  },

});
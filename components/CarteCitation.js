import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function CarteCitation() {
  return (

    <View style={styles.carte}>

      <Text style={styles.titre}>
        ✨ Citation du jour
      </Text>

      <Text style={styles.citation}>
        "Chaque petit pas te rapproche de ton objectif."
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

    fontSize: 20,

    fontWeight: "700",

    color: Colors.text,

    marginBottom: 15,

  },

  citation: {

    fontSize: 17,

    color: Colors.subtitle,

    fontStyle: "italic",

    lineHeight: 28,

  },

});
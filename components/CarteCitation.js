import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function CarteCitation() {
  return (
    <View style={styles.carte}>

      <View style={styles.entete}>
        <Text style={styles.titre}>
          Une pensée pour toi
        </Text>

        <Text style={styles.illustration}>
          🌷
        </Text>
      </View>

      <Text style={styles.citation}>
        « Chaque petit pas compte, même lorsque tu as
        l'impression de ne pas avancer. »
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

  entete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: Spacing.md,
  },

  titre: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  illustration: {
    fontSize: 28,
  },

  citation: {
    fontSize: 15,
    lineHeight: 25,
    color: Colors.subtitle,

    fontStyle: "italic",
  },

});
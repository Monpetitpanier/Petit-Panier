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

export default function CarteCoupDOeil() {
  return (
    <View style={styles.carte}>
      <View style={styles.entete}>
        <Text style={styles.titre}>
          P'tit coup d'œil
        </Text>

        <Text style={styles.icone}>
          🌿
        </Text>
      </View>

      <View style={styles.liste}>

        <View style={styles.ligne}>
          <Text style={styles.emoji}>💰</Text>

          <Text
            style={styles.texte}
            numberOfLines={2}
          >
            Budget disponible
          </Text>
        </View>

        <View style={styles.ligne}>
          <Text style={styles.emoji}>💊</Text>

          <Text
            style={styles.texte}
            numberOfLines={2}
          >
            Médicament à prendre
          </Text>
        </View>

        <View style={styles.ligne}>
          <Text style={styles.emoji}>🧹</Text>

          <Text
            style={styles.texte}
            numberOfLines={2}
          >
            Prochaine tâche
          </Text>
        </View>

        <View style={styles.ligne}>
          <Text style={styles.emoji}>🛒</Text>

          <Text
            style={styles.texte}
            numberOfLines={2}
          >
            Quelques courses
          </Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  carte: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },

  icone: {
    fontSize: 22,
  },

  liste: {
    gap: Spacing.sm,
  },

  ligne: {
    flexDirection: "row",
    alignItems: "center",
  },

  emoji: {
    fontSize: 16,
    width: 28,
  },

  texte: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.subtitle,
  },

});
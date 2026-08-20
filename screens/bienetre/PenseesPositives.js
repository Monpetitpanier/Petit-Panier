import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";
import { Shadow } from "../../theme/shadow";

const pensees = [
  "Chaque petit pas compte.",
  "Tu n'as pas besoin de tout faire aujourd'hui.",
  "Tu fais de ton mieux, et c'est déjà beaucoup.",
  "Respire. Tu n'as pas besoin de tout porter seule.",
  "Même les journées difficiles finissent par passer.",
];

export default function PenseesPositives() {
  const [index, setIndex] = useState(0);
  const [favori, setFavori] = useState(false);

  function changerPensee() {
    setIndex((ancienIndex) =>
      (ancienIndex + 1) % pensees.length
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>
        Pensées positives
      </Text>

      <Text style={styles.sousTitre}>
        Une petite pensée douce, juste pour toi.
      </Text>

      <View style={styles.carte}>
        <Text style={styles.pensee}>
          « {pensees[index]} »
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={() => setFavori(!favori)}
            style={styles.boutonIcone}
          >
            <Text style={styles.icone}>
              {favori ? "⭐" : "☆"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={changerPensee}
            style={styles.bouton}
          >
            <Text style={styles.texteBouton}>
              Une autre pensée
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  titre: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  sousTitre: {
    fontSize: 16,
    color: Colors.subtitle,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },

  carte: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.xl,
    ...Shadow.card,
  },

  pensee: {
    fontSize: 20,
    lineHeight: 32,
    fontStyle: "italic",
    color: Colors.text,
    textAlign: "center",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xl,
  },

  boutonIcone: {
    padding: 8,
    marginRight: Spacing.md,
  },

  icone: {
    fontSize: 26,
  },

  bouton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: "center",
  },

  texteBouton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
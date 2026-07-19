import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function Priere() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titre}>🙏 Prière</Text>

        <Text style={styles.sousTitre}>
          Un espace pour déposer ses intentions, retrouver des prières
          et prendre quelques instants avec le Seigneur.
        </Text>

        <View style={styles.carte}>
          <Text style={styles.message}>
            Cette partie est en cours de création.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    flex: 1,
    padding: Spacing.lg,
  },

  titre: {
    fontSize: 30,
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
    borderRadius: 16,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  message: {
    fontSize: 16,
    color: Colors.text,
    textAlign: "center",
  },
});
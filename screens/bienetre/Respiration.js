import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Respiration() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>🌿 Respiration</Text>
      <Text style={styles.texte}>
        Cet écran est en cours de création.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  titre: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },

  texte: {
    fontSize: 16,
    textAlign: "center",
  },
});
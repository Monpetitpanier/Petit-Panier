import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function Univers() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titre}>🌍 Univers</Text>
      <Text style={styles.sousTitre}>
        Créez et retrouvez ici tous vos univers.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titre: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4A5A4A",
    marginBottom: 10,
  },
  sousTitre: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
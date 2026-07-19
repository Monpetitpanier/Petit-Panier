import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HeaderAccueil() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Petit Panier</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  titre: {
    fontSize: 28,
    fontWeight: "700",
  },
});
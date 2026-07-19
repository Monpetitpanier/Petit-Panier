import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function BoutonPrincipal({ titre, onPress }) {
  return (
    <TouchableOpacity style={styles.bouton} onPress={onPress}>
      <Text style={styles.texte}>{titre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bouton: {
    backgroundColor: "#8BA888",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 10,
  },

  texte: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  onPress: () => void;
  texte?: string;
};

export default function BoutonContinuer({ onPress, texte = "Continuer" }: Props) {
  return (
    <TouchableOpacity style={styles.bouton} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.boutonTexte}>{texte}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bouton: {
    marginTop: 18,
    backgroundColor: "#e6a7c4",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 24,
  },
  boutonTexte: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onContinuer: () => void;
};

export default function CarteBienvenue({ onContinuer }: Props) {
  return (
    <View style={styles.carte}>
      <Text style={styles.patte}>🐾</Text>

      <Text style={styles.titre}>Coucou,{"\n"}je suis Fifi. 💛</Text>

      <Text style={styles.texte}>
        Bienvenue dans mon petit panier qui deviendra le tien 🧺.
      </Text>
      <Text style={styles.texte}>
        Dépose-y ce que tu veux pour t'alléger, je m'en occupe 🥰
      </Text>

      <TouchableOpacity style={styles.bouton} onPress={onContinuer} activeOpacity={0.8}>
        <Text style={styles.boutonTexte}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  carte: {
    backgroundColor: "#FBF3E9",
    borderRadius: 28,
    paddingTop: 28,
    paddingBottom: 24,
    paddingHorizontal: 26,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  patte: {
    fontSize: 22,
    marginBottom: 8,
  },
  titre: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4A3B32",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 16,
  },
  texte: {
    fontSize: 15,
    color: "#6B5D53",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 4,
  },
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
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TitreBienvenue() {
  return (
    <View style={styles.conteneur}>
      <Text style={styles.titre}>Coucou,{"\n"}je suis Fifi. 💛</Text>
      <Text style={styles.texte}>
        Bienvenue dans mon petit panier qui deviendra le tien 🧺.
      </Text>
      <Text style={styles.texte}>
        Dépose-y ce que tu veux pour t'alléger, je m'en occupe 🥰
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  conteneur: {
    alignItems: "center",
    paddingHorizontal: 26,
  },
  titre: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4A3B32",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 12,
  },
  texte: {
    fontSize: 15,
    color: "#6B5D53",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 4,
  },
});
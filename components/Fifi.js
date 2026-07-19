import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

export default function Fifi() {
  return (
    <View style={styles.container}>

      <Image
        source={require("../assets/images/fifi-panier.png")}
        style={styles.image}
      />

      <Text style={styles.message}>
        Coucou 🥰
      </Text>

      <Text style={styles.sousTexte}>
        Dépose ce que tu veux.
        {"\n"}
        Je veille dessus.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 25,
  },

  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
  },

  message: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "600",
    color: "#4F4F4F",
  },

  sousTexte: {
    marginTop: 8,
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    lineHeight: 24,
  },
});
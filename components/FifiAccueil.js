import React from "react";
import { Image, StyleSheet } from "react-native";

export default function FifiAccueil() {
  return (
    <Image
      source={require("../assets/characters/Fifi/poses/assise.png")}
      style={styles.image}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
});
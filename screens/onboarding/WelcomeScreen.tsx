import React from "react";
import { StyleSheet, Text, ImageBackground } from "react-native";

import SceneAccueil from "../../components/onboarding/SceneAccueil";

export default function WelcomeScreen() {
  return (
    <ImageBackground
      source={require("../../assets/welcome/fond_accueil.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Text style={styles.text}>
        Bienvenue chez Fifi !
      </Text>

      <SceneAccueil />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 90,
    textAlign: "center",
    fontSize: 28,
    color: "#4B4036",
    fontWeight: "600",
  },
});
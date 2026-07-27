import React, { useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

import SceneAccueil from "../../components/onboarding/SceneAccueil";
import BoutonContinuer from "../../components/onboarding/BoutonContinuer";

type Props = {
  onTerminerOnboarding?: () => void;
};

export default function WelcomeScreen({ onTerminerOnboarding }: Props) {
  const [pretPourCarte, setPretPourCarte] = useState(false);

  return (
    <ImageBackground
      source={require("../../assets/welcome/fond_accueil.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <Text style={styles.text}>Bienvenue chez Fifi !</Text>

      {pretPourCarte && (
        <View style={styles.sousTitreConteneur}>
          <Text style={styles.sousTitre}>
            Bienvenue dans mon petit panier qui deviendra le tien 🧺.
          </Text>
          <Text style={styles.sousTitre}>
            Dépose-y ce que tu veux pour t'alléger, je m'en occupe 🥰
          </Text>
        </View>
      )}

      <SceneAccueil onPretPourCarte={() => setPretPourCarte(true)} />

      {pretPourCarte && (
        <View style={styles.boutonConteneur}>
          <BoutonContinuer onPress={() => onTerminerOnboarding?.()} />
        </View>
      )}
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
  sousTitreConteneur: {
    marginTop: 12,
    paddingHorizontal: 26,
  },
  sousTitre: {
    fontSize: 15,
    color: "#3D2F26",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 4,
  },
  boutonConteneur: {
    alignItems: "center",
    marginBottom: 40,
  },
});
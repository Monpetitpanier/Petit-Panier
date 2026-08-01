import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SceneAccueil from "../../components/onboarding/SceneAccueil";
import BoutonContinuer from "../../components/onboarding/BoutonContinuer";

const HAUTEUR_ZONE_TEXTE = 180;

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const [pretPourCarte, setPretPourCarte] = useState(false);

  return (
    <ImageBackground
      source={require("../../assets/welcome/fond_accueil.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.zoneTexte}>
          <Text style={styles.text}>Bienvenue chez Fifi !</Text>

          <View style={styles.sousTitreConteneur}>
            <Text style={[styles.sousTitre, { opacity: pretPourCarte ? 1 : 0 }]}>
              Bienvenue dans mon petit panier qui deviendra le tien 🧺.
            </Text>
            <Text style={[styles.sousTitre, { opacity: pretPourCarte ? 1 : 0 }]}>
              Dépose-y ce que tu veux pour t'alléger, je m'en occupe 🥰
            </Text>
          </View>
        </View>

        <View pointerEvents={pretPourCarte ? "none" : "auto"}>
          <SceneAccueil onPretPourCarte={() => setPretPourCarte(true)} />
        </View>

        <View style={styles.boutonConteneur} pointerEvents={pretPourCarte ? "auto" : "none"}>
          <View style={{ opacity: pretPourCarte ? 1 : 0 }}>
            <BoutonContinuer onPress={() => navigation.navigate("Intro" as never)} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  zoneTexte: {
    height: HAUTEUR_ZONE_TEXTE,
    justifyContent: "flex-start",
    paddingTop: 40,
  },
  text: {
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
    marginTop: 7,
    minHeight: 60,
    justifyContent: "center",
    zIndex: 10,
    elevation: 10,
  },
});
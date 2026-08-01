import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import SceneAccueil from "../../components/onboarding/SceneAccueil";
import BoutonContinuer from "../../components/onboarding/BoutonContinuer";

const HAUTEUR_ZONE_TEXTE = 120;

export default function IntroScreen() {
  const navigation = useNavigation();
  const [pretPourCarte, setPretPourCarte] = useState(false);

  return (
    <ImageBackground
      source={require("../../assets/welcome/fond_accueil.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.zoneTexte}>
            <View style={{ opacity: pretPourCarte ? 1 : 0 }}>
              <Text style={styles.texte}>
                Avant de commencer, j'aimerais apprendre à te connaître un tout petit peu.
              </Text>
              <Text style={styles.texte}>
                Comme ça, je pourrai vraiment prendre soin de ton petit panier.
              </Text>

              <Text style={styles.decor}>🐾  ♥  🐾</Text>

              <View style={{ marginTop: 400 }}>
                <BoutonContinuer
                  texte="Commençons"
                  onPress={() => navigation.navigate("Name" as never)}
                />
              </View>
            </View>
          </View>

          <SceneAccueil jouerVideoIntro={false} onPretPourCarte={() => setPretPourCarte(true)} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  zoneTexte: {
    height: HAUTEUR_ZONE_TEXTE,
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  texte: {
    fontSize: 17,
    color: "#3D2F26",
    textAlign: "center",
    lineHeight: 30,
    marginBottom: 6,
  },
  decor: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 16,
  },
});
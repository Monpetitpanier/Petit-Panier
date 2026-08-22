import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Illustration,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CarteSection from "../components/CarteSection";
import { usePreferences } from "../contexts/PreferencesContext";
import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function Plus() {
  const navigation = useNavigation();
  const { onglets } = usePreferences();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titre}>Plus</Text>

        {onglets.maison && (
          <CarteSection
            illustration={require("../assets/illustrations/maison/entretien_maison")}
            styleIllustration="illustrationMaison"
            titre="Maison"
            sousTitre="Organiser et prendre soin de son chez-soi."
            onPress={() => navigation.navigate("Maison")}
          />
        )}

        {onglets.sante && (
          <CarteSection
            illustration={require("../assets/illustrations/sante/bouton_sante.png")}
            styleIllustration="illustrationSante"
            titre="Santé"
            sousTitre="Prendre soin de sa santé au quotidien."
            onPress={() => navigation.navigate("Sante")}
          />
        )}

        {onglets.bienEtre && (
          <CarteSection
            illustration={require("../assets/illustrations/bienetre/")}
            styleIllustration="illustrationBienEtre"
            titre="Bien-être"
            sousTitre="Prendre soin de soi, en douceur."
            onPress={() => navigation.navigate("BienEtre")}
          />
        )}

        {onglets.univers && (
          <CarteSection
            illustration={require("../assets/illustrations/univers/bouton_univers.png")}
            styleIllustration="illustrationUnivers"
            titre="Univers"
            sousTitre="Retrouver ses espaces de vie."
            onPress={() => navigation.navigate("Univers")}
          />
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },

  titre: {
    marginBottom: Spacing.lg,
    color: Colors.text,
    fontSize: 30,
    fontWeight: "700",
  },
});
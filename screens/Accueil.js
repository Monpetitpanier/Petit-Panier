import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
} from "react-native";

import HeaderAccueil from "../components/HeaderAccueil";
import CarteFifi from "../components/CarteFifi";
import BoutonPanier from "../components/BoutonPanier";
import CarteJournee from "../components/CarteJournee";
import CarteCitation from "../components/CarteCitation";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function Accueil({ navigation }) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HeaderAccueil />

      <CarteFifi />

      <BoutonPanier
        onPress={() => navigation.navigate("Panier")}
      />

      <CarteJournee />

      <CarteCitation />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingTop: 50,
    paddingBottom: 50,
  },
});
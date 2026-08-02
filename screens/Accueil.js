import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
} from "react-native";

import CarteFifi from "../components/CarteFifi";
import BoutonPanier from "../components/BoutonPanier";
import CarteCitation from "../components/CarteCitation";
import CarteJournee from "../components/CarteJournee";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function Accueil() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
    

     <CarteFifi />

<View style={styles.contenuAvecMarges}>
  <BoutonPanier />
  <CarteCitation />
  <CarteJournee />
</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

 content: {
  paddingTop: 20,
  paddingBottom: 50,
},

contenuAvecMarges: {
  paddingHorizontal: Spacing.lg,
},
});
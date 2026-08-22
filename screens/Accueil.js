import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CarteFifi from "../components/CarteFifi";
import BoutonPanier from "../components/BoutonPanier";
import CarteCitation from "../components/CarteCitation";
import CarteJournee from "../components/CarteJournee";
import CarteCoupDOeil from "../components/CarteCoupDOeil";
import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function Accueil() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.boutonReglages}
        onPress={() => navigation.navigate("Parametres")}
      >
        <MaterialCommunityIcons
          name="cog-outline"
          size={25}
          color={Colors.subtitle}
        />
      </TouchableOpacity>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >


       <CarteFifi />

  <View style={styles.contenuAvecMarges}>
    <BoutonPanier />

    <View style={styles.ligneCartes}>
      <CarteJournee />
      <CarteCoupDOeil />
    </View>

    <CarteCitation />
  </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  scroll: {
    flex: 1,
  },

 content: {
  paddingTop: 20,
  paddingBottom: 50,
},

ligneCartes: {
  flexDirection: "row",
  gap: 12,
},

contenuAvecMarges: {
  paddingHorizontal: Spacing.lg,
},

  boutonReglages: {
    position: "absolute",
    top: Spacing.md,
    right: Spacing.lg,

    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Colors.card,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,

    zIndex: 10,
  },
});

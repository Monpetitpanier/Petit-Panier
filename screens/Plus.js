import React from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CarteSection from "../components/CarteSection";
import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function Plus() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.titre}>Plus</Text>

        <CarteSection
          icone="🌿"
          titre="Bien-être"
          sousTitre="Prendre soin de soi, en douceur."
          onPress={() => navigation.navigate("BienEtre")}
        />

        <CarteSection
          icone="🌍"
          titre="Univers"
          sousTitre="Retrouver ses espaces de vie."
          onPress={() => navigation.navigate("Univers")}
        />

        <CarteSection
          icone="⚙️"
          titre="Paramètres"
          sousTitre="Personnaliser Petit Panier."
          onPress={() =>
            Alert.alert(
              "Paramètres",
              "Cette section sera bientôt disponible."
            )
          }
        />
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
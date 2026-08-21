import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import CarteSection from "../../components/CarteSection";
import { usePreferences } from "../../contexts/PreferencesContext";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function BienEtre() {
  const navigation = useNavigation();

  const { contenuBienEtre } = usePreferences();

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={Colors.text}
        />
      </TouchableOpacity>
      
      <CarteSection
        icone="🌸"
        titre="Respiration"
        sousTitre="Respirer quelques minutes pour retrouver son calme."
        onPress={() => navigation.navigate("Respiration")}
      />

      <CarteSection
        icone="😊"
        titre="Gratitude"
        sousTitre="Conserver les petits bonheurs du quotidien."
        onPress={() => navigation.navigate("Gratitude")}
      />

      {contenuBienEtre === "pensees" && (
        <CarteSection
          icone="💭"
          titre="Pensées positives"
          sousTitre="Retrouver une pensée qui fait du bien."
          onPress={() =>
            navigation.navigate("PenseesPositives")
          }
        />
      )}

      {contenuBienEtre === "paroles" && (
        <CarteSection
          icone="📖"
          titre="Paroles"
          sousTitre="Prendre un moment pour lire et méditer."
          onPress={() =>
            navigation.navigate("Paroles")
          }
        />
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  boutonRetour: {
    alignSelf: "flex-start",
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
  },
});
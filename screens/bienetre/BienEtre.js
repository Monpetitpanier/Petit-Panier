import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CarteSection from "../../components/CarteSection";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function BienEtre() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
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

      <CarteSection
        icone="🙏"
        titre="Prière"
        sousTitre="Prendre un moment de recueillement et de paix."
        onPress={() => navigation.navigate("Priere")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
});
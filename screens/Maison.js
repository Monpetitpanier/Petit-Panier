import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import CarteSection from "../components/CarteSection";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function Maison() {
  const navigation = useNavigation();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.entete}>
        <TouchableOpacity
          style={styles.boutonReglages}
          onPress={() => navigation.navigate("ReglagesRappelsMaison")}
        >
          <MaterialCommunityIcons name="cog-outline" size={26} color={Colors.subtitle} />
        </TouchableOpacity>

        <View style={styles.ligneTitre}>
          <MaterialCommunityIcons
            name="home-outline"
            size={38}
            color={Colors.text}
          />
          <Text style={styles.titre}>Maison</Text>
        </View>

        <Text style={styles.accroche}>
          Tout pour la maison, bien rangé avec Fifi.
        </Text>

        <Image
          source={require("../assets/characters/Fifi/poses/maison_fifi.png")}
          style={styles.imageFifi}
          resizeMode="contain"
        />
      </View>

      <CarteSection
        icone="🛒"
        titre="Liste de courses"
        sousTitre="Les essentiels à ne pas oublier"
        onPress={() => navigation.navigate("ListeCoursesMaison")}
        afficherChevron
      />

      <CarteSection
        icone="🧹"
        titre="Ménage"
        sousTitre="Planifier mes tâches"
        onPress={() => navigation.navigate("MenageMaison")}
        afficherChevron
      />

      <CarteSection
        icone="🛠️"
        titre="Entretien"
        sousTitre="Petits travaux, entretien annuel"
        onPress={() => navigation.navigate("EntretienMaison")}
        afficherChevron
      />

      <CarteSection
        icone="📄"
        titre="Garanties"
        sousTitre="Documents et garanties"
        onPress={() => navigation.navigate("GarantiesMaison")}
        afficherChevron
      />

      <CarteSection
        icone="📌"
        titre="To-do"
        sousTitre="À prévoir sur l'année (cadeaux, vacances...)"
        onPress={() => navigation.navigate("ToDoMaison")}
        afficherChevron
      />
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
    paddingTop: Spacing.xxl,
    paddingBottom: 50,
  },

  entete: {
    alignItems: "center",
    marginBottom: Spacing.sm,
  },

  boutonReglages: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: Spacing.xs,
    zIndex: 1,
  },

  ligneTitre: {
    flexDirection: "row",
    alignItems: "center",
  },

  titre: {
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: Spacing.sm,
    color: Colors.text,
  },

  accroche: {
    marginTop: Spacing.md,
    color: Colors.subtitle,
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
  },

  imageFifi: {
    width: 240,
    height: 220,
    marginTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
});
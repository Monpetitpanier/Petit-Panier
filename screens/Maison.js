import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
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

      {/* ===================================== */}
      {/* SCÈNE MAISON : DÉCOR + FIFI */}
      {/* ===================================== */}

      <View style={styles.scene}>

        {/* Décor de la pièce */}

        <Image
          source={require("../assets/environment/onglet_maison_fifi.png")}
          style={styles.decor}
          resizeMode="contain"
        />

        {/* Léger voile pour garder le texte lisible */}

        <View style={styles.voile} />


        {/* Bouton paramètres */}

        <View style={styles.boutonParametres}>
          <MaterialCommunityIcons
            name="cog-outline"
            size={27}
            color={Colors.subtitle}
          />
        </View>


        {/* Titre */}

        <View style={styles.titreBloc}>

          <View style={styles.ligneTitre}>

            <MaterialCommunityIcons
              name="home-outline"
              size={38}
              color={Colors.text}
            />

          </View>

          <Text style={styles.accroche}>
            Tout pour la maison,{"\n"}
            bien rangé avec Fifi.
          </Text>

        </View>


        {/* Fifi */}

        <Image
          source={require(
            "../assets/characters/Fifi/poses/maison_fifi.png"
          )}
          style={styles.fifi}
          resizeMode="contain"
        />

      </View>


      {/* ===================================== */}
      {/* CATÉGORIES */}
      {/* ===================================== */}

      <View style={styles.categories}>

        <CarteSection
          icone="🛒"
          titre="Liste de courses"
          sousTitre="Les essentiels à ne pas oublier"
          onPress={() =>
            navigation.navigate("ListeCoursesMaison")
          }
          afficherChevron
        />

        <CarteSection
          icone="🛍️"
          titre="Produits à racheter"
          sousTitre="Les achats à renouveler"
          onPress={() =>
            navigation.navigate("ProduitsARacheterMaison")
          }
          afficherChevron
        />

        <CarteSection
          icone="🧹"
          titre="Ménage"
          sousTitre="Planifier mes tâches"
          onPress={() =>
            navigation.navigate("MenageMaison")
          }
          afficherChevron
        />

        <CarteSection
          icone="🛠️"
          titre="Entretien"
          sousTitre="Petits travaux, entretien"
          onPress={() =>
            navigation.navigate("EntretienMaison")
          }
          afficherChevron
        />

        <CarteSection
          icone="📄"
          titre="Garanties"
          sousTitre="Documents et garanties"
          onPress={() =>
            navigation.navigate("GarantiesMaison")
          }
          afficherChevron
        />

        <CarteSection
          icone="📌"
          titre="To-do"
          sousTitre="À prévoir sur l'année (cadeaux, vacances...)"
          onPress={() =>
            navigation.navigate("ToDoMaison")
          }
          afficherChevron
        />

      </View>

    </ScrollView>
  );
}


const styles = StyleSheet.create({

  // =====================================
  // ÉCRAN
  // =====================================

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingBottom: 30,
  },


  // =====================================
  // SCÈNE
  // =====================================

  scene: {
    height: 410,
    position: "relative",
    overflow: "hidden",
    backgroundColor: Colors.background,
  },


  decor: {
    position: "absolute",

    top: 10,
    left: 0,

    width: "105%",
    height: "105%",
  },


  voile: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor:
      "rgba(248, 245, 239, 0.12)",
  },


  // =====================================
  // PARAMÈTRES
  // =====================================

  boutonParametres: {
    position: "absolute",

    top: 25,
    right: 18,

    width: 58,
    height: 58,

    borderRadius: 29,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor:
      "rgba(255,255,255,0.82)",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,

    zIndex: 10,
  },


  // =====================================
  // TITRE
  // =====================================

  titreBloc: {
    position: "absolute",

    top: 90,
    left: 50,

    zIndex: 6,
  },


  ligneTitre: {
    flexDirection: "row",
    alignItems: "center",
  },


  titre: {
    fontSize: 30,
    fontWeight: "700",

    marginLeft: Spacing.sm,

    color: Colors.text,
  },


  accroche: {
    marginTop: Spacing.md,

    color: Colors.text,

    fontSize: 17,
    lineHeight: 25,

    textAlign: "left",
  },


  // =====================================
  // FIFI
  // =====================================

  fifi: {
    position: "absolute",

    width: 230,
    height: 220,

    right: 90,
    bottom: 5,

    zIndex: 5,
  },


  // =====================================
  // CATÉGORIES
  // =====================================

  categories: {
    paddingHorizontal: Spacing.lg,

    marginTop: -10,
  },

});
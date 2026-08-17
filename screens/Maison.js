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

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function Maison() {
  const navigation = useNavigation();

const cartes = [
  {
    titre: "Liste de courses",
    sousTitre: "Les essentiels à ne pas oublier",
    image: require("../assets/images/panier_courses.png"),
    destination: "ListeCoursesMaison",
  },
  {
    titre: "Ménage",
    sousTitre: "Planifier mes tâches",
    image: require("../assets/images/seau_menage.png"),
    destination: "MenageMaison",
  },
  {
    titre: "Entretien",
    sousTitre: "Petits travaux, entretien annuel",
    image: require("../assets/images/entretien_maison.png"),
    destination: "EntretienMaison",
  },
  {
    titre: "Garanties",
    sousTitre: "Documents et garanties",
    image: require("../assets/images/garanties.png"),
    destination: "GarantiesMaison",
  },
  {
    titre: "To-do",
    sousTitre: "À prévoir sur l'année (cadeaux, vacances...)",
    image: require("../assets/images/todo_liste.png"),
    destination: "ToDoMaison",
  },
];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* ======================================= */}
      {/* EN-TÊTE */}
      {/* ======================================= */}

      <View style={styles.entete}>

        <TouchableOpacity
          style={styles.boutonReglages}
          onPress={() =>
            navigation.navigate("ReglagesRappelsMaison")
          }
        >
          <MaterialCommunityIcons
            name="cog-outline"
            size={25}
            color={Colors.subtitle}
          />
        </TouchableOpacity>


        <View style={styles.ligneTitre}>

          <MaterialCommunityIcons
            name="home-outline"
            size={36}
            color={Colors.text}
          />

          <Text style={styles.titre}>
            Maison
          </Text>

        </View>


        <Text style={styles.accroche}>
          Tout pour la maison,
          {"\n"}
          bien rangé avec Fifi.
        </Text>


        {/* =================================== */}
        {/* DÉCOR + FIFI */}
        {/* =================================== */}

       <View style={styles.sceneFifi}>

  <Image
    source={require("../assets/environment/onglet_maison_fifi.png")}
    style={styles.imageDecor}
    resizeMode="cover"
  />

  <Image
    source={require("../assets/characters/Fifi/poses/maison_fifi.png")}
    style={styles.imageFifi}
    resizeMode="contain"
  />

</View>

</View>

      {/* ======================================= */}
      {/* CARTES MAISON */}
      {/* ======================================= */}

      <View style={styles.listeCartes}>

        {cartes.map((carte) => (

          <TouchableOpacity
            key={carte.destination}
            style={styles.carte}
            activeOpacity={0.82}
            onPress={() =>
              navigation.navigate(carte.destination)
            }
          >

            {/* Icône */}

            <View style={styles.bulleIcone}>
  <Image
    source={carte.image}
    style={styles.imageCarte}
    resizeMode="contain"
  />
</View>
            {/* Textes */}

            <View style={styles.contenuCarte}>

              <Text style={styles.titreCarte}>
                {carte.titre}
              </Text>

              <Text style={styles.sousTitreCarte}>
                {carte.sousTitre}
              </Text>

            </View>


            {/* Chevron */}

            <MaterialCommunityIcons
              name="chevron-right"
              size={28}
              color={Colors.subtitle}
            />

          </TouchableOpacity>

        ))}

      </View>

    </ScrollView>
  );
}


// =======================================
// STYLES
// =======================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },


  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 45,
  },


  // =====================================
  // EN-TÊTE
  // =====================================

  entete: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },


  boutonReglages: {
    position: "absolute",
    top: 0,
    right: 0,

    width: 48,
    height: 48,

    borderRadius: 24,

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

    zIndex: 5,
  },


  ligneTitre: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xs,
  },


  titre: {
    fontSize: 30,
    fontWeight: "700",
    marginLeft: Spacing.sm,
    color: Colors.text,
  },


  accroche: {
    marginTop: Spacing.sm,

    color: Colors.subtitle,
    fontSize: 17,
    lineHeight: 24,

    textAlign: "center",
  },


  // =====================================
  // FIFI
  // =====================================

 sceneFifi: {
  width: "115%",
  height: 235,

  marginTop: Spacing.xs,
  marginBottom: Spacing.xs,

  position: "relative",
  overflow: "hidden",
  borderRadius: 24,
},

imageDecor: {
  position: "absolute",

  width: "100%",
  height: "110%",

  top: -10,
  left: 0,
},

imageFifi: {
  position: "absolute",

  width: 200,
  height: 190,

  bottom: -25,
  alignSelf: "center",
},


  // =====================================
  // CARTES
  // =====================================

  listeCartes: {
    gap: Spacing.sm,
  },


  carte: {
    minHeight: 20,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.card,

    borderRadius: 20,

    paddingVertical: 6,
    paddingHorizontal: 8,

    shadowColor: "#000",
    shadowOpacity: 0.055,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },


  // =====================================
  // ICÔNE
  // =====================================

  bulleIcone: {
  width: 56,
  height: 56,

  borderRadius: 28,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: Colors.background,

  marginRight: 14,
},

imageCarte: {
  width: 52,
  height: 52,
},

  // =====================================
  // TEXTE
  // =====================================

  contenuCarte: {
    flex: 1,
    justifyContent: "center",
  },


  titreCarte: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },


  sousTitreCarte: {
    marginTop: 3,

    fontSize: 13,
    lineHeight: 18,

    color: Colors.subtitle,
  },

});
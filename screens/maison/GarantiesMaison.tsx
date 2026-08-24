import React from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";


export default function GarantiesMaison() {

  const navigation = useNavigation();


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
          style={styles.boutonRetour}
          onPress={() => navigation.goBack()}
        >

          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={Colors.text}
          />

        </TouchableOpacity>


        <Text style={styles.titre}>
          Garanties
        </Text>


        <Text style={styles.sousTitre}>
          Garde un œil sur tes achats,
          {"\n"}
          Fifi pense aux échéances.
        </Text>

      </View>


      {/* ======================================= */}
      {/* ILLUSTRATION */}
      {/* ======================================= */}

      <View style={styles.zoneIllustration}>

        <Image
          source={require(
            "../../assets/illustrations/maison/garanties.png"
          )}
          style={styles.illustration}
          resizeMode="contain"
        />

      </View>


      {/* ======================================= */}
      {/* ÉTAT VIDE */}
      {/* ======================================= */}

      <View style={styles.etatVide}>

        <Text style={styles.titreVide}>
          Aucune garantie pour le moment
        </Text>

        <Text style={styles.texteVide}>
          Tu peux ajouter ici les achats que tu
          souhaites garder à l'œil.
        </Text>

      </View>


      {/* ======================================= */}
      {/* BOUTON AJOUTER */}
      {/* ======================================= */}

      <TouchableOpacity
        style={styles.boutonAjouter}
        activeOpacity={0.85}
        onPress={() => {
          // On branchera l'ajout ensuite
        }}
      >

        <MaterialCommunityIcons
          name="plus"
          size={24}
          color="#FFFFFF"
        />

        <Text style={styles.texteBouton}>
          Ajouter une garantie
        </Text>

      </TouchableOpacity>

    </ScrollView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },


  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: 50,
  },


  // =====================================
  // EN-TÊTE
  // =====================================

  entete: {
    alignItems: "center",
    marginBottom: Spacing.sm,
  },


  boutonRetour: {
    position: "absolute",
    top: 0,
    left: 0,

    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Colors.card,
  },


  titre: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },


  sousTitre: {
    marginTop: Spacing.sm,

    fontSize: 16,
    lineHeight: 23,

    color: Colors.subtitle,
    textAlign: "center",
  },


  // =====================================
  // ILLUSTRATION
  // =====================================

  zoneIllustration: {
    alignItems: "center",
    marginVertical: Spacing.lg,
  },


  illustration: {
    width: 150,
    height: 150,
  },


  // =====================================
  // ÉTAT VIDE
  // =====================================

  etatVide: {
    alignItems: "center",

    backgroundColor: Colors.card,

    borderRadius: 22,

    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,

    marginBottom: Spacing.lg,
  },


  titreVide: {
    fontSize: 18,
    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",
  },


  texteVide: {
    marginTop: Spacing.sm,

    fontSize: 15,
    lineHeight: 22,

    color: Colors.subtitle,

    textAlign: "center",
  },


  // =====================================
  // BOUTON AJOUTER
  // =====================================

  boutonAjouter: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Colors.secondary,

    borderRadius: 18,

    paddingVertical: 15,

    gap: 8,
  },


  texteBouton: {
    fontSize: 16,
    fontWeight: "700",

    color: "#FFFFFF",
  },

});
import React from "react";

import {
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSante } from "../contexts/SanteContext";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function Sante() {

  const navigation = useNavigation();

  const {
    traitements,
    medicaments,
    pharmacie,
  } = useSante();


  return (

    <SafeAreaView style={styles.container}>

      {/* ============================= */}
      {/* RETOUR */}
      {/* ============================= */}

      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={28}
          color={Colors.text}
        />
      </TouchableOpacity>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* ============================= */}
        {/* TITRE */}
        {/* ============================= */}

        <Text style={styles.titre}>
          Santé
        </Text>

        <Text style={styles.sousTitre}>
          Prendre soin de soi et de sa petite pharmacie.
        </Text>


        {/* ============================= */}
        {/* TRAITEMENTS */}
        {/* ============================= */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Traitements")
          }
        >

          <Image
            source={
              require(
                "../assets/illustrations/sante/bouton_traitement.png"
              )
            }
            style={styles.illustration}
            resizeMode="contain"
          />


          <View style={styles.texteCarte}>

            <Text style={styles.titreCarte}>
              Traitements
            </Text>

            <Text style={styles.description}>
              {traitements.length === 0
                ? "Aucun traitement en cours."
                : `${traitements.length} traitement${
                    traitements.length > 1
                      ? "s"
                      : ""
                  } en cours.`}
            </Text>

          </View>


          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />

        </TouchableOpacity>


        {/* ============================= */}
        {/* MÉDICAMENTS */}
        {/* ============================= */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Medicaments")
          }
        >

          <Image
            source={
              require(
                "../assets/illustrations/sante/bouton_medicament.png"
              )
            }
            style={styles.illustration}
            resizeMode="contain"
          />


          <View style={styles.texteCarte}>

            <Text style={styles.titreCarte}>
              Médicaments
            </Text>

            <Text style={styles.description}>
              {medicaments.length === 0
                ? "Votre stock est vide."
                : `${medicaments.length} médicament${
                    medicaments.length > 1
                      ? "s"
                      : ""
                  } en stock.`}
            </Text>

          </View>


          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />

        </TouchableOpacity>


        {/* ============================= */}
        {/* PHARMACIE */}
        {/* ============================= */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Pharmacie")
          }
        >

          <Image
            source={
              require(
                "../assets/illustrations/sante/bouton_pharmacie.png"
              )
            }
            style={styles.illustration}
            resizeMode="contain"
          />


          <View style={styles.texteCarte}>

            <Text style={styles.titreCarte}>
              Pharmacie
            </Text>

            <Text style={styles.description}>
              {pharmacie.length === 0
                ? "Aucun produit enregistré."
                : `${pharmacie.length} produit${
                    pharmacie.length > 1
                      ? "s"
                      : ""
                  } enregistré${
                    pharmacie.length > 1
                      ? "s"
                      : ""
                  }.`}
            </Text>

          </View>


          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />

        </TouchableOpacity>

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
    paddingBottom: Spacing.xl,
  },


  boutonRetour: {
    marginLeft: Spacing.md,
    marginTop: Spacing.sm,

    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 22,
  },


  titre: {
    marginTop: Spacing.md,

    fontSize: 30,
    fontWeight: "700",

    color: Colors.text,
  },


  sousTitre: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,

    fontSize: 16,
    lineHeight: 23,

    color: Colors.subtitle,
  },


  /* ============================= */
  /* CARTES */
  /* ============================= */

  carte: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.card,

    borderRadius: Radius.large,

    padding: Spacing.md,
    marginBottom: Spacing.md,

    ...Shadow.card,
  },


  /* ============================= */
  /* ILLUSTRATIONS */
  /* ============================= */

  illustration: {
    width: 78,
    height: 78,

    marginRight: Spacing.md,
  },


  texteCarte: {
    flex: 1,
  },


  titreCarte: {
    fontSize: 18,
    fontWeight: "700",

    color: Colors.text,
  },


  description: {
    marginTop: 4,

    fontSize: 14,
    lineHeight: 20,

    color: Colors.subtitle,
  },

});
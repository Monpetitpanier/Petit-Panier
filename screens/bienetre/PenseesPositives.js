import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBienEtre } from "../../contexts/BienEtreContext";

import { Pensees } from "../../data/pensees";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";
import { Shadow } from "../../theme/shadow";


export default function PenseesPositives() {

  const navigation = useNavigation();

  const [index, setIndex] = useState(0);

  const {
    basculerPenseeFavorite,
    estPenseeFavorite,
  } = useBienEtre();


  const penseeActuelle =
    Pensees[index];


  const estFavorite =
    estPenseeFavorite(
      penseeActuelle
    );


  function changerPensee() {

    setIndex(
      (ancienIndex) =>
        (ancienIndex + 1) %
        Pensees.length
    );

  }


  return (

    <SafeAreaView
      style={styles.container}
    >

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* ================================= */}
        {/* RETOUR */}
        {/* ================================= */}

        <TouchableOpacity
          style={styles.boutonRetour}
          onPress={() =>
            navigation.goBack()
          }
        >

          <MaterialCommunityIcons
            name="arrow-left"
            size={28}
            color={Colors.text}
          />

        </TouchableOpacity>


        {/* ================================= */}
        {/* TITRE */}
        {/* ================================= */}

        <Text style={styles.titre}>
          Pensées positives
        </Text>


        <Text style={styles.sousTitre}>
          Des pensées qui apaisent, inspirent et élèvent le cœur.
        </Text>


        {/* ================================= */}
        {/* CARTE */}
        {/* ================================= */}

        <View style={styles.carte}>

          <Text style={styles.pensee}>
            « {penseeActuelle} »
          </Text>


          <View style={styles.actions}>

            <TouchableOpacity
              onPress={() =>
                basculerPenseeFavorite(
                  penseeActuelle
                )
              }
              style={styles.boutonIcone}
              activeOpacity={0.7}
            >

              <Text style={styles.icone}>
                {
                  estFavorite
                    ? "⭐"
                    : "☆"
                }
              </Text>

            </TouchableOpacity>


            <TouchableOpacity
              onPress={
                changerPensee
              }
              style={styles.bouton}
              activeOpacity={0.8}
            >

              <MaterialCommunityIcons
                name="refresh"
                size={21}
                color="#FFFFFF"
              />

              <Text
                style={
                  styles.texteBouton
                }
              >
                Une autre pensée
              </Text>

            </TouchableOpacity>

          </View>

        </View>


        {/* ================================= */}
        {/* FIFI */}
        {/* ================================= */}

        <View
          style={
            styles.fifiContainer
          }
        >

          <Image
            source={require(
              "../../assets/illustrations/bienetre/fifi_lecture.png"
            )}
            style={styles.fifi}
            resizeMode="contain"
          />

        </View>

      </ScrollView>

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,

    backgroundColor:
      Colors.background,
  },


  scrollContent: {
    padding:
      Spacing.lg,

    paddingBottom:
      Spacing.md,
  },


  /* ===================================
     RETOUR
     =================================== */

  boutonRetour: {
    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems:
      "center",

    justifyContent:
      "center",

    marginBottom:
      Spacing.md,
  },


  /* ===================================
     TITRE
     =================================== */

  titre: {
    fontSize: 28,

    fontWeight:
      "700",

    color:
      Colors.text,

    marginBottom:
      Spacing.sm,
  },


  sousTitre: {
    fontSize: 16,

    color:
      Colors.subtitle,

    lineHeight: 24,

    marginBottom:
      Spacing.xl,
  },


  /* ===================================
     CARTE
     =================================== */

  carte: {
    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    paddingVertical:
      Spacing.lg,

    paddingHorizontal:
      Spacing.lg,

    ...Shadow.card,
  },


  pensee: {
    fontSize: 20,

    lineHeight: 25,

    fontStyle:
      "italic",

    color:
      Colors.text,

    textAlign:
      "center",
  },


  actions: {
    flexDirection:
      "row",

    alignItems:
      "center",

    marginTop:
      Spacing.lg,
  },


  boutonIcone: {
    padding: 8,

    marginRight:
      Spacing.md,
  },


  icone: {
    fontSize: 26,
  },


  bouton: {
    flex: 1,

    paddingVertical: 10,

    borderRadius: 20,

    backgroundColor:
      Colors.secondary,

    alignItems:
      "center",

    justifyContent:
      "center",

    flexDirection:
      "row",

    gap: 8,
  },


  texteBouton: {
    color:
      "#FFFFFF",

    fontSize: 15,

    fontWeight:
      "600",
  },


  /* ===================================
     FIFI
     =================================== */

  fifiContainer: {
    width:
      "100%",

    alignItems:
      "center",

    marginTop: 0,

    marginBottom:
      Spacing.sm,
  },


  fifi: {
    width:
      "100%",

    height: 320,
  },

});
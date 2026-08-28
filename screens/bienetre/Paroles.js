import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";
import { Shadow } from "../../theme/shadow";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { usePreferences } from "../../contexts/PreferencesContext";

import {
  ParolesBible,
  ParolesCoran,
  ParolesTorah,
} from "../../data/paroles";


const parolesParLivre = {
  bible: ParolesBible,
  coran: ParolesCoran,
  torah: ParolesTorah,
};


export default function Paroles() {

  const navigation = useNavigation();

  const { livreParoles } =
    usePreferences();

  const paroles =
    parolesParLivre[livreParoles] ??
    ParolesBible;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [livreParoles]);

  const paroleActuelle =
    paroles[index];


  function changerParole() {

    setIndex((ancienIndex) =>
      (ancienIndex + 1) %
      paroles.length
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


        <Text style={styles.titre}>
          Paroles
        </Text>


        <Text style={styles.sousTitre}>
          Des paroles qui apaisent, inspirent et élèvent le cœur.
        </Text>


        {/* ================================= */}
        {/* CHOIX DU LIVRE */}
        {/* ================================= */}

        <TouchableOpacity
          style={styles.choixLivre}
          onPress={() =>
            navigation.navigate(
              "ChoixLivreParoles"
            )
          }
        >

          <View
            style={styles.choixLivreGauche}
          >

            <MaterialCommunityIcons
              name="book-open-variant"
              size={22}
              color="#8BA888"
            />

            <View>

              <Text
                style={
                  styles.choixLivreTitre
                }
              >

                {
                  livreParoles === "bible"
                    ? "La Bible"
                    : livreParoles === "coran"
                    ? "Le Coran"
                    : livreParoles === "torah"
                    ? "La Torah"
                    : "Choisir mon livre"
                }

              </Text>


              <Text
                style={
                  styles.choixLivreSousTitre
                }
              >
                Appuyer pour modifier
              </Text>

            </View>

          </View>


          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color={Colors.subtitle}
          />

        </TouchableOpacity>


        {/* ================================= */}
        {/* CARTE PAROLE */}
        {/* ================================= */}

        <View style={styles.carte}>

          <Text style={styles.parole}>
            « {paroleActuelle.texte} »
          </Text>


          <Text style={styles.reference}>
            {paroleActuelle.reference}
          </Text>


          <TouchableOpacity
            onPress={changerParole}
            style={styles.bouton}
            activeOpacity={0.8}
          >

            <MaterialCommunityIcons
              name="refresh"
              size={21}
              color="#FFFFFF"
            />

            <Text
              style={styles.texteBouton}
            >
              Une autre parole
            </Text>

          </TouchableOpacity>

        </View>


        {/* ================================= */}
        {/* FIFI */}
        {/* ================================= */}

        <View style={styles.fifiContainer}>

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
      Spacing.xl,
  },


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
     CHOIX DU LIVRE
     =================================== */

  choixLivre: {
    flexDirection:
      "row",

    alignItems:
      "center",

    justifyContent:
      "space-between",

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.md,

    marginBottom:
      Spacing.lg,

    ...Shadow.card,
  },


  choixLivreGauche: {
    flexDirection:
      "row",

    alignItems:
      "center",

    gap: 12,
  },


  choixLivreTitre: {
    fontSize: 16,

    fontWeight:
      "600",

    color:
      Colors.text,
  },


  choixLivreSousTitre: {
    fontSize: 13,

    color:
      Colors.subtitle,

    marginTop: 2,
  },


  /* ===================================
     CARTE PAROLE
     =================================== */

  carte: {
  backgroundColor:
    Colors.card,

  borderRadius:
    Radius.large,

  paddingVertical:
    Spacing.sm,

  paddingHorizontal:
    Spacing.md,

  ...Shadow.card,
},

  parole: {
    fontSize: 20,

    lineHeight: 25,

    fontStyle:
      "italic",

    color:
      Colors.text,

    textAlign:
      "center",
  },


  reference: {
    fontSize: 15,

    fontWeight:
      "600",

    color:
      Colors.subtitle,

    textAlign:
      "center",

    marginTop:
      Spacing.xs,
  },


  bouton: {
    marginTop:
      Spacing.lg,

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

    marginTop:
     0,

    marginBottom:
      Spacing.md,
  },


  fifi: {
    width:
      "100%",

    height: 320,
  },

});
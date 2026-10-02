import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function CarteSection({
  icone,
  iconeNom,
  illustration,
  styleIllustration,
  titre,
  sousTitre,
  onPress,
  afficherChevron = false,
  bienEtre = false,
  couleurIcone,
  fondIcone,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.carte,
        afficherChevron && styles.carteMaison,
        bienEtre && styles.carteBienEtre,
      ]}
      activeOpacity={0.82}
      onPress={onPress}
    >

      <View style={styles.ligne}>

        {/* ================================= */}
        {/* ILLUSTRATION / ICÔNE */}
        {/* ================================= */}

        <View
          style={[
            styles.zoneIcone,
            bienEtre && styles.zoneIconeBienEtre,
            bienEtre &&
              fondIcone && {
                backgroundColor: fondIcone,
              },
          ]}
        >

          {illustration ? (

            <Image
              source={illustration}
              style={[
                styles.illustration,
                styles[styleIllustration],
              ]}
              resizeMode="contain"
            />

          ) : iconeNom ? (

            <MaterialCommunityIcons
              name={iconeNom}
              size={34}
              color={
                couleurIcone ||
                Colors.secondary
              }
            />

          ) : (

            <Text style={styles.icone}>
              {icone}
            </Text>

          )}

        </View>


        {/* ================================= */}
        {/* TEXTE */}
        {/* ================================= */}

        <View
          style={[
            styles.texte,
            bienEtre && styles.texteBienEtre,
          ]}
        >

          <Text
            style={[
              styles.titre,
              bienEtre && styles.titreBienEtre,
            ]}
          >
            {titre}
          </Text>


          {sousTitre ? (

            <Text
              style={[
                styles.sousTitre,
                bienEtre && styles.sousTitreBienEtre,
              ]}
            >
              {sousTitre}
            </Text>

          ) : null}

        </View>


        {/* ================================= */}
        {/* CHEVRON */}
        {/* ================================= */}

        {afficherChevron ? (

          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={Colors.subtitle}
          />

        ) : null}

      </View>

    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({

  // =====================================
  // CARTE STANDARD
  // =====================================

  carte: {
    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    padding: Spacing.lg,

    marginBottom: Spacing.md,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },


  ligne: {
    flexDirection: "row",
    alignItems: "center",
  },


  // =====================================
  // ZONE ICÔNE
  // =====================================

  zoneIcone: {
    width: 70,
    height: 70,

    borderRadius: 35,

    alignItems: "center",
    justifyContent: "center",

    marginRight: Spacing.md,

    backgroundColor: Colors.background,
  },


  zoneIconeBienEtre: {
    width: 68,
    height: 68,

    borderRadius: 34,
  },


  // =====================================
  // ANCIENNES ILLUSTRATIONS
  // =====================================

  illustration: {
    width: 80,
    height: 80,

    marginRight: Spacing.md,
  },


  illustrationMaison: {
    width: 80,
    height: 80,
  },


  illustrationSante: {
    width: 90,
    height: 90,
  },


  illustrationBienEtre: {
    width: 100,
    height: 100,
  },


  illustrationUnivers: {
    width: 100,
    height: 100,
  },


  icone: {
    fontSize: 30,
    marginRight: 16,
  },


  // =====================================
  // CARTE MAISON
  // =====================================

  carteMaison: {
    backgroundColor: Colors.card,

    borderRadius: 28,

    paddingVertical: Spacing.lg,

    paddingHorizontal: Spacing.lg,
  },


  // =====================================
  // CARTE BIEN-ÊTRE
  // =====================================

  carteBienEtre: {
    backgroundColor: Colors.card,

    borderRadius: 24,

    paddingVertical: 16,

    paddingHorizontal: 16,

    marginBottom: 14,
  },


  // =====================================
  // TEXTE
  // =====================================

  texte: {
    flex: 1,
  },


  texteBienEtre: {
    paddingRight: Spacing.sm,
  },


  titre: {
    fontSize: 16,

    fontWeight: "600",

    color: Colors.text,
  },


  titreBienEtre: {
    fontSize: 19,

    fontWeight: "700",
  },


  sousTitre: {
    marginTop: 4,

    fontSize: 15,

    color: Colors.subtitle,
  },


  sousTitreBienEtre: {
    marginTop: 5,

    fontSize: 14,

    lineHeight: 20,
  },

});
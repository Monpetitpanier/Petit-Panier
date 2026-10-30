
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {/* EN-TÊTE */}

        <View style={styles.entete}>

          <TouchableOpacity
            style={styles.boutonRetour}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={25}
              color={Colors.subtitle}
            />
          </TouchableOpacity>

          <Text style={styles.titre}>
            Santé
          </Text>

          <Text style={styles.sousTitre}>
            Prendre soin de soi et de sa petite pharmacie.
          </Text>

        </View>


        {/* TRAITEMENTS */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Traitements")
          }
        >

          <Image
            source={require("../assets/illustrations/sante/bouton_traitement.png")}
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
                    traitements.length > 1 ? "s" : ""
                  } en cours.`}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />

        </TouchableOpacity>


        {/* MÉDICAMENTS */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Medicaments")
          }
        >

          <Image
            source={require("../assets/illustrations/sante/bouton_medicament.png")}
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
                    medicaments.length > 1 ? "s" : ""
                  } en stock.`}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />

        </TouchableOpacity>


        {/* PHARMACIE */}

        <TouchableOpacity
          style={styles.carte}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate("Pharmacie")
          }
        >

          <Image
            source={require("../assets/illustrations/sante/bouton_pharmacie.png")}
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
                    pharmacie.length > 1 ? "s" : ""
                  } enregistré${
                    pharmacie.length > 1 ? "s" : ""
                  }.`}
            </Text>
          </View>

          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={Colors.subtitle}
          />

        </TouchableOpacity>
        {/* FIFI — BAS DE PAGE */}

        <View style={styles.zoneFifi}>
          <Image
            source={require("../assets/illustrations/sante/fifi_blouse.png")}
            style={styles.imageFifiBas}
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
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  // EN-TÊTE

  entete: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  boutonRetour: {
    position: "absolute",
    top: 0,
    left: 0,

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

  titre: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginTop: Spacing.md,
  },

  sousTitre: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,

    fontSize: 16,
    lineHeight: 23,

    color: Colors.subtitle,
    textAlign: "center",
  },

  /* ============================= */
  /* FIFI — BAS DE PAGE */
  /* ============================= */

  zoneFifi: {
    width: "100%",
    alignItems: "center",
    marginTop: Spacing.md,
  },

  imageFifiBas: {
    width: "100%",
    height: 210,
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
  // FIFI — BAS DE PAGE

  zoneFifi: {
    width: "100%",
    alignItems: "center",
    marginTop: Spacing.md,
  },

  imageFifiBas: {
    width: "100%",
    height: 210,
  },
});

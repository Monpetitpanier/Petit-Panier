import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import CarteSection from "../../components/CarteSection";
import { usePreferences } from "../../contexts/PreferencesContext";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function BienEtre() {
  const navigation = useNavigation();

  const { contenuBienEtre } = usePreferences();

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contenu}
      >

        {/* ================================= */}
        {/* EN-TÊTE */}
        {/* ================================= */}

        <View style={styles.entete}>

          <TouchableOpacity
            style={styles.boutonRetour}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color={Colors.text}
            />
          </TouchableOpacity>

          <View style={styles.titreZone}>

            <Text style={styles.titre}>
              Bien-être
            </Text>

            <Text style={styles.sousTitre}>
              Quelques petits moments{"\n"}
              pour prendre soin de toi.
            </Text>

          </View>

        </View>


        {/* ================================= */}
        {/* CARTES */}
        {/* ================================= */}

        <View style={styles.listeCartes}>

          <CarteSection
            iconeNom="flower-outline"
            titre="Respiration"
            sousTitre="Respirer quelques minutes pour retrouver son calme."
            afficherChevron
            bienEtre
            couleurIcone="#D986A8"
            fondIcone="#FBE8F0"
            onPress={() =>
              navigation.navigate("Respiration")
            }
          />


          <CarteSection
            iconeNom="heart-outline"
            titre="Gratitude"
            sousTitre="Conserver les petits bonheurs du quotidien."
            afficherChevron
            bienEtre
            couleurIcone="#D29B4A"
            fondIcone="#FFF1D7"
            onPress={() =>
              navigation.navigate("Gratitude")
            }
          />


          {contenuBienEtre === "pensees" && (
            <CarteSection
              iconeNom="thought-bubble-outline"
              titre="Pensées positives"
              sousTitre="Retrouver une pensée qui fait du bien."
              afficherChevron
              bienEtre
              couleurIcone="#9A82B7"
              fondIcone="#F1EAF8"
              onPress={() =>
                navigation.navigate("PenseesPositives")
              }
            />
          )}


          {contenuBienEtre === "paroles" && (
            <CarteSection
              iconeNom="book-open-page-variant-outline"
              titre="Paroles"
              sousTitre="Prendre un moment pour lire et méditer."
              afficherChevron
              bienEtre
              couleurIcone="#7D9A83"
              fondIcone="#EAF1EA"
              onPress={() =>
                navigation.navigate("Paroles")
              }
            />
          )}

        </View>


        {/* ================================= */}
        {/* FIFI — BAS DE PAGE */}
        {/* ================================= */}

        <View style={styles.zoneFifi}>

          <Image
            source={require(
              "../../assets/illustrations/bienetre/Fifi_accueil_bienetre.png"
            )}
            style={styles.imageFifi}
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


  contenu: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: 25,
  },


  // =====================================
  // EN-TÊTE
  // =====================================

  entete: {
    marginBottom: Spacing.lg,
  },


  boutonRetour: {
    alignSelf: "flex-start",

    width: 44,
    height: 44,

    borderRadius: 22,

    alignItems: "center",
    justifyContent: "center",

    marginBottom: Spacing.md,
  },


  titreZone: {
    alignItems: "center",
  },


  titre: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,

    textAlign: "center",
  },


  sousTitre: {
    marginTop: Spacing.xs,

    fontSize: 16,
    lineHeight: 23,

    color: Colors.subtitle,

    textAlign: "center",
  },


  // =====================================
  // CARTES
  // =====================================

  listeCartes: {
    width: "100%",
  },


  // =====================================
  // FIFI
  // =====================================

  zoneFifi: {
    width: "100%",

    marginTop: Spacing.sm,

    alignItems: "center",
  },


imageFifi: {
  width: 385,
  height: 200,
},

});
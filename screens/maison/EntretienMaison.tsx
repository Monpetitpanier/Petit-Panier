import React, { useState } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMaison } from "../../contexts/MaisonContext";
import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";


export default function EntretienMaison() {

const navigation = useNavigation();
const { ajouterEntretien, listes } = useMaison();

const [formulaireVisible, setFormulaireVisible] =
  useState(false);

const [texte, setTexte] =
  useState("");

const [frequenceMois, setFrequenceMois] =
  useState(12);


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
          Entretien
        </Text>


        <Text style={styles.sousTitre}>
          Les petites choses à prévoir
          {"\n"}
          pour prendre soin de la maison.
        </Text>

      </View>


      {/* ======================================= */}
      {/* ILLUSTRATION */}
      {/* ======================================= */}

      <View style={styles.zoneIllustration}>

        <Image
          source={require(
            "../../assets/images/entretien_maison.png"
          )}
          style={styles.illustration}
          resizeMode="contain"
        />

      </View>

{/* ======================================= */}
{/* LISTE DES ENTRETIENS */}
{/* ======================================= */}

{listes.entretien.length === 0 ? (

  <View style={styles.etatVide}>

    <Text style={styles.titreVide}>
      Rien à prévoir pour le moment
    </Text>

    <Text style={styles.texteVide}>
      Ajoute les entretiens importants
      pour ne plus avoir à y penser.
    </Text>

  </View>

) : (

  <View style={styles.listeEntretiens}>

    {listes.entretien.map((entretien) => {

      const prochaineDate =
        entretien.prochaineOccurrence
          ? new Date(
              entretien.prochaineOccurrence
            ).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "À définir";

      const frequence =
        entretien.frequenceMois === 6
          ? "Tous les 6 mois"
          : entretien.frequenceMois === 12
          ? "Tous les ans"
          : entretien.frequenceMois === 24
          ? "Tous les 2 ans"
          : entretien.frequenceMois === 60
          ? "Tous les 5 ans"
          : `Tous les ${entretien.frequenceMois} mois`;

      return (

        <View
          key={entretien.id}
          style={styles.carteEntretien}
        >

          <View style={styles.iconeEntretien}>

            <MaterialCommunityIcons
              name="tools"
              size={24}
              color={Colors.secondary}
            />

          </View>

          <View style={styles.contenuEntretien}>

            <Text style={styles.nomEntretien}>
              {entretien.texte}
            </Text>

            <Text style={styles.frequenceEntretien}>
              {frequence}
            </Text>

            <Text style={styles.echeanceEntretien}>
              Prochain entretien : {prochaineDate}
            </Text>

          </View>

        </View>

      );

    })}

  </View>

)}

      {/* ======================================= */}
      {/* BOUTON AJOUTER */}
      {/* ======================================= */}

{formulaireVisible && (

  <View style={styles.formulaire}>

    <Text style={styles.label}>
      Quel entretien veux-tu prévoir ?
    </Text>

    <TextInput
      value={texte}
      onChangeText={setTexte}
      placeholder="Ex. Ramonage de la cheminée"
      placeholderTextColor={Colors.subtitle}
      style={styles.input}
    />


    <Text style={styles.label}>
      À quelle fréquence ?
    </Text>

    <View style={styles.frequences}>

      {[6, 12, 24, 60].map((mois) => (

        <TouchableOpacity
          key={mois}
          style={[
            styles.boutonFrequence,
            frequenceMois === mois &&
              styles.boutonFrequenceActif,
          ]}
          onPress={() =>
            setFrequenceMois(mois)
          }
        >

          <Text
            style={[
              styles.texteFrequence,
              frequenceMois === mois &&
                styles.texteFrequenceActif,
            ]}
          >
            {mois === 6
              ? "6 mois"
              : mois === 12
              ? "1 an"
              : mois === 24
              ? "2 ans"
              : "5 ans"}
          </Text>

        </TouchableOpacity>

      ))}

    </View>


    <TouchableOpacity
      style={styles.boutonEnregistrer}
      activeOpacity={0.85}
      onPress={() => {

        ajouterEntretien(
          texte,
          frequenceMois
        );

        setTexte("");

        setFrequenceMois(12);

        setFormulaireVisible(false);

      }}
    >

      <Text style={styles.texteBouton}>
        Enregistrer
      </Text>

    </TouchableOpacity>

  </View>

)}

      <TouchableOpacity
  style={styles.boutonAjouter}
  activeOpacity={0.85}
  onPress={() => {
    setFormulaireVisible(true);
  }}
>

        <MaterialCommunityIcons
          name="plus"
          size={24}
          color="#FFFFFF"
        />

        <Text style={styles.texteBouton}>
          Ajouter un entretien
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
// FORMULAIRE
// =====================================

formulaire: {
  backgroundColor: Colors.card,
  borderRadius: 22,
  padding: Spacing.lg,
  marginBottom: Spacing.lg,
},

label: {
  fontSize: 15,
  fontWeight: "600",
  color: Colors.text,
  marginBottom: Spacing.sm,
},

input: {
  backgroundColor: Colors.background,
  borderRadius: 14,
  paddingHorizontal: Spacing.md,
  paddingVertical: 13,
  fontSize: 16,
  color: Colors.text,
  marginBottom: Spacing.lg,
},

frequences: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 8,
  marginBottom: Spacing.lg,
},

boutonFrequence: {
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 14,
  backgroundColor: Colors.background,
},

boutonFrequenceActif: {
  backgroundColor: Colors.secondary,
},

texteFrequence: {
  fontSize: 14,
  color: Colors.text,
},

texteFrequenceActif: {
  color: "#FFFFFF",
  fontWeight: "700",
},

boutonEnregistrer: {
  backgroundColor: Colors.secondary,
  borderRadius: 18,
  paddingVertical: 14,
  alignItems: "center",
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
// LISTE ENTRETIENS
// =====================================

listeEntretiens: {
  gap: Spacing.sm,
  marginBottom: Spacing.lg,
},

carteEntretien: {
  flexDirection: "row",
  alignItems: "center",

  backgroundColor: Colors.card,

  borderRadius: 20,

  padding: Spacing.md,

  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 6,
  shadowOffset: {
    width: 0,
    height: 2,
  },

  elevation: 2,
},

iconeEntretien: {
  width: 48,
  height: 48,

  borderRadius: 24,

  alignItems: "center",
  justifyContent: "center",

  backgroundColor: Colors.background,

  marginRight: Spacing.md,
},

contenuEntretien: {
  flex: 1,
},

nomEntretien: {
  fontSize: 17,
  fontWeight: "700",
  color: Colors.text,
},

frequenceEntretien: {
  marginTop: 2,
  fontSize: 13,
  color: Colors.subtitle,
},

echeanceEntretien: {
  marginTop: 6,
  fontSize: 14,
  fontWeight: "600",
  color: Colors.secondary,
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


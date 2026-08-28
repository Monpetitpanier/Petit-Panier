import React, { useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBudget } from "../contexts/BudgetContext";
import { formaterMontant } from "../utils/budgetUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";


export default function Remboursements() {

  const navigation = useNavigation();

  const {
    remboursements,
    ajouterRemboursement,
    supprimerRemboursement,
  } = useBudget();


  const [
    formulaireOuvert,
    setFormulaireOuvert,
  ] = useState(false);


  const [
    nom,
    setNom,
  ] = useState("");


  const [
    montant,
    setMontant,
  ] = useState("");


  function reinitialiserFormulaire() {

    setNom("");
    setMontant("");
    setFormulaireOuvert(false);

  }


  function validerAjout() {

    const montantNumerique =
      parseFloat(
        montant.replace(",", ".")
      ) || 0;


    if (
      !nom.trim() ||
      montantNumerique <= 0
    ) {

      return;

    }


    ajouterRemboursement({

      id:
        Date.now().toString(),

      nom:
        nom.trim(),

      montant:
        montantNumerique,

      date:
        new Date().toISOString(),

    });


    reinitialiserFormulaire();

  }


  const total =
    remboursements.reduce(
      (
        somme,
        remboursement
      ) =>
        somme +
        (
          Number(
            remboursement.montant
          ) || 0
        ),
      0
    );


  return (

    <SafeAreaView
      style={styles.container}
    >

      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() =>
          navigation.goBack()
        }
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

        <Text style={styles.titre}>
          Remboursements
        </Text>


        <Text style={styles.sousTitre}>
          Les sommes reçues ponctuellement et ajoutées à votre budget disponible.
        </Text>


        {/* ================================= */}
        {/* TOTAL */}
        {/* ================================= */}

        <View style={styles.resume}>

          <Text style={styles.nombre}>
            {formaterMontant(total)}
          </Text>

          <Text style={styles.texteResume}>
            reçus
          </Text>

        </View>


        {/* ================================= */}
        {/* FORMULAIRE */}
        {/* ================================= */}

        {formulaireOuvert ? (

          <View style={styles.formulaire}>

            <TextInput
              style={styles.champ}
              placeholder="Origine (ex : Mutuelle)"
              placeholderTextColor={
                Colors.subtitle
              }
              value={nom}
              onChangeText={setNom}
              autoFocus
            />


            <TextInput
              style={styles.champ}
              placeholder="Montant (€)"
              placeholderTextColor={
                Colors.subtitle
              }
              keyboardType="decimal-pad"
              value={montant}
              onChangeText={setMontant}
            />


            <View style={styles.ligneBoutons}>

              <TouchableOpacity
                style={styles.boutonAnnuler}
                onPress={
                  reinitialiserFormulaire
                }
              >

                <Text
                  style={
                    styles.texteBoutonAnnuler
                  }
                >
                  Annuler
                </Text>

              </TouchableOpacity>


              <TouchableOpacity
                style={styles.boutonValider}
                onPress={
                  validerAjout
                }
              >

                <Text
                  style={
                    styles.texteBoutonValider
                  }
                >
                  Ajouter
                </Text>

              </TouchableOpacity>

            </View>

          </View>

        ) : (

          <TouchableOpacity
            style={styles.boutonAjouter}
            onPress={() =>
              setFormulaireOuvert(true)
            }
          >

            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={22}
              color={Colors.text}
            />


            <Text
              style={
                styles.texteBoutonAjouter
              }
            >
              Ajouter un remboursement
            </Text>

          </TouchableOpacity>

        )}


        {/* ================================= */}
        {/* LISTE */}
        {/* ================================= */}

        {remboursements.length === 0 ? (

          <View style={styles.carteVide}>

            <Text style={styles.emoji}>
              💶
            </Text>


            <Text style={styles.titreVide}>
              Aucun remboursement
            </Text>


            <Text style={styles.texteVide}>
              Un remboursement ajouté ici
              augmente immédiatement votre
              reste disponible.
            </Text>

          </View>

        ) : (

          remboursements.map(
            (remboursement) => (

              <View
                key={remboursement.id}
                style={styles.carteRemboursement}
              >

                <View
                  style={
                    styles.iconeRemboursement
                  }
                >

                  <MaterialCommunityIcons
                    name="cash-refund"
                    size={25}
                    color={Colors.text}
                  />

                </View>


                <View
                  style={
                    styles.texteRemboursement
                  }
                >

                  <Text
                    style={
                      styles.nomRemboursement
                    }
                  >
                    {remboursement.nom}
                  </Text>


                  <Text
                    style={
                      styles.details
                    }
                  >
                    Remboursement
                  </Text>

                </View>


                <Text
                  style={
                    styles.montantRemboursement
                  }
                >
                  +{formaterMontant(
                    remboursement.montant
                  )}
                </Text>


                <TouchableOpacity
                  style={
                    styles.boutonSupprimer
                  }
                  onPress={() =>
                    supprimerRemboursement(
                      remboursement.id
                    )
                  }
                >

                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color={
                      Colors.subtitle
                    }
                  />

                </TouchableOpacity>

              </View>

            )
          )

        )}

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


  content: {
    padding:
      Spacing.lg,

    paddingBottom:
      Spacing.xl,
  },


  boutonRetour: {
    marginLeft:
      Spacing.md,

    marginTop:
      Spacing.sm,

    width: 44,
    height: 44,

    alignItems:
      "center",

    justifyContent:
      "center",

    borderRadius: 22,
  },


  titre: {
    marginTop:
      Spacing.md,

    fontSize: 30,

    fontWeight:
      "700",

    color:
      Colors.text,
  },


  sousTitre: {
    marginTop:
      Spacing.xs,

    marginBottom:
      Spacing.lg,

    fontSize: 16,

    lineHeight: 23,

    color:
      Colors.subtitle,
  },


  resume: {
    flexDirection:
      "row",

    alignItems:
      "baseline",

    marginBottom:
      Spacing.lg,
  },


  nombre: {
    fontSize: 28,

    fontWeight:
      "700",

    color:
      Colors.text,
  },


  texteResume: {
    marginLeft:
      Spacing.sm,

    fontSize: 16,

    color:
      Colors.subtitle,
  },


  boutonAjouter: {
    flexDirection:
      "row",

    alignItems:
      "center",

    justifyContent:
      "center",

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.md,

    marginBottom:
      Spacing.lg,

    borderWidth:
      1,

    borderColor:
      Colors.border,

    borderStyle:
      "dashed",
  },


  texteBoutonAjouter: {
    marginLeft:
      Spacing.sm,

    fontSize: 16,

    fontWeight:
      "600",

    color:
      Colors.text,
  },


  formulaire: {
    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.lg,

    marginBottom:
      Spacing.lg,

    ...Shadow.card,
  },


  champ: {
    backgroundColor:
      Colors.background,

    borderRadius:
      Radius.small,

    paddingHorizontal:
      Spacing.md,

    paddingVertical:
      Spacing.sm,

    fontSize: 15,

    color:
      Colors.text,

    marginBottom:
      Spacing.sm,
  },


  ligneBoutons: {
    flexDirection:
      "row",

    justifyContent:
      "flex-end",

    marginTop:
      Spacing.xs,
  },


  boutonAnnuler: {
    paddingVertical:
      Spacing.sm,

    paddingHorizontal:
      Spacing.md,

    marginRight:
      Spacing.sm,
  },


  texteBoutonAnnuler: {
    fontSize: 15,

    color:
      Colors.subtitle,
  },


  boutonValider: {
    backgroundColor:
      Colors.secondary,

    borderRadius:
      Radius.small,

    paddingVertical:
      Spacing.sm,

    paddingHorizontal:
      Spacing.lg,
  },


  texteBoutonValider: {
    fontSize: 15,

    fontWeight:
      "700",

    color:
      Colors.white,
  },


  carteVide: {
    alignItems:
      "center",

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.xl,

    ...Shadow.card,
  },


  emoji: {
    fontSize: 42,

    marginBottom:
      Spacing.md,
  },


  titreVide: {
    fontSize: 18,

    fontWeight:
      "700",

    color:
      Colors.text,
  },


  texteVide: {
    marginTop:
      Spacing.sm,

    fontSize: 15,

    lineHeight: 22,

    textAlign:
      "center",

    color:
      Colors.subtitle,
  },


  carteRemboursement: {
    flexDirection:
      "row",

    alignItems:
      "center",

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.md,

    marginBottom:
      Spacing.md,

    ...Shadow.card,
  },


  iconeRemboursement: {
    width: 52,
    height: 52,

    borderRadius: 26,

    alignItems:
      "center",

    justifyContent:
      "center",

    backgroundColor:
      Colors.background,

    marginRight:
      Spacing.md,
  },


  texteRemboursement: {
    flex: 1,
  },


  nomRemboursement: {
    fontSize: 17,

    fontWeight:
      "700",

    color:
      Colors.text,
  },


  details: {
    marginTop: 3,

    fontSize: 13,

    color:
      Colors.subtitle,
  },


  montantRemboursement: {
    fontSize: 16,

    fontWeight:
      "700",

    color:
      Colors.secondary,

    marginRight:
      Spacing.sm,
  },


  boutonSupprimer: {
    width: 32,
    height: 32,

    alignItems:
      "center",

    justifyContent:
      "center",
  },

});
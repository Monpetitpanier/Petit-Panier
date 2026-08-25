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
import { formaterMontant, totaliserMontants } from "../utils/budgetUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function ChargesVariables() {
  const navigation = useNavigation();

  const { chargesVariables, ajouterChargeVariable } = useBudget();

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [nom, setNom] = useState("");
  const [montant, setMontant] = useState("");
  const [categorie, setCategorie] = useState("");

  const total = totaliserMontants(chargesVariables);

  function reinitialiserFormulaire() {
    setNom("");
    setMontant("");
    setCategorie("");
    setFormulaireOuvert(false);
  }

  function validerAjout() {
    if (!nom.trim() || !montant) {
      return;
    }

    ajouterChargeVariable({
      id: Date.now().toString(),
      nom: nom.trim(),
      montant: parseFloat(montant.replace(",", ".")) || 0,
      categorie: categorie ? categorie.trim() : null,
      dateCreation: new Date().toISOString(),
    });

    reinitialiserFormulaire();
  }

  return (
    <SafeAreaView style={styles.container}>

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

        <Text style={styles.titre}>Charges variables</Text>

        <Text style={styles.sousTitre}>
          Courses, essence, sorties... tout ce qui varie d'un mois à l'autre.
        </Text>

        <View style={styles.resume}>
          <Text style={styles.nombre}>{formaterMontant(total)}</Text>
          <Text style={styles.texteResume}>/ mois</Text>
        </View>

        {/* ============================= */}
        {/* FORMULAIRE D'AJOUT */}
        {/* ============================= */}

        {formulaireOuvert ? (
          <View style={styles.formulaire}>

            <TextInput
              style={styles.champ}
              placeholder="Nom (ex : Courses)"
              placeholderTextColor={Colors.subtitle}
              value={nom}
              onChangeText={setNom}
            />

            <TextInput
              style={styles.champ}
              placeholder="Montant (€)"
              placeholderTextColor={Colors.subtitle}
              keyboardType="decimal-pad"
              value={montant}
              onChangeText={setMontant}
            />

            <TextInput
              style={styles.champ}
              placeholder="Catégorie (optionnel)"
              placeholderTextColor={Colors.subtitle}
              
              value={categorie}
              onChangeText={setCategorie}
            />

            <View style={styles.ligneBoutons}>
              <TouchableOpacity
                style={styles.boutonAnnuler}
                onPress={reinitialiserFormulaire}
              >
                <Text style={styles.texteBoutonAnnuler}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.boutonValider}
                onPress={validerAjout}
              >
                <Text style={styles.texteBoutonValider}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.boutonAjouter}
            onPress={() => setFormulaireOuvert(true)}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={22}
              color={Colors.text}
            />

            <Text style={styles.texteBoutonAjouter}>
              Ajouter une charge variable
            </Text>
          </TouchableOpacity>
        )}

        {/* ============================= */}
        {/* LISTE */}
        {/* ============================= */}

        {chargesVariables.length === 0 ? (

          <View style={styles.carteVide}>
            <Text style={styles.emoji}>🏠</Text>

            <Text style={styles.titreVide}>
              Aucune charge variable enregistrée
            </Text>

            <Text style={styles.texteVide}>
              Ajoutez vos dépenses du quotidien pour garder un œil
              sur votre budget mensuel.
            </Text>
          </View>

        ) : (

          chargesVariables.map((charge) => (
            <TouchableOpacity
              key={charge.id}
              style={styles.carteCharge}
              onPress={() =>
                navigation.navigate("DetailsChargeVariable", {
                  chargeId: charge.id,
                })
              }
            >
              <View style={styles.iconeCharge}>
                <Text style={styles.emojiCarte}>🏠</Text>
              </View>

              <View style={styles.texteCharge}>
                <Text style={styles.nomCharge}>{charge.nom}</Text>

                {charge.categorie && (
                  <Text style={styles.details}>
                    {charge.categorie}
                  </Text>
                )}
              </View>

              <Text style={styles.montantCharge}>
                {formaterMontant(charge.montant)}
              </Text>
            </TouchableOpacity>
          ))

        )}

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
    marginBottom: Spacing.lg,
    fontSize: 16,
    lineHeight: 23,
    color: Colors.subtitle,
  },

  resume: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: Spacing.lg,
  },

  nombre: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
  },

  texteResume: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.subtitle,
  },

  boutonAjouter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderStyle: "dashed",
  },

  texteBoutonAjouter: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  formulaire: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.card,
  },

  champ: {
    backgroundColor: Colors.background,
    borderRadius: Radius.small,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 15,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  ligneBoutons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: Spacing.xs,
  },

  boutonAnnuler: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.sm,
  },

  texteBoutonAnnuler: {
    fontSize: 15,
    color: Colors.subtitle,
  },

  boutonValider: {
    backgroundColor: Colors.secondary,
    borderRadius: Radius.small,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
  },

  texteBoutonValider: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.white,
  },

  carteVide: {
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.xl,
    ...Shadow.card,
  },

  emoji: {
    fontSize: 42,
    marginBottom: Spacing.md,
  },

  titreVide: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  texteVide: {
    marginTop: Spacing.sm,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center",
    color: Colors.subtitle,
  },

  carteCharge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },

  iconeCharge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    marginRight: Spacing.md,
  },

  emojiCarte: {
    fontSize: 25,
  },

  texteCharge: {
    flex: 1,
  },

  nomCharge: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  details: {
    marginTop: 3,
    fontSize: 14,
    color: Colors.subtitle,
  },

  montantCharge: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
});

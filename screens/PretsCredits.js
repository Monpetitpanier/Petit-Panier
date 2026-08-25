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

import {
  formaterMontant,
  totaliserMensualites,
  totaliserResteARembourser,
  calculerResteARembourser,
} from "../utils/budgetUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function PretsCredits() {
  const navigation = useNavigation();

  const { prets, ajouterPret } = useBudget();

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [nom, setNom] = useState("");
  const [mensualite, setMensualite] = useState("");
  const [montantEmprunte, setMontantEmprunte] = useState("");
  const [dateFin, setDateFin] = useState("");

  const pretsActifs = prets.filter((pret) => pret.actif);
  const pretsSoldes = prets.filter((pret) => !pret.actif);

  const totalMensualites = totaliserMensualites(prets);
  const totalResteARembourser = totaliserResteARembourser(prets);

  function reinitialiserFormulaire() {
    setNom("");
    setMensualite("");
    setMontantEmprunte("");
    setDateFin("");
    setFormulaireOuvert(false);
  }

  function validerAjout() {
    if (!nom.trim() || !mensualite) {
      return;
    }

    ajouterPret({
      id: Date.now().toString(),
      nom: nom.trim(),
      mensualite: parseFloat(mensualite.replace(",", ".")) || 0,
      montantEmprunte: montantEmprunte
        ? parseFloat(montantEmprunte.replace(",", ".")) || 0
        : null,
      dateFin: dateFin.trim() || null,
      actif: true,
      dateCreation: new Date().toISOString(),
    });

    reinitialiserFormulaire();
  }

  function afficherLigneCredit(pret) {
    const reste = calculerResteARembourser(pret);

    return (
      <TouchableOpacity
        key={pret.id}
        style={styles.cartePret}
        onPress={() =>
          navigation.navigate("DetailsPretCredit", {
            pretId: pret.id,
          })
        }
      >
        <View style={styles.iconePret}>
          <Text style={styles.emojiCarte}>💳</Text>
        </View>

        <View style={styles.textePret}>
          <Text style={styles.nomPret}>{pret.nom}</Text>

          <Text style={styles.details}>
            {formaterMontant(pret.mensualite)} / mois
          </Text>

          {pret.dateFin && (
            <Text style={styles.details}>
              Reste à rembourser :{" "}
              {reste !== null ? formaterMontant(reste) : "—"}
            </Text>
          )}
        </View>

        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={Colors.subtitle}
        />
      </TouchableOpacity>
    );
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

        <Text style={styles.titre}>Prêts & crédits</Text>

        <Text style={styles.sousTitre}>
          Vos crédits en cours et ce qu'il vous reste à rembourser.
        </Text>

        <View style={styles.resumeDouble}>
          <View style={styles.blocResume}>
            <Text style={styles.nombre}>
              {formaterMontant(totalMensualites)}
            </Text>
            <Text style={styles.texteResume}>de mensualités / mois</Text>
          </View>

          <View style={styles.blocResume}>
            <Text style={styles.nombre}>
              {formaterMontant(totalResteARembourser)}
            </Text>
            <Text style={styles.texteResume}>reste à rembourser</Text>
          </View>
        </View>

        {/* ============================= */}
        {/* FORMULAIRE D'AJOUT */}
        {/* ============================= */}

        {formulaireOuvert ? (
          <View style={styles.formulaire}>

            <TextInput
              style={styles.champ}
              placeholder="Nom (ex : Crédit voiture)"
              placeholderTextColor={Colors.subtitle}
              value={nom}
              onChangeText={setNom}
            />

            <TextInput
              style={styles.champ}
              placeholder="Mensualité (€)"
              placeholderTextColor={Colors.subtitle}
              keyboardType="decimal-pad"
              value={mensualite}
              onChangeText={setMensualite}
            />

            <TextInput
              style={styles.champ}
              placeholder="Montant emprunté (optionnel)"
              placeholderTextColor={Colors.subtitle}
              keyboardType="decimal-pad"
              value={montantEmprunte}
              onChangeText={setMontantEmprunte}
            />

            <TextInput
              style={styles.champ}
              placeholder="Date de fin (AAAA-MM-JJ)"
              placeholderTextColor={Colors.subtitle}
              value={dateFin}
              onChangeText={setDateFin}
            />

            <Text style={styles.aideChamp}>
              La date de fin permet de calculer automatiquement le reste
              à rembourser.
            </Text>

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
              Ajouter un prêt ou un crédit
            </Text>
          </TouchableOpacity>
        )}

        {/* ============================= */}
        {/* LISTE DES PRÊTS ACTIFS */}
        {/* ============================= */}

        {pretsActifs.length === 0 && pretsSoldes.length === 0 ? (

          <View style={styles.carteVide}>
            <Text style={styles.emoji}>💳</Text>

            <Text style={styles.titreVide}>Aucun prêt en cours</Text>

            <Text style={styles.texteVide}>
              Ajoutez vos crédits en cours pour suivre vos mensualités et
              ce qu'il vous reste à rembourser.
            </Text>
          </View>

        ) : (

          <>
            {pretsActifs.map(afficherLigneCredit)}

            {pretsSoldes.length > 0 && (
              <>
                <Text style={styles.sousTitreSection}>Soldés</Text>
                {pretsSoldes.map(afficherLigneCredit)}
              </>
            )}
          </>

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

  sousTitreSection: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    fontSize: 15,
    fontWeight: "700",
    color: Colors.subtitle,
  },

  resumeDouble: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },

  blocResume: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginRight: Spacing.sm,
    ...Shadow.card,
  },

  nombre: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  texteResume: {
    marginTop: 2,
    fontSize: 12,
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

  aideChamp: {
    fontSize: 12,
    color: Colors.subtitle,
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

  cartePret: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },

  iconePret: {
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

  textePret: {
    flex: 1,
  },

  nomPret: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  details: {
    marginTop: 3,
    fontSize: 14,
    color: Colors.subtitle,
  },
});

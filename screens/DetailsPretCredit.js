import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBudget } from "../contexts/BudgetContext";
import {
  formaterMontant,
  calculerResteARembourser,
  calculerMoisRestants,
} from "../utils/budgetUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function DetailsPretCredit() {
  const navigation = useNavigation();
  const route = useRoute();

  const { pretId } = route.params;

  const { prets, soldePret, supprimerPret } = useBudget();

  const pret = prets.find((item) => item.id === pretId);

  if (!pret) {
    return null;
  }

  const reste = calculerResteARembourser(pret);
  const moisRestants = calculerMoisRestants(pret.dateFin);

  function handleSolderPret() {
    soldePret(pret.id);
    navigation.goBack();
  }

  function retirerPret() {
    supprimerPret(pret.id);
    navigation.goBack();
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
        <Text style={styles.titre}>{pret.nom}</Text>

        <Text style={styles.sousTitre}>
          {pret.actif ? "Crédit en cours" : "Crédit soldé"}
        </Text>

        <View style={styles.carte}>
          <Text style={styles.label}>Mensualité</Text>
          <Text style={styles.valeur}>
            {formaterMontant(pret.mensualite)}
          </Text>
        </View>

        {pret.montantEmprunte !== null &&
          pret.montantEmprunte !== undefined && (
            <View style={styles.carte}>
              <Text style={styles.label}>Montant emprunté</Text>
              <Text style={styles.valeur}>
                {formaterMontant(pret.montantEmprunte)}
              </Text>
            </View>
          )}

        {pret.dateFin && (
          <View style={styles.carte}>
            <Text style={styles.label}>Date de fin</Text>
            <Text style={styles.valeur}>{pret.dateFin}</Text>
          </View>
        )}

        <View style={styles.carte}>
          <Text style={styles.label}>Reste à rembourser</Text>
          <Text style={styles.valeur}>
            {reste !== null
              ? formaterMontant(reste)
              : "Renseignez une date de fin pour le calculer"}
          </Text>

          {moisRestants !== null && pret.actif && (
            <Text style={styles.details}>
              Environ {moisRestants} mois restant
              {moisRestants > 1 ? "s" : ""}
            </Text>
          )}
        </View>

        {pret.actif && (
          <TouchableOpacity
            style={styles.boutonSolder}
            onPress={handleSolderPret}
          >
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={22}
              color={Colors.text}
            />

            <Text style={styles.texteBoutonSolder}>
              Marquer comme soldé
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.boutonSupprimer}
          onPress={retirerPret}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={22}
            color={Colors.text}
          />

          <Text style={styles.texteBoutonSupprimer}>
            Supprimer ce prêt
          </Text>
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
    color: Colors.subtitle,
  },

  carte: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },

  label: {
    fontSize: 14,
    color: Colors.subtitle,
  },

  valeur: {
    marginTop: Spacing.xs,
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
  },

  details: {
    marginTop: Spacing.xs,
    fontSize: 14,
    color: Colors.subtitle,
  },

  boutonSolder: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.lg,
    padding: Spacing.md,
    borderRadius: Radius.large,
    backgroundColor: Colors.card,
    ...Shadow.card,
  },

  texteBoutonSolder: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  boutonSupprimer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.md,
    padding: Spacing.md,
    borderRadius: Radius.large,
    backgroundColor: Colors.card,
    ...Shadow.card,
  },

  texteBoutonSupprimer: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
});

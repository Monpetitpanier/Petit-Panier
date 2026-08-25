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
import { formaterMontant } from "../utils/budgetUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function DetailsChargeVariable() {
  const navigation = useNavigation();
  const route = useRoute();

  const { chargeId } = route.params;

  const { chargesVariables, supprimerChargeVariable } = useBudget();

  const charge = chargesVariables.find((item) => item.id === chargeId);

  if (!charge) {
    return null;
  }

  function retirerCharge() {
    supprimerChargeVariable(charge.id);
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
        <Text style={styles.titre}>{charge.nom}</Text>
        <Text style={styles.sousTitre}>Charge variable</Text>

        <View style={styles.carte}>
          <Text style={styles.label}>Montant</Text>
          <Text style={styles.valeur}>{formaterMontant(charge.montant)}</Text>
        </View>

        {charge.categorie && (
          <View style={styles.carte}>
            <Text style={styles.label}>Catégorie</Text>
            <Text style={styles.valeur}>{charge.categorie}</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.boutonSupprimer}
          onPress={retirerCharge}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={22}
            color={Colors.text}
          />

          <Text style={styles.texteBoutonSupprimer}>
            Supprimer cette charge
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

  boutonSupprimer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.lg,
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

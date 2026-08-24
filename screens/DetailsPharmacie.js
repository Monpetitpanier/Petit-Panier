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

import { useSante } from "../contexts/SanteContext";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function DetailsPharmacie() {
  const navigation = useNavigation();
  const route = useRoute();

  const { produitId } = route.params;

  const {
    pharmacie,
    supprimerProduitPharmacie,
  } = useSante();

  const produit = pharmacie.find(
    (item) => item.id === produitId
  );

  function retirerProduit() {
    supprimerProduitPharmacie(produit.id);

    navigation.goBack();
  }

  if (!produit) {
    return null;
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

        <Text style={styles.titre}>
          {produit.nom}
        </Text>

        <Text style={styles.sousTitre}>
          Détails du produit
        </Text>

        <View style={styles.carte}>

          <Text style={styles.label}>
            Quantité
          </Text>

          <Text style={styles.valeur}>
            {produit.quantite !== undefined
              ? produit.quantite
              : "Non renseignée"}
          </Text>

        </View>

        <View style={styles.carte}>

          <Text style={styles.label}>
            Date de péremption
          </Text>

          <Text style={styles.valeur}>
            {produit.datePeremption ||
              "Non renseignée"}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.boutonRetirer}
          onPress={retirerProduit}
        >

          <MaterialCommunityIcons
            name="trash-can-outline"
            size={20}
            color={Colors.text}
          />

          <Text style={styles.texteBoutonRetirer}>
            Retirer de la pharmacie
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

  boutonRetirer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: Spacing.lg,

    paddingVertical: Spacing.md,

    borderRadius: Radius.large,

    backgroundColor: Colors.card,

    ...Shadow.card,
  },

  texteBoutonRetirer: {
    marginLeft: Spacing.sm,

    fontSize: 16,
    fontWeight: "600",

    color: Colors.text,
  },

});
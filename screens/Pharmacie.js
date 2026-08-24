import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSante } from "../contexts/SanteContext";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function Pharmacie() {
  const navigation = useNavigation();

  const { pharmacie } = useSante();

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
          Pharmacie
        </Text>

        <Text style={styles.sousTitre}>
          Garder à portée de main les essentiels pour les petits soins du quotidien.
        </Text>

        <View style={styles.resume}>
          <Text style={styles.nombre}>
            {pharmacie.length}
          </Text>

          <Text style={styles.texteResume}>
            produit{pharmacie.length > 1 ? "s" : ""} enregistré
            {pharmacie.length > 1 ? "s" : ""}
          </Text>
        </View>

        {pharmacie.length === 0 ? (
          <View style={styles.carteVide}>
            <Text style={styles.emoji}>
              🩹
            </Text>

            <Text style={styles.titreVide}>
              Votre pharmacie est vide
            </Text>

            <Text style={styles.texteVide}>
              Vos pansements, produits de soin et essentiels de premiers secours
              apparaîtront ici.
            </Text>
          </View>
        ) : (
     pharmacie.map((produit) => (
  <TouchableOpacity
    key={produit.id}
    style={styles.carteProduit}
    onPress={() =>
      navigation.navigate("DetailsPharmacie", {
        produitId: produit.id,
      })
    }
  >
    <View style={styles.iconeProduit}>
      <Text style={styles.emojiCarte}>
        🩹
      </Text>
    </View>

    <View style={styles.texteProduit}>
      <Text style={styles.nomProduit}>
        {produit.nom}
      </Text>

      {produit.quantite !== undefined && (
        <Text style={styles.details}>
          Quantité : {produit.quantite}
        </Text>
      )}

      {produit.datePeremption && (
        <Text style={styles.peremption}>
          Péremption : {produit.datePeremption}
        </Text>
               )}
            </View>
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
    marginBottom: Spacing.xl,

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
    fontSize: 32,
    fontWeight: "700",
    color: Colors.text,
  },

  texteResume: {
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.subtitle,
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

  carteProduit: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.card,
    borderRadius: Radius.large,

    padding: Spacing.md,
    marginBottom: Spacing.md,

    ...Shadow.card,
  },

  iconeProduit: {
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

  texteProduit: {
    flex: 1,
  },

  nomProduit: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.text,
  },

  details: {
    marginTop: 3,
    fontSize: 14,
    color: Colors.subtitle,
  },

  peremption: {
    marginTop: 2,
    fontSize: 13,
    color: Colors.subtitle,
  },
});
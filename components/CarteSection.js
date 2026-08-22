import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function CarteSection({
  icone,
  illustration,
  styleIllustration,
  titre,
  sousTitre,
  onPress,
  afficherChevron = false,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.carte,
        afficherChevron && styles.carteMaison,
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.ligne}>

        {illustration ? (
          <Image
            source={illustration}
            style={[
              styles.illustration,
              styles[styleIllustration],
            ]}
            resizeMode="contain"
          />
        ) : (
          <Text style={styles.icone}>
            {icone}
          </Text>
        )}

        <View style={styles.texte}>
          <Text style={styles.titre}>
            {titre}
          </Text>

          {sousTitre ? (
            <Text style={styles.sousTitre}>
              {sousTitre}
            </Text>
          ) : null}
        </View>

        {afficherChevron ? (
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={Colors.subtitle}
          />
        ) : null}

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  carte: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.md,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  ligne: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Taille par défaut
  illustration: {
    width: 80,
    height: 80,
    marginRight: Spacing.md,
  },

  // Taille Maison
  illustrationMaison: {
    width: 80,
    height: 80,
  },

  // Taille Santé
  illustrationSante: {
    width: 90,
    height: 90,
  },

  // Taille Bien-être
  illustrationBienEtre: {
    width: 100,
    height: 100,
  },

  // Taille Univers
  illustrationUnivers: {
    width: 100,
    height: 100,
  },

  icone: {
    fontSize: 30,
    marginRight: 16,
  },

  carteMaison: {
    backgroundColor: Colors.card,
    borderRadius: 28,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },

  texte: {
    flex: 1,
  },

  titre: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  sousTitre: {
    marginTop: 4,
    fontSize: 15,
    color: Colors.subtitle,
  },

});
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";

export default function CarteSection({
  icone,
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
        <View
          style={afficherChevron ? styles.pastilleIconeMaison : null}
        >
          <Text
            style={[
              styles.icone,
              afficherChevron && styles.iconeMaison,
            ]}
          >
            {icone}
          </Text>
        </View>

        <View style={styles.texte}>
          <Text style={styles.titre}>{titre}</Text>

          {sousTitre ? (
            <Text style={styles.sousTitre}>{sousTitre}</Text>
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

  carteMaison: {
    backgroundColor: Colors.card,
    borderRadius: 28,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },

  icone: {
    fontSize: 30,
    marginRight: 16,
  },

  pastilleIconeMaison: {
    width: 62,
    height: 62,
    marginRight: Spacing.md,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDF1E3",
  },

  iconeMaison: {
    marginRight: 0,
    fontSize: 28,
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

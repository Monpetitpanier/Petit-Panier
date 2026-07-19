import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

export default function CarteGratitude({
  gratitude,
  onFavori,
  onSupprimer,
}) {
  return (
    <View style={styles.carte}>
      <View style={styles.contenu}>
        <Text style={styles.texte}>
          {gratitude.texte}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onFavori}
        style={styles.bouton}
      >
        <Text style={styles.icone}>
          {gratitude.favori ? "⭐" : "☆"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onSupprimer}
        style={styles.bouton}
      >
        <Text style={styles.icone}>
          🗑️
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  carte: {
    backgroundColor: Colors.surface ?? "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  contenu: {
    flex: 1,
  },

  texte: {
    fontSize: 16,
    color: Colors.text,
  },

  bouton: {
    paddingHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  icone: {
    fontSize: 22,
  },
});
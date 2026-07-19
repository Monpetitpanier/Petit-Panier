import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CarteRendezVous({
  rendezVous,
  supprimerRendezVous,
}) {
  return (
    <View style={styles.carte}>

      <Text style={styles.titre}>
        {rendezVous.titre}
      </Text>

      <Text style={styles.texte}>
        📅 {rendezVous.date}
      </Text>

      <Text style={styles.texte}>
        🕒 {rendezVous.heure}
      </Text>

      <TouchableOpacity
        onPress={() => supprimerRendezVous(rendezVous.id)}
      >
        <Text style={styles.supprimer}>
          Retirer du planning
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  carte: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    elevation: 3,
  },

  titre: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginBottom: 10,
  },

  texte: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },

  supprimer: {
    color: "#8BA888",
    marginTop: 15,
    fontWeight: "600",
  },

});
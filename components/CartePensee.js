import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CartePensee({ pensee }) {

  function formaterDate(dateIso) {
    const date = new Date(dateIso);

    return (
      date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " • " +
      date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  return (
    <View style={styles.carte}>

      <Text style={styles.date}>
        {formaterDate(pensee.dateCreation)}
      </Text>

      <Text style={styles.contenu}>
        {pensee.contenu}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  carte: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 3,
  },

  date: {
    color: "#8A8A8A",
    fontSize: 12,
    marginBottom: 10,
  },

  contenu: {
    color: "#3D3D3D",
    fontSize: 17,
    lineHeight: 24,
  },

});
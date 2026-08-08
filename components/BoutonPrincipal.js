import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

export default function BoutonPrincipal({ titre, onPress }) {
  return (
    <TouchableOpacity
      style={styles.bouton}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.texte}>{titre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bouton: {
    backgroundColor: "#eb979b",

    width: "95%",
    minHeight: 65,

    paddingVertical: 16,
    paddingHorizontal: 24,

    borderRadius: 30,

    alignItems: "center",
    justifyContent: "center",

    alignSelf: "center",

    marginVertical: 10,

    shadowColor: "#6B4F45",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 3,
  },

  texte: {
    color: "#fffcfb",
    fontWeight: "700",
    fontSize: 17,
    textAlign: "center",
  },
});
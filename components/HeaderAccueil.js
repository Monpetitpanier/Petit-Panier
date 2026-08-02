import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderAccueil() {
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    const chargerPrenom = async () => {
      try {
        const prenomEnregistre = await AsyncStorage.getItem(
          "prenom_utilisateur"
        );

        if (prenomEnregistre) {
          setPrenom(prenomEnregistre);
        }
      } catch (erreur) {
        console.error(
          "Erreur lors du chargement du prénom :",
          erreur
        );
      }
    };

    chargerPrenom();
  }, []);

  const dateDuJour = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  const dateFormatee =
    dateDuJour.charAt(0).toUpperCase() + dateDuJour.slice(1);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>
        Bonjour{prenom ? ` ${prenom}` : ""} 🐾
      </Text>

      <Text style={styles.date}>
        {dateFormatee}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 8,
  },

  titre: {
    fontSize: 27,
    fontWeight: "700",
    color: "#4D4038",
  },

  date: {
    marginTop: 5,
    fontSize: 15,
    color: "#9C8C7E",
  },
});
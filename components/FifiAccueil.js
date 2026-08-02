import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function obtenirSaison() {
  const mois = new Date().getMonth() + 1;

  if (mois >= 3 && mois <= 5) {
    return "printemps";
  }

  if (mois >= 6 && mois <= 8) {
    return "ete";
  }

  if (mois >= 9 && mois <= 11) {
    return "automne";
  }

  return "hiver";
}
const paysages = {
  printemps: require("../assets/environment/printemps.png"),
  ete: require("../assets/environment/ete.png"),
  automne: require("../assets/environment/automne.png"),
  hiver: require("../assets/environment/hiver.png"),
};

export default function FifiAccueil() {
  const saison = obtenirSaison();
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
    <View style={styles.scene}>
     {/* Paysage saisonnier derrière la fenêtre */}
<Image
  source={paysages[saison]}
  style={styles.paysage}
/>

{/* Décor de la maison par-dessus */}
<Image
  source={require("../assets/environment/maison_fifi.png")}
  style={styles.maison}
/>
      <Image
  source={require("../assets/characters/Fifi/poses/assise.png")}
  style={styles.fifi}
/>

      <View style={styles.tableau}>
        <Text
          style={styles.bonjour}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          Bonjour{prenom ? ` ${prenom}` : ""} 🐾
        </Text>

        <Text
          style={styles.date}
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {dateFormatee}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
scene: {
  width: "100%",
  height: 340,
  position: "relative",
  overflow: "hidden",
  borderRadius: 24,
},

paysage: {
  position: "absolute",

  // Le paysage est limité à la zone de la fenêtre
  top: "0%",
  left: "40%",
  width: "55%",
  height: "89%",

  resizeMode: "cover",
},

maison: {
  position: "absolute",
  width: "100%",
  height: "100%",
  resizeMode: "cover",
},

  tableau: {
    position: "absolute",

    // Position approximative du tableau dans maison_fifi.png
    left: "5%",
    top: "31%",
    width: "24%",
    height: "22%",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 4,
    paddingVertical: 4,
  },

  bonjour: {
    fontSize: 13,
    fontWeight: "700",
    color: "#5A4030",
    textAlign: "center",
  },

  date: {
    marginTop: 5,
    fontSize: 9,
    color: "#8B7464",
    textAlign: "center",
  },
  fifi: {
  position: "absolute",
  width: 145,
  height: 145,
  resizeMode: "contain",

  left: "50%",
  bottom: 18,

  transform: [
    { translateX: -72.5 },
  ],
},
});
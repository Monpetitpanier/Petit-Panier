import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function FifiAccueil() {

    const [prenom, setPrenom] = useState("");

  useEffect(() => {
    const chargerPrenom = async () => {
      try {
        const prenomEnregistre =
          await AsyncStorage.getItem("prenom_utilisateur");

        if (prenomEnregistre) {
          setPrenom(prenomEnregistre);
        }
      } catch (erreur) {
        console.error(erreur);
      }
    };

    chargerPrenom();
  }, []);

  return (
    <View style={styles.container}>
  <View style={styles.texte}>
    <Text style={styles.bonjour}>
      Bonjour{prenom ? `, ${prenom}` : ""} !
    </Text>

    <Text style={styles.question}>
      Quelque chose à me confier ?
    </Text>
  </View>

  <Image
    source={require("../assets/characters/Fifi/poses/curieuse_pattes_panier.png")}
    style={styles.fifi}
  />
</View>
  );
}

const styles = StyleSheet.create({
container: {
  width: "100%",
  minHeight: 230,
  flexDirection: "row",
  alignItems: "center",

  paddingHorizontal: 28,
  paddingVertical: Spacing.md,
},

texte: {
  width: "42%",
  zIndex: 1,
},

bonjour: {
  fontSize: 30,
  fontWeight: "700",
  color: Colors.text,
  marginBottom: 8,
},

question: {
  fontSize: 18,
  lineHeight: 26,
  color: Colors.subtitle,
},

fifi: {
  width: 230,
  height: 230,
  resizeMode: "contain",
  marginLeft: -15,
},
});
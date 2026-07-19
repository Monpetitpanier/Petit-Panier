import React from "react";
import {
  View,
 Text,
  Image,
  StyleSheet,
} from "react-native";

import BulleFifi from "./BulleFifi";

import { obtenirEtatFifi } from "../services/fifiEngine";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function CarteFifi() {

  const fifi = obtenirEtatFifi();

  return (

    <View style={styles.carte}>

      <BulleFifi texte={fifi.phrase} />

      <Image
        source={require("../assets/images/fifi-accueil.png")}
        style={styles.image}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  carte: {

    backgroundColor: Colors.card,

    borderRadius: Radius.large,

    padding: Spacing.lg,

    alignItems: "center",

    marginTop: Spacing.md,

    ...Shadow.card,

  },

  image: {

    width: 220,

    height: 220,

    resizeMode: "contain",

  },
});
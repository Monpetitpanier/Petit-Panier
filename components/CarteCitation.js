import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { usePreferences } from "../contexts/PreferencesContext";

import { Pensees } from "../data/pensees";
import {
  ParolesBible,
  ParolesCoran,
  ParolesTorah,
} from "../data/paroles";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

const parolesParLivre = {
  bible: ParolesBible,
  coran: ParolesCoran,
  torah: ParolesTorah,
};

function indexAleatoire(taille) {
  return Math.floor(Math.random() * taille);
}

export default function CarteCitation() {

  const { contenuBienEtre, livreParoles } = usePreferences();

  const estParoles = contenuBienEtre === "paroles";

  const paroles = estParoles
    ? parolesParLivre[livreParoles] ?? ParolesBible
    : null;

  // Un index aléatoire tiré une seule fois à l'affichage de la carte
  const [indexPensee] = useState(() => indexAleatoire(Pensees.length));
  const [indexParole] = useState(() =>
    paroles ? indexAleatoire(paroles.length) : 0
  );

  const titre = estParoles ? "Une parole pour toi" : "Une pensée pour toi";
  const illustration = estParoles ? "📖" : "🌷";

  const citation = estParoles
    ? paroles[indexParole].texte
    : Pensees[indexPensee];

  const reference = estParoles ? paroles[indexParole].reference : null;

  return (
    <View style={styles.carte}>

      <View style={styles.entete}>
        <Text style={styles.titre}>
          {titre}
        </Text>

        <Text style={styles.illustration}>
          {illustration}
        </Text>
      </View>

      <Text style={styles.citation}>
        « {citation} »
      </Text>

      {reference && (
        <Text style={styles.reference}>
          {reference}
        </Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  carte: {
    backgroundColor: Colors.card,

    borderRadius: Radius.large,

    padding: Spacing.lg,

    marginTop: Spacing.lg,

    ...Shadow.card,
  },

  entete: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginBottom: Spacing.md,
  },

  titre: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },

  illustration: {
    fontSize: 28,
  },

  citation: {
    fontSize: 15,
    lineHeight: 25,
    color: Colors.subtitle,

    fontStyle: "italic",
  },

  reference: {
    marginTop: Spacing.sm,
    fontSize: 13,
    fontWeight: "600",
    color: Colors.subtitle,
  },

});
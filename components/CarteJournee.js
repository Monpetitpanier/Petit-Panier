import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useAgenda } from "../contexts/AgendaContext";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";


export default function CarteJournee() {

  const { rendezVous } = useAgenda();


  // --------------------------------------------------
  // RENDEZ-VOUS D'AUJOURD'HUI
  // --------------------------------------------------

  const aujourdHui =
    new Date()
      .toLocaleDateString("fr-CA");


  const rendezVousAujourdhui =
    rendezVous
      .filter((rdv) =>
        rdv.date === aujourdHui
      )
      .sort((a, b) =>
        (a.heure || "")
          .localeCompare(
            b.heure || ""
          )
      );


  // --------------------------------------------------
  // TEXTE RENDEZ-VOUS
  // --------------------------------------------------

  let texteRendezVous;

  if (rendezVousAujourdhui.length === 0) {

    texteRendezVous =
      "📅 Aucun rendez-vous aujourd'hui";

  } else if (
    rendezVousAujourdhui.length === 1
  ) {

    const rdv =
      rendezVousAujourdhui[0];

    texteRendezVous =
      `📅 ${rdv.heure && rdv.heure !== "--:--"
        ? rdv.heure + " — "
        : ""
      }${rdv.titre}`;

  } else {

    texteRendezVous =
      `📅 ${rendezVousAujourdhui.length} rendez-vous aujourd'hui`;

  }


  return (

    <View style={styles.carte}>

      <Text style={styles.titre}>
        🌿 Aujourd'hui
      </Text>


      <Text style={styles.ligne}>
        {texteRendezVous}
      </Text>


      <Text style={styles.ligne}>
        🏡 Quelques courses
      </Text>


      <Text style={styles.ligne}>
        ❤️ Rien à signaler
      </Text>

    </View>

  );
}


const styles = StyleSheet.create({

  carte: {

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.lg,

    marginTop:
      Spacing.lg,

    ...Shadow.card,
  },


  titre: {

    fontSize: 22,

    fontWeight: "700",

    color:
      Colors.text,

    marginBottom: 15,
  },


  ligne: {

    fontSize: 16,

    color:
      Colors.subtitle,

    marginBottom: 10,
  },

});
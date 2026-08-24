import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import { useAgenda } from "../contexts/AgendaContext";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function CarteJournee() {
  const { rendezVous } = useAgenda();

  // ----------------------------------------
  // DATE D'AUJOURD'HUI
  // ----------------------------------------

  const aujourdHui =
    new Date().toLocaleDateString("fr-CA");

  // ----------------------------------------
  // RENDEZ-VOUS DU JOUR
  // ----------------------------------------

  const rendezVousAujourdhui =
    rendezVous
      .filter((rdv) => rdv.date === aujourdHui)
      .sort((a, b) =>
        (a.heure || "").localeCompare(
          b.heure || ""
        )
      );

  return (
    <View style={styles.carte}>

      <View style={styles.entete}>

        <Text
          style={styles.titre}
          numberOfLines={2}
        >
          Aujourd'hui
        </Text>


      </View>

      {rendezVousAujourdhui.length === 0 ? (

        <Text style={styles.vide}>
          Rien de prévu aujourd'hui.
        </Text>

      ) : (

        <View style={styles.liste}>

          {rendezVousAujourdhui.map((rdv) => (

            <View
              key={rdv.id}
              style={styles.rendezVous}
            >

              {rdv.heure &&
                rdv.heure !== "--:--" && (

                  <Text style={styles.heure}>
                    {rdv.heure}
                  </Text>

                )}

              <Text
                style={styles.nomRendezVous}
                numberOfLines={3}
              >
                {rdv.titre}
              </Text>

            </View>

          ))}

        </View>

      )}

    </View>
  );
}

const styles = StyleSheet.create({

  carte: {
    flex: 1,
    minWidth: 0,

    backgroundColor: Colors.card,
    borderRadius: Radius.large,

    padding: Spacing.md,

    marginTop: Spacing.lg,

    ...Shadow.card,
  },

  entete: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",

    marginBottom: Spacing.md,
  },

  titre: {
    flex: 1,
    minWidth: 0,

    marginRight: Spacing.xs,

    fontSize: 19,
    lineHeight: 24,
    fontWeight: "700",

    color: Colors.text,
  },


  liste: {
    gap: Spacing.sm,
  },

  rendezVous: {
    flexDirection: "row",
    alignItems: "flex-start",

    minWidth: 0,
  },

  heure: {
    width: 43,

    marginRight: 4,

    fontSize: 14,
    fontWeight: "700",

    color: Colors.secondary,
  },

  nomRendezVous: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,

    fontSize: 15,
    lineHeight: 21,

    color: Colors.subtitle,
  },

  vide: {
    fontSize: 15,
    lineHeight: 21,

    color: Colors.subtitle,
  },

});
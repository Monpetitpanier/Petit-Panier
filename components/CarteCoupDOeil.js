import React from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

import { useSante } from "../contexts/SanteContext";
import { useBudget } from "../contexts/BudgetContext";

import {
  doitPrevenirRenouvellement,
} from "../utils/traitementsUtils";


export default function CarteCoupDOeil() {

  const { traitements } = useSante();

  const {
    resteDisponible,
  } = useBudget();


  // =======================================
  // TRAITEMENTS À RENOUVELER
  // =======================================

  const traitementsARenouveler =
    traitements.filter(
      (traitement) =>
        traitement.actif !== false &&
        doitPrevenirRenouvellement(
          traitement
        )
    );


  return (

    <View style={styles.carte}>

      <View style={styles.entete}>

        <Text
          style={styles.titre}
          numberOfLines={2}
        >
          P'tit coup d'œil
        </Text>

      </View>


      <View style={styles.liste}>

        {/* ============================= */}
        {/* BUDGET */}
        {/* ============================= */}

        <View style={styles.ligne}>

          <Text style={styles.emoji}>
            💰
          </Text>

          <View style={styles.texteBudget}>

            <Text
              style={styles.texte}
              numberOfLines={1}
            >
              Budget dispo
            </Text>

            <Text
              style={[
                styles.montantBudget,
                resteDisponible < 0 &&
                  styles.montantNegatif,
              ]}
              numberOfLines={1}
            >
              {Number(
                resteDisponible
              ).toFixed(2).replace(".", ",")} €
            </Text>

          </View>

        </View>


        {/* ============================= */}
        {/* TRAITEMENTS */}
        {/* ============================= */}

        {traitementsARenouveler.map(
          (traitement) => (

            <View
              key={traitement.id}
              style={styles.ligne}
            >

              <Text style={styles.emoji}>
                💊
              </Text>

              <Text
                style={styles.texte}
                numberOfLines={3}
              >
                Pense à renouveler{" "}
                {traitement.nom}
              </Text>

            </View>

          )
        )}


        {/* ============================= */}
        {/* COURSES */}
        {/* ============================= */}

        <View style={styles.ligne}>

          <Text style={styles.emoji}>
            🛒
          </Text>

          <Text
            style={styles.texte}
            numberOfLines={3}
          >
            Des courses à faire
          </Text>

        </View>

      </View>

    </View>

  );

}


const styles = StyleSheet.create({

  carte: {
    flex: 1,
    minWidth: 0,

    backgroundColor:
      Colors.card,

    borderRadius:
      Radius.large,

    padding:
      Spacing.md,

    marginTop:
      Spacing.lg,

    ...Shadow.card,
  },


  entete: {
    flexDirection:
      "row",

    alignItems:
      "flex-start",

    justifyContent:
      "space-between",

    marginBottom:
      -10,
  },


  titre: {
    flex: 1,
    minWidth: 0,

    marginRight:
      Spacing.xs,

    fontSize: 19,
    lineHeight: 24,

    fontWeight:
      "700",

    color:
      Colors.text,
  },


  liste: {
    gap:
      Spacing.sm,
  },


  ligne: {
    flexDirection:
      "row",

    alignItems:
      "flex-start",

    minWidth: 0,
  },


  emoji: {
    width: 27,

    fontSize: 16,

    marginRight: 3,
  },


  texteBudget: {
    flex: 1,
    minWidth: 0,
  },


  texte: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,

    fontSize: 14,
    lineHeight: 20,

    color:
      Colors.subtitle,
  },


  montantBudget: {
    marginTop: 1,

    fontSize: 16,
    fontWeight: "700",

    color:
      Colors.text,
  },


  montantNegatif: {
    color:
      Colors.danger,
  },

});
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

import {
  doitPrevenirRenouvellement,
} from "../utils/traitementsUtils";

export default function CarteCoupDOeil() {

  const { traitements } = useSante();

  const traitementsARenouveler = traitements.filter(
    (traitement) =>
      traitement.actif !== false &&
      doitPrevenirRenouvellement(traitement)
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

        {/* BUDGET */}

        <View style={styles.ligne}>

          <Text style={styles.emoji}>
            💰
          </Text>

          <Text
            style={styles.texte}
            numberOfLines={3}
          >
            Budget disponible
          </Text>

        </View>


        {/* TRAITEMENTS À RENOUVELER */}

        {traitementsARenouveler.map((traitement) => (

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
              Pense à renouveler {traitement.nom}
            </Text>

          </View>

        ))}


        {/* PROCHAINE TÂCHE */}

        <View style={styles.ligne}>

          <Text style={styles.emoji}>
            🧹
          </Text>

          <Text
            style={styles.texte}
            numberOfLines={3}
          >
            Prochaine tâche
          </Text>

        </View>


        {/* COURSES */}

        <View style={styles.ligne}>

          <Text style={styles.emoji}>
            🛒
          </Text>

          <Text
            style={styles.texte}
            numberOfLines={3}
          >
            Quelques courses
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

    marginBottom: -10,
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

  ligne: {
    flexDirection: "row",
    alignItems: "flex-start",

    minWidth: 0,
  },

  emoji: {
    width: 27,

    fontSize: 16,

    marginRight: 3,
  },

  texte: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,

    fontSize: 14,
    lineHeight: 20,

    color: Colors.subtitle,
  },

});
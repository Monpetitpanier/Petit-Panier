import React from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useSante } from "../contexts/SanteContext";

import {
  calculerJoursRestants,
} from "../utils/traitementsUtils";

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function Traitements() {
  const navigation = useNavigation();

  const {
    traitements,
    supprimerTraitement,
    renouvelerTraitement,
  } = useSante();

  // =======================================
  // TRAITEMENTS EN COURS UNIQUEMENT
  // =======================================

  const traitementsEnCours = traitements;

  // =======================================
  // ARRÊTER UN TRAITEMENT
  // =======================================

  function handleSupprimerTraitement(id, nom) {
    Alert.alert(
      "Supprimer le traitement ?",
      `Voulez-vous arrêter le traitement "${nom}" ?`,
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Arrêter",
          style: "destructive",
          onPress: () => {
            supprimerTraitement(id);
          },
        },
      ]
    );
  }

  // =======================================
  // RENOUVELER UN TRAITEMENT
  // =======================================

  function handleRenouvelerTraitement(traitement) {
    renouvelerTraitement(
      traitement.id,
      traitement.stock,
      traitement.unitesParJour
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={28}
          color={Colors.text}
        />
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        <Text style={styles.titre}>
          Traitements
        </Text>

        <Text style={styles.sousTitre}>
          Suivre vos traitements et anticiper les renouvellements.
        </Text>

        {/* =================================== */}
        {/* COMPTEUR */}
        {/* =================================== */}

        <View style={styles.resume}>

          <Text style={styles.nombre}>
            {traitementsEnCours.length}
          </Text>

          <Text style={styles.texteResume}>
            traitement
            {traitementsEnCours.length > 1 ? "s" : ""} en cours
          </Text>

        </View>

        {/* =================================== */}
        {/* AUCUN TRAITEMENT */}
        {/* =================================== */}

        {traitementsEnCours.length === 0 ? (

          <View style={styles.carteVide}>

            <Text style={styles.emoji}>
              💊
            </Text>

            <Text style={styles.titreVide}>
              Aucun traitement en cours
            </Text>

            <Text style={styles.texteVide}>
              Vos traitements apparaîtront ici pour vous aider
              à suivre vos prises et anticiper les renouvellements.
            </Text>

          </View>

        ) : (

          traitementsEnCours.map((traitement, index) => {

            const joursRestants =
              calculerJoursRestants(traitement);

            return (

              <View
                key={traitement.id}
                style={styles.carteTraitement}
              >

                {/* =========================== */}
                {/* HAUT DE LA CARTE */}
                {/* =========================== */}

                <View style={styles.enteteCarte}>

                  <Text style={styles.numeroTraitement}>
                    Traitement {index + 1}
                  </Text>

                  <TouchableOpacity
                    style={styles.boutonIcone}
                    onPress={() =>
                      handleSupprimerTraitement(
                        traitement.id,
                        traitement.nom
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="trash-can-outline"
                      size={21}
                      color={Colors.subtitle}
                    />
                  </TouchableOpacity>

                </View>

                {/* =========================== */}
                {/* NOM DU MÉDICAMENT */}
                {/* =========================== */}

                <Text style={styles.nomTraitement}>
                  {traitement.nom || "Traitement sans nom"}
                </Text>

                {/* =========================== */}
                {/* PRISES PAR JOUR */}
                {/* =========================== */}

                <Text style={styles.details}>
                  {traitement.unitesParJour || 0} prise
                  {traitement.unitesParJour > 1 ? "s" : ""} par jour
                </Text>

                {/* =========================== */}
                {/* BAS DE LA CARTE */}
                {/* =========================== */}

                <View style={styles.basCarte}>

                  <Text style={styles.joursRestants}>
                    {joursRestants !== null
                      ? `À renouveler dans ${joursRestants} jour${
                          joursRestants > 1 ? "s" : ""
                        }`
                      : "Renouvellement à prévoir"}
                  </Text>

                  <TouchableOpacity
                    style={styles.boutonRenouveler}
                    onPress={() =>
                      handleRenouvelerTraitement(
                        traitement
                      )
                    }
                  >
                    <MaterialCommunityIcons
                      name="refresh"
                      size={20}
                      color={Colors.text}
                    />

                    <Text style={styles.texteRenouveler}>
                      Renouveler
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>

            );
          })

        )}

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  boutonRetour: {
    marginLeft: Spacing.md,
    marginTop: Spacing.sm,

    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 22,
  },

  titre: {
    marginTop: Spacing.md,

    fontSize: 30,
    fontWeight: "700",

    color: Colors.text,
  },

  sousTitre: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,

    fontSize: 16,
    lineHeight: 23,

    color: Colors.subtitle,
  },

  /* =================================== */
  /* COMPTEUR */
  /* =================================== */

  resume: {
    flexDirection: "row",
    alignItems: "baseline",

    marginBottom: Spacing.lg,
  },

  nombre: {
    fontSize: 32,
    fontWeight: "700",

    color: Colors.text,
  },

  texteResume: {
    marginLeft: Spacing.sm,

    fontSize: 16,

    color: Colors.subtitle,
  },

  /* =================================== */
  /* CARTE VIDE */
  /* =================================== */

  carteVide: {
    alignItems: "center",

    backgroundColor: Colors.card,

    borderRadius: Radius.large,

    padding: Spacing.xl,

    ...Shadow.card,
  },

  emoji: {
    fontSize: 42,

    marginBottom: Spacing.md,
  },

  titreVide: {
    fontSize: 18,
    fontWeight: "700",

    color: Colors.text,
  },

  texteVide: {
    marginTop: Spacing.sm,

    fontSize: 15,
    lineHeight: 22,

    textAlign: "center",

    color: Colors.subtitle,
  },

  /* =================================== */
  /* CARTE TRAITEMENT */
  /* =================================== */

  carteTraitement: {
    backgroundColor: Colors.card,

    borderRadius: Radius.large,

    padding: Spacing.lg,

    marginBottom: Spacing.md,

    ...Shadow.card,
  },

  enteteCarte: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  numeroTraitement: {
    fontSize: 14,

    fontWeight: "600",

    color: Colors.subtitle,
  },

  boutonIcone: {
    width: 34,
    height: 34,

    alignItems: "center",
    justifyContent: "center",
  },

  nomTraitement: {
    marginTop: Spacing.xs,

    fontSize: 22,

    fontWeight: "700",

    color: Colors.text,
  },

  details: {
    marginTop: 4,

    fontSize: 15,

    color: Colors.subtitle,
  },

  basCarte: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: Spacing.md,
  },

  joursRestants: {
    flex: 1,

    fontSize: 14,

    color: Colors.subtitle,
  },

  /* =================================== */
  /* BOUTON RENOUVELER */
  /* =================================== */

  boutonRenouveler: {
    flexDirection: "row",

    alignItems: "center",

    marginLeft: Spacing.sm,

    paddingHorizontal: Spacing.sm,
    paddingVertical: 7,

    borderRadius: Radius.large,

    backgroundColor: Colors.background,
  },

  texteRenouveler: {
    marginLeft: 5,

    fontSize: 13,
    fontWeight: "600",

    color: Colors.text,
  },

});
import React from "react";
import {
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

import { Colors } from "../theme/colors";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";
import { Spacing } from "../theme/spacing";

export default function Traitements() {
  const navigation = useNavigation();

  const { traitements } = useSante();

  const traitementsEnCours = traitements.filter(
    (traitement) => traitement.actif !== false
  );

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

        <View style={styles.resume}>
          <Text style={styles.nombre}>
            {traitementsEnCours.length}
          </Text>

          <Text style={styles.texteResume}>
            traitement
            {traitementsEnCours.length > 1 ? "s" : ""} en cours
          </Text>
        </View>

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

          traitementsEnCours.map((traitement) => (

            <View
              key={traitement.id}
              style={styles.carteTraitement}
            >

              <View style={styles.iconeTraitement}>
                <Text style={styles.emojiCarte}>
                  💊
                </Text>
              </View>

              <View style={styles.texteTraitement}>

                <Text style={styles.nomTraitement}>
                  {traitement.nom}
                </Text>

                <Text style={styles.details}>
                  {traitement.prisesParJour || 0} prise
                  {(traitement.prisesParJour || 0) > 1
                    ? "s"
                    : ""} par jour
                </Text>

              </View>

            </View>

          ))

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

  carteTraitement: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.card,

    borderRadius: Radius.large,

    padding: Spacing.md,
    marginBottom: Spacing.md,

    ...Shadow.card,
  },

  iconeTraitement: {
    width: 52,
    height: 52,

    borderRadius: 26,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: Colors.background,

    marginRight: Spacing.md,
  },

  emojiCarte: {
    fontSize: 25,
  },

  texteTraitement: {
    flex: 1,
  },

  nomTraitement: {
    fontSize: 17,
    fontWeight: "700",

    color: Colors.text,
  },

  details: {
    marginTop: 3,

    fontSize: 14,
    color: Colors.subtitle,
  },

});
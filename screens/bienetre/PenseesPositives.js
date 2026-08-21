import React, { useState } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useBienEtre } from "../../contexts/BienEtreContext";

import { Pensees } from "../../data/pensees";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";
import { Shadow } from "../../theme/shadow";


export default function PenseesPositives() {

  const navigation = useNavigation();

  const [index, setIndex] = useState(0);

  const {
    basculerPenseeFavorite,
    estPenseeFavorite,
  } = useBienEtre();


  const penseeActuelle = Pensees[index];

  const estFavorite =
    estPenseeFavorite(penseeActuelle);


  function changerPensee() {

    setIndex((ancienIndex) =>
      (ancienIndex + 1) % Pensees.length
    );

  }


  return (

    <SafeAreaView style={styles.container}>

      <TouchableOpacity
        style={styles.boutonRetour}
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={Colors.text}
        />
      </TouchableOpacity>

      <Text style={styles.titre}>
        Pensées positives
      </Text>

      <Text style={styles.sousTitre}>
        Une petite pensée douce, juste pour toi.
      </Text>


      <View style={styles.carte}>

        <Text style={styles.pensee}>
          « {penseeActuelle} »
        </Text>


        <View style={styles.actions}>

          <TouchableOpacity
            onPress={() =>
              basculerPenseeFavorite(
                penseeActuelle
              )
            }
            style={styles.boutonIcone}
          >

            <Text style={styles.icone}>
              {estFavorite ? "⭐" : "☆"}
            </Text>

          </TouchableOpacity>


          <TouchableOpacity
            onPress={changerPensee}
            style={styles.bouton}
          >

            <Text style={styles.texteBouton}>
              Une autre pensée
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  boutonRetour: {
    alignSelf: "flex-start",
    padding: Spacing.xs,
    marginBottom: Spacing.sm,
  },

  titre: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },

  sousTitre: {
    fontSize: 16,
    color: Colors.subtitle,
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },

  carte: {
    backgroundColor: Colors.card,
    borderRadius: Radius.large,
    padding: Spacing.xl,
    ...Shadow.card,
  },

  pensee: {
    fontSize: 20,
    lineHeight: 32,
    fontStyle: "italic",
    color: Colors.text,
    textAlign: "center",
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.xl,
  },

  boutonIcone: {
    padding: 8,
    marginRight: Spacing.md,
  },

  icone: {
    fontSize: 26,
  },

  bouton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: "center",
  },

  texteBouton: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

});
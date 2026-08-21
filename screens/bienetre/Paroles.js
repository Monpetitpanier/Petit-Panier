import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";
import { Radius } from "../../theme/radius";
import { Shadow } from "../../theme/shadow";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { usePreferences } from "../../contexts/PreferencesContext";

import {
  ParolesBible,
  ParolesCoran,
  ParolesTorah,
} from "../../data/paroles";


const parolesParLivre = {
  bible: ParolesBible,
  coran: ParolesCoran,
  torah: ParolesTorah,
};


export default function Paroles() {

  const navigation = useNavigation();

  const { livreParoles } =
    usePreferences();

  const paroles =
    parolesParLivre[livreParoles] ??
    ParolesBible;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [livreParoles]);

  const paroleActuelle =
    paroles[index];


  function changerParole() {

    setIndex((ancienIndex) =>
      (ancienIndex + 1) %
      paroles.length
    );

  }


  return (

    <SafeAreaView
      style={styles.container}
    >
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
        Paroles
      </Text>

      <Text style={styles.sousTitre}>
        Une parole pour t'accompagner aujourd'hui.
      </Text>

<TouchableOpacity
  style={styles.choixLivre}
  onPress={() =>
    navigation.navigate(
      "ChoixLivreParoles"
    )
  }
>
  <View style={styles.choixLivreGauche}>
    <MaterialCommunityIcons
      name="book-open-variant"
      size={22}
      color="#8BA888"
    />

    <View>
      <Text style={styles.choixLivreTitre}>
        {
          livreParoles === "bible"
            ? "La Bible"
            : livreParoles === "coran"
            ? "Le Coran"
            : livreParoles === "torah"
            ? "La Torah"
            : "Choisir mon livre"
        }
      </Text>

      <Text style={styles.choixLivreSousTitre}>
        Appuyer pour modifier
      </Text>
    </View>
  </View>

  <MaterialCommunityIcons
    name="chevron-right"
    size={24}
    color={Colors.subtitle}
  />
</TouchableOpacity>

      <View style={styles.carte}>

        <Text style={styles.parole}>
          « {paroleActuelle.texte} »
        </Text>

        <Text style={styles.reference}>
          {paroleActuelle.reference}
        </Text>


        <TouchableOpacity
          onPress={changerParole}
          style={styles.bouton}
        >

          <Text style={styles.texteBouton}>
            Une autre parole
          </Text>

        </TouchableOpacity>

      </View>

    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

    boutonRetour: {
  width: 22,
  height: 22,
  borderRadius: 22,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: Spacing.md,
    },

  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
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

  parole: {
    fontSize: 20,
    lineHeight: 32,
    fontStyle: "italic",
    color: Colors.text,
    textAlign: "center",
  },

  reference: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.subtitle,
    textAlign: "center",
    marginTop: Spacing.md,
  },

  bouton: {
    marginTop: Spacing.xl,
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

    choixLivre: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: Colors.card,
    borderRadius: Radius.large,

    padding: Spacing.md,
    marginBottom: Spacing.lg,

    ...Shadow.card,
  },

  choixLivreGauche: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  choixLivreTitre: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  choixLivreSousTitre: {
    fontSize: 13,
    color: Colors.subtitle,
    marginTop: 2,
  },

});
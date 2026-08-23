import React from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation, useRoute, } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../theme/colors";
import { Spacing } from "../theme/spacing";
import { useSante } from "../contexts/SanteContext";
import { calculerJoursRestants } from "../utils/traitementsUtils";
import { Radius } from "../theme/radius";
import { Shadow } from "../theme/shadow";


export default function DetailsTraitement() {
  const navigation = useNavigation();
  const route = useRoute();

  const { traitementId } = route.params;

  const {traitements, modifierTraitement,} = useSante();

  const traitement = traitements.find((item) => item.id === traitementId);

  const joursRestants = calculerJoursRestants(traitement);

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
        {traitement.nom}
      </Text>

      <Text style={styles.sousTitre}>
        Détails de votre traitement
      </Text>

      <View style={styles.carte}>
        <Text style={styles.label}>
          Stock actuel
        </Text>

        <Text style={styles.valeur}>
          {traitement.stock || 0} unités
        </Text>
      </View>

      <View style={styles.carte}>
        <Text style={styles.label}>
          Prises par jour
        </Text>

        <View style={styles.carte}>
  <Text style={styles.label}>
    Jours restants
  </Text>

    <TouchableOpacity
  style={styles.boutonArreter}
  onPress={arreterTraitement}
>
  <MaterialCommunityIcons
    name="trash-can-outline"
    size={20}
    color={Colors.text}
  />

  <Text style={styles.texteBoutonArreter}>
    Arrêter ce traitement
  </Text>
</TouchableOpacity>

  <Text style={styles.valeur}>
    {joursRestants !== null
      ? `Environ ${joursRestants} jour${joursRestants > 1 ? "s" : ""}`
      : "Information indisponible"}
  </Text>
</View>

        <Text style={styles.valeur}>
          {traitement.unitesParJour || 0}
        </Text>
      </View>
    </ScrollView>
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
  },

  titre: {
    marginTop: Spacing.md,
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  content: {
  padding: Spacing.lg,
  paddingBottom: Spacing.xl,
},

sousTitre: {
  marginTop: Spacing.xs,
  marginBottom: Spacing.xl,

  fontSize: 16,
  color: Colors.subtitle,
},

carte: {
  backgroundColor: Colors.card,

  borderRadius: Radius.large,

  padding: Spacing.lg,
  marginBottom: Spacing.md,

  ...Shadow.card,
},

label: {
  fontSize: 14,
  color: Colors.subtitle,
},

valeur: {
  marginTop: Spacing.xs,

  fontSize: 22,
  fontWeight: "700",

  color: Colors.text,
},

boutonArreter: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",

  marginTop: Spacing.xl,
  padding: Spacing.md,

  borderRadius: Radius.large,

  backgroundColor: Colors.card,

  ...Shadow.card,
},

texteBoutonArreter: {
  marginLeft: Spacing.sm,

  fontSize: 16,
  fontWeight: "600",

  color: Colors.text,
},

});
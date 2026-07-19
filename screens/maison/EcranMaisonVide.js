import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function EcranMaisonVide({ route }) {
  const titre = route?.params?.titre ?? "Maison";
  const icone = route?.params?.icone ?? "🏡";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contenu}>
        <Text style={styles.icone}>{icone}</Text>
        <Text style={styles.titre}>{titre}</Text>
        <Text style={styles.texte}>
          Cette section sera bientôt prête à accueillir tes repères.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  contenu: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },

  icone: {
    marginBottom: Spacing.md,
    fontSize: 48,
  },

  titre: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
  },

  texte: {
    marginTop: Spacing.sm,
    color: Colors.subtitle,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
});

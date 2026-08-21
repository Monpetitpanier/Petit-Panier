import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors } from "../../theme/colors";
import { Spacing } from "../../theme/spacing";

export default function Respiration() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
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

      <Text style={styles.titre}>🌿 Respiration</Text>
      <Text style={styles.texte}>
        Cet écran est en cours de création.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  boutonRetour: {
    position: "absolute",
    top: Spacing.lg,
    left: Spacing.lg,
    padding: Spacing.xs,
  },

  titre: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 12,
  },

  texte: {
    fontSize: 16,
    textAlign: "center",
  },
});

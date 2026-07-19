import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import { Colors } from "../theme/colors";

export default function JourCalendrier({
  jour,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.case,
        !jour.estDansLeMois && styles.caseInactive,
        jour.estAujourdHui && styles.aujourdHui,
        jour.estSelectionne && styles.selectionne,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.numero,
          !jour.estDansLeMois && styles.numeroInactif,
        ]}
      >
        {jour.numero}
      </Text>

      {jour.aDesRendezVous && (
        <Text style={styles.patte}>🐾</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  case: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 8,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  caseInactive: {
    backgroundColor: "#F2F2F2",
  },

  aujourdHui: {
    borderWidth: 2,
    borderColor: "#8BA888",
  },

  selectionne: {
    backgroundColor: "#EAF5E8",
  },

  numero: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },

  numeroInactif: {
    color: "#BBBBBB",
  },

  patte: {
    alignSelf: "flex-start",
    fontSize: 14,
  },
});